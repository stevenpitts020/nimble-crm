import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  SignerIdentityVerificationProvider,
  SignerIdentityVerificationContext,
} from './SignerIdentityVerificationProvider'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/SignerIdentityVerifications'
import Config from '../services/Config'

const DisplayInformation = () => {
  const { state } = React.useContext(SignerIdentityVerificationContext)

  const idVerifications = state.identityVerifications

  return (
    <p data-testid="stuff">
      {idVerifications ? idVerifications[0].category : 'false'}
    </p>
  )
}

const Error = () => {
  const { state } = React.useContext(SignerIdentityVerificationContext)
  return <p data-testid="error">{state.error}</p>
}

const Button = () => {
  const { getSignerIdentityVerification } = React.useContext(
    SignerIdentityVerificationContext
  )

  const handleClick = async () => {
    await getSignerIdentityVerification('8f862362-d703-4228-b4e7-2681721fee42')
  }

  return (
    <button data-testid="button" type="button" onClick={handleClick}>
      Get Data from API
    </button>
  )
}

function App() {
  return (
    <SignerIdentityVerificationProvider>
      <>
        <Error />
        <DisplayInformation />
        <Button />
      </>
    </SignerIdentityVerificationProvider>
  )
}

describe('SignerIdentityVerificationProvider', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  const signerId = '8f862362-d703-4228-b4e7-2681721fee42'

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('defaults to no data', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId(/stuff/).textContent).toEqual('false')
  })

  it('updates state through getSignerIdentityVerification', async () => {
    const mockedResponse = mocks.successIdentityVerificationResponse
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/signers/${signerId}/identity-verifications`)
      .reply(200, mockedResponse)

    const { getByTestId } = render(<App />)

    expect(getByTestId(/stuff/).textContent).toEqual('false')

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/stuff/).textContent
      expect(result).toEqual(
        mocks.successIdentityVerificationResponse[0].category
      )
    })
    scope.done()
  })

  it('updates error through getSignerIdentityVerification', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/signers/${signerId}/identity-verifications`)
      .reply(404, mocks.invalidResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/error/).textContent
      expect(result).toEqual(mocks.invalidResponse.message)
    })
    scope.done()
  })
})
