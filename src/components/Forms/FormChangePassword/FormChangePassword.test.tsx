import React from 'react'
import nock from 'nock'
import axios from 'axios'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { FormChangePassword } from './FormChangePassword'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import AuthProvider from '../../../store/AuthProvider'
import { ProfileContext } from '../../../store/ProfileProvider'
import { AlertProvider } from '../../../store/AlertProvider'

import Config from '../../../services/Config'
import {
  passwordChangedSuccess,
  successResponse,
} from '../../../services/__mocks__/Auth'
import { successResponse as successResponseProfile } from '../../../services/__mocks__/Profile'
import { AlertMessage } from '../../Common/AlertMessage/AlertMessage'

const renderForm = (props: any) => {
  const history = createMemoryHistory()

  return render(
    <Router history={history}>
      <AuthProvider>
        <ProfileContext.Provider
          value={{
            profileState: {
              status: 'idle',
              profile: successResponseProfile,
              error: undefined,
            },
            dispatch: jest.fn(),
            getProfile: jest.fn(),
            clearProfile: jest.fn(),
          }}
        >
          <AlertProvider>
            <AlertMessage />
            <FormChangePassword {...props} />
          </AlertProvider>
        </ProfileContext.Provider>
      </AuthProvider>
    </Router>
  )
}

describe('<FormChangePassword />', () => {
  // tslint:disable-next-line: no-var-requires

  test('renders box with password fields', () => {
    const { getByText } = renderForm({})
    const currentPassword = getByText(/^Current$/i)
    const newPassword = getByText(/^New password$/i)
    const confirmPassword = getByText(/^Re-enter your new password$/i)
    expect(currentPassword).toBeInTheDocument()
    expect(newPassword).toBeInTheDocument()
    expect(confirmPassword).toBeInTheDocument()
  })

  test('render warning if new- and confirmPasswords don`t match', async () => {
    const { getByTestId, getByLabelText } = renderForm({})

    // fill out the form
    fireEvent.change(getByLabelText(/^New password$/i), {
      target: { value: 'passw0rd' },
    })
    fireEvent.change(getByLabelText(/^Re-enter your new password$/i), {
      target: { value: 'pass' },
    })
    await waitFor(() => {
      const formElement = getByTestId('change-password-form')
      expect(formElement).toHaveTextContent('Passwords don`t match')
    })
  })

  test('render warning if new Password is the same as current one', async () => {
    const { getByTestId, getByLabelText } = renderForm({})

    // fill out the form
    fireEvent.change(getByLabelText(/^Current$/i), {
      target: { value: 'passw0rd' },
    })
    fireEvent.change(getByLabelText(/^New password$/i), {
      target: { value: 'passw0rd' },
    })
    fireEvent.change(getByLabelText(/^Re-enter your new password$/i), {
      target: { value: 'passw0rd' },
    })
    await waitFor(() => {
      const formElement = getByTestId('change-password-form')
      expect(formElement).toHaveTextContent(
        'New password is exactly the same as current'
      )
    })
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

  test('render message if ok', async () => {
    axios.defaults.adapter = require('axios/lib/adapters/http')

    const scope = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post(/auth/)
      .reply(204, successResponse)
    const scope2 = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .put(/me/)
      .reply(204, passwordChangedSuccess)
    window.scrollTo = jest.fn()
    const { getByTestId, getByLabelText } = renderForm({})

    // fill out the form
    fireEvent.change(getByLabelText(/^Current$/i), {
      target: { value: 'passw0rd' },
    })
    fireEvent.change(getByLabelText(/^New password$/i), {
      target: { value: 'passw0rd1111' },
    })
    fireEvent.change(getByLabelText(/^Re-enter your new password$/i), {
      target: { value: 'passw0rd1111' },
    })

    fireEvent.click(getByTestId('submit'))

    await waitFor(() => {
      const alert = getByTestId('alert-message')
      expect(alert).toHaveTextContent('Your password has been changed')
    })

    scope.done()
    scope2.done()
  })
})
