import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  AccountRequestDetailProvider,
  AccountRequestDetailContext,
} from './AccountRequestDetailProvider'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/AccountRequest'
import Config from '../services/Config'

const AppInner = () => {
  const {
    accountState,
    getAccountRequest,
    updateAccountRequest,
  } = React.useContext(AccountRequestDetailContext)

  const handleUpdate = async () => {
    await updateAccountRequest('xpto', {
      status: 'ACCEPTED',
      statusEmailSubject: 'Waazzzzaaaap',
      statusEmailBody: 'Waaaaaaaaaazaaaaap',
    })
  }

  const handleGet = async () => {
    await getAccountRequest('xpto')
  }

  return (
    <div data-testid="provider">
      <p data-testid="status">{accountState.status}</p>
      <p data-testid="error">{accountState.error}</p>
      <p data-testid="detail">
        {accountState.accountRequest
          ? accountState.accountRequest.status
          : 'false'}
      </p>
      <button data-testid="update" type="button" onClick={handleUpdate}>
        Update
      </button>
      <button data-testid="get" type="button" onClick={handleGet}>
        Get
      </button>
    </div>
  )
}

// Simplified Boilerplate app
function App() {
  return (
    <AccountRequestDetailProvider>
      <AppInner />
    </AccountRequestDetailProvider>
  )
}

describe('AccountRequestDetailProvider', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('defaults to empty state', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId(/detail/).textContent).toEqual('false')
  })

  it('updates state through get', async () => {
    const params = 'xpto'
    const mockedResponse = mocks.successResponseApproved
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/account-requests/${params}`)
      .reply(200, mockedResponse)

    const { getByTestId } = render(<App />)

    expect(getByTestId(/detail/).textContent).toEqual('false')

    fireEvent.click(getByTestId(/get/))

    await waitFor(() => {
      const result = getByTestId(/detail/).textContent
      expect(result).toEqual(mocks.successResponseApproved.status)

      const status = getByTestId(/status/).textContent
      expect(status).toEqual('success')
    })
    scope.done()
  })

  it('updates error through getProfile', async () => {
    const params = 'xpto'
    const mockedResponse = mocks.invalidResponse
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/account-requests/${params}`)
      .reply(400, mockedResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/get/))

    await waitFor(() => {
      const result = getByTestId(/error/).textContent
      expect(result).toEqual(mocks.invalidResponse.message)
    })
    scope.done()
  })

  it('updates state through update', async () => {
    const params = {
      status: 'ACCEPTED',
      statusEmailSubject: 'Waazzzzaaaap',
      statusEmailBody: 'Waaaaaaaaaazaaaaap',
    }
    const mockedResponse = mocks.successResponseApproved
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .put(`/account-requests/xpto`, params)
      .reply(200, mockedResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/update/))

    await waitFor(() => {
      const result = getByTestId(/detail/).textContent
      expect(result).toEqual(mocks.successResponseApproved.status)

      const status = getByTestId(/status/).textContent
      expect(status).toEqual('success')
    })
    scope.done()
  })

  it('updates error through update', async () => {
    const params = {
      status: 'ACCEPTED',
      statusEmailSubject: 'Waazzzzaaaap',
      statusEmailBody: 'Waaaaaaaaaazaaaaap',
    }
    const mockedResponse = mocks.invalidResponse
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .put(`/account-requests/xpto`, params)
      .reply(412, mockedResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/update/))

    await waitFor(() => {
      const result = getByTestId(/error/).textContent
      expect(result).toEqual(mocks.invalidResponse.message)

      const status = getByTestId(/status/).textContent
      expect(status).toEqual('failure')
    })
    scope.done()
  })

  const mockCatch = jest.fn()

  interface MyState {
    hasError: boolean
  }

  class MockErrorBoundary extends React.Component<{}, MyState> {
    public static getDerivedStateFromError(error: any) {
      return { hasError: true }
    }
    constructor(props: any) {
      super(props)
      this.state = { hasError: false }
    }

    public componentDidCatch(err: any) {
      mockCatch(err)
    }

    public render() {
      const { children } = this.props
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>
      }
      return <>{children}</>
    }
  }

  it('rethrows error if response is 401', async () => {
    const params = {
      status: 'ACCEPTED',
      statusEmailSubject: 'Waazzzzaaaap',
      statusEmailBody: 'Waaaaaaaaaazaaaaap',
    }
    const mockedResponse = mocks.retryInvalidResponse
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .put(`/account-requests/xpto`, params)
      .reply(401, mockedResponse)

    // I think this will still output the exception on the log
    const { getByTestId } = render(
      <MockErrorBoundary>
        <App />
      </MockErrorBoundary>
    )

    getByTestId(/update/).click()
    await waitFor(() =>
      expect(mockCatch).toHaveBeenCalledWith(expect.any(Error))
    )

    scope.done()
  })
})
