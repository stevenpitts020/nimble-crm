import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  SignerComplianceVerificationProvider,
  SignerComplianceVerificationContext,
} from './SignerComplianceVerificationProvider'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/SignerComplianceVerification'
import Config from '../services/Config'

const DisplayInformation = () => {
  const { state } = React.useContext(SignerComplianceVerificationContext)

  const data = state.complianceVerification

  if (data === undefined || data === null) {
    return <p data-testid="stuff">false</p>
  }
  return <p data-testid="stuff">{data.reference}</p>
}

const Error = () => {
  const { state } = React.useContext(SignerComplianceVerificationContext)
  return <p data-testid="error">{state.error}</p>
}

const Button = () => {
  const { getSignerComplianceVerification } = React.useContext(
    SignerComplianceVerificationContext
  )

  const handleClick = async () => {
    getSignerComplianceVerification('8f862362-d703-4228-b4e7-2681721fee42')
  }

  return (
    <button data-testid="button" type="button" onClick={handleClick}>
      Get Data from API
    </button>
  )
}

function App() {
  return (
    <SignerComplianceVerificationProvider>
      <>
        <Error />
        <DisplayInformation />
        <Button />
      </>
    </SignerComplianceVerificationProvider>
  )
}

describe('SignerComplianceVerificationProvider', () => {
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

  it('updates state through getSignerComplianceVerification', async () => {
    const mockedResponse = mocks.successResponse
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/signers/${signerId}/compliance-verifications`)
      .reply(200, mockedResponse)

    const { getByTestId } = render(<App />)

    expect(getByTestId(/stuff/).textContent).toEqual('false')

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/stuff/).textContent
      expect(result).toEqual(mockedResponse[0].reference)
    })
    scope.done()
  })

  it('updates error through getSignerComplianceVerification', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/signers/${signerId}/compliance-verifications`)
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
