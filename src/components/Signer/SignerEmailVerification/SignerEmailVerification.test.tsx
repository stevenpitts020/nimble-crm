import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { SignerEmailVerification } from './SignerEmailVerification'
import { SignerEmailVerificationService } from '../../../services/'
import { successResponse } from '../../../services/__mocks__/SignerEmailVerification'

import nock from 'nock'
import axios from 'axios'
import Config from '../../../services/Config'
const renderApp = (props: any) => {
  return render(<SignerEmailVerification {...props} />)
}

describe('<SignerEmailVerification />', () => {
  axios.defaults.adapter = require('axios/lib/adapters/http')

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })
  test('should render content', () => {
    const props = {
      emailVerified: true,
      emailVerifiedAt: '',
    }

    const { getByText } = renderApp(props)
    const verified = getByText('Email Verified')
    expect(verified).toBeInTheDocument()
  })
  test('clicking the resend button should trigger the email', async () => {
    const props = {
      emailVerified: false,
      emailVerifiedAt: '',
    }
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/signers/204/email-verifications')
      .reply(204, successResponse)
    const result = await SignerEmailVerificationService.sendEmailVerification(
      '204'
    )
    renderApp(props)
    const button = screen.getByTestId('resendButton')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => {
      expect(result.statusCode).toEqual(successResponse.statusCode)
    })

    scope.done()
  })
})
