import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  AccountRequestProvider,
  AccountRequestContext,
} from './AccountRequestProvider'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/AccountRequest'
import Config from '../services/Config'

const DisplayInformation = () => {
  const { accountState } = React.useContext(AccountRequestContext)
  return (
    <>
      <p data-testid="accountRequests">
        {accountState.accountRequests.length > 0
          ? accountState.accountRequests.length
          : 'false'}
      </p>
      <p data-testid="requestsCount">{accountState?.count}</p>
    </>
  )
}

const Error = () => {
  const { accountState } = React.useContext(AccountRequestContext)
  return <p data-testid="error">{accountState.error}</p>
}

const Button = () => {
  const { listAccountRequests } = React.useContext(AccountRequestContext)

  const handleClick = async () => {
    await listAccountRequests({ limit: 30, offset: 0, sort: 'createdAt' })
  }

  return (
    <button data-testid="button" type="button" onClick={handleClick}>
      Get Institution
    </button>
  )
}

const ButtonClear = () => {
  const { clearAccounts } = React.useContext(AccountRequestContext)

  const onClear = async () => {
    await clearAccounts()
  }

  return (
    <button data-testid="clear" type="button" onClick={onClear}>
      Clear
    </button>
  )
}

const App = () => {
  return (
    <AccountRequestProvider>
      <>
        <Error />
        <ButtonClear />
        <DisplayInformation />
        <Button />
      </>
    </AccountRequestProvider>
  )
}

describe('AccountRequestProvider', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')
  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('defaults to no accountRequests', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId(/accountRequests/).textContent).toEqual('false')
  })

  it('updates state through listAccountRequests', async () => {
    const mockedResponse = [mocks.successResponse]
    const mockedCountResponse = mocks.successCountResponse

    const listScope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests/)
      .reply(200, mockedResponse)

    const countScope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests\/count/)
      .reply(200, mockedCountResponse)

    const { getByTestId } = render(<App />)

    expect(getByTestId(/accountRequests/).textContent).toEqual('false')

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/accountRequests/).textContent
      const resultCount = getByTestId(/requestsCount/).textContent
      expect(result).toEqual(String(mockedResponse.length))
      expect(resultCount).toEqual(String(mockedCountResponse.count))
    })
    listScope.done()
    countScope.done()
  })

  it('updates error through list', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests/)
      .reply(400, mocks.invalidResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/error/).textContent
      expect(result).toEqual(mocks.invalidResponse.message)
    })
    scope.done()
  })

  it('clear existing data', async () => {
    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/clear/))

    await waitFor(() => {
      const result1 = getByTestId(/error/).textContent
      expect(result1).toEqual('')

      const result2 = getByTestId(/accountRequests/).textContent
      expect(result2).toEqual('false')
    })
  })
})
