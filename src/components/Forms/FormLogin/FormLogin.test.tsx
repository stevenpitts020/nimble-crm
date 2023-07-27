import React from 'react'
import nock from 'nock'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { FormLogin } from './FormLogin'
import AuthProvider from '../../../store/AuthProvider'
import { InstitutionProvider } from '../../../store/InstitutionProvider'
import Config from '../../../services/Config'
import {
  invalidResponse,
  successResponse,
} from '../../../services/__mocks__/Auth'

const renderForm = (props: any) => {
  const history = createMemoryHistory()
  return render(
    <Router history={history}>
      <AuthProvider>
        <InstitutionProvider>
          <FormLogin {...props} />
        </InstitutionProvider>
      </AuthProvider>
    </Router>
  )
}

describe('<FormLogin />', () => {
  test('renders title', () => {
    const { getByText } = renderForm({})
    const container = getByText(/Sign in to your account/i)

    expect(container).toBeInTheDocument()
  })

  test('render warning if form is invalid', async () => {
    const { getByTestId, getByLabelText } = renderForm({})

    // fill out the form
    fireEvent.change(getByLabelText(/e-mail/i), { target: { value: 'chuck' } })
    fireEvent.click(getByTestId('submit'))

    await waitFor(() => {
      const formElement = getByTestId('login-form')
      expect(formElement).toHaveTextContent('The E-mail entered is not valid')
    })
  })

  describe('when submitting data', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    test('render message if login is invalid', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/magic-link')
        .reply(401, invalidResponse)

      const { getByTestId, getByLabelText } = renderForm({})

      // fill out the form
      fireEvent.change(getByLabelText(/e-mail/i), {
        target: { value: 'test@wmail.com' },
      })

      fireEvent.click(getByTestId('submit'))

      await waitFor(() => {
        const formElement = screen.getByTestId('alert')
        expect(formElement).toHaveTextContent(
          'Invalid or expired login token/password. Try again.'
        )
      })

      scope.done()
    })

    test('render message if login is valid', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/magic-link')
        .reply(200, successResponse)

      const { getByTestId, getByLabelText } = renderForm({})

      // fill out the form
      fireEvent.change(getByLabelText(/e-mail/i), {
        target: { value: 'test@wmail.com' },
      })

      fireEvent.click(getByTestId('submit'))

      await waitFor(() => {
        const formElement = screen.getByTestId('alert')
        expect(formElement).toHaveTextContent(
          'Login-link sent to [test@wmail.com].'
        )
      })

      scope.done()
    })
  })
})
