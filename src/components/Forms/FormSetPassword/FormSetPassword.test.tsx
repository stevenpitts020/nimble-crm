import React from 'react'
import nock from 'nock'
import axios from 'axios'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { FormSetPassword } from './FormSetPassword'
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { RequestPasswordProvider } from '../../../store/RequestPasswordProvider'
import Config from '../../../services/Config'
import {
  successResponse,
  recoverPassIsExpired,
} from '../../../services/__mocks__/Auth'
import ErrorPassword from '../../../pages/ErrorPassword/ErrorPassword'

const renderForm = (props: any) => {
  const history = createMemoryHistory()
  return render(
    <Router history={history}>
      <Route
        path="/auth/error/:code"
        exact={true}
        key="errorPassword"
        component={ErrorPassword}
      />
      <RequestPasswordProvider>
        <FormSetPassword {...props} />
      </RequestPasswordProvider>
    </Router>
  )
}

describe('<SetPassword />', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  test('renders box with password fields', () => {
    const { queryAllByText } = renderForm({})
    const container = queryAllByText(/New password/i)

    expect(container).toHaveLength(2)
  })

  test('render warning if passwords don`t match', async () => {
    const { getByTestId, getByLabelText } = renderForm({})

    // fill out the form
    fireEvent.change(getByLabelText(/^New password$/i), {
      target: { value: 'passw0rd' },
    })
    fireEvent.change(getByLabelText(/^Re-enter your new password$/i), {
      target: { value: 'pass' },
    })

    await waitFor(() => {
      const formElement = getByTestId('set-password-form')
      expect(formElement).toHaveTextContent('Passwords don`t match')
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
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .put(/auth/i)
        .reply(204, successResponse)

      const { getByTestId, getByLabelText } = renderForm({})

      // fill out the form
      fireEvent.change(getByLabelText(/^New password$/i), {
        target: { value: 'passw0rd' },
      })
      fireEvent.change(getByLabelText(/^Re-enter your new password$/i), {
        target: { value: 'passw0rd' },
      })

      fireEvent.click(getByTestId('submit'))

      await waitFor(() => {
        const formElement = getByTestId('alertSuccess')
        expect(formElement).toHaveTextContent('Your password has been changed')
      })
      scope.done()
    })

    test('redirect if the error message indicates expired code', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .put(/auth/i)
        .reply(404, recoverPassIsExpired)

      const { getByTestId, getByLabelText, getByText } = renderForm({})

      // fill out the form
      fireEvent.change(getByLabelText(/^New password$/i), {
        target: { value: 'passw0rd' },
      })
      fireEvent.change(getByLabelText(/^Re-enter your new password$/i), {
        target: { value: 'passw0rd' },
      })

      fireEvent.click(getByTestId('submit'))

      await waitFor(() => {
        const container = getByText(
          'This password reset link has already been used'
        )
        expect(container).toBeInTheDocument()
      })
      scope.done()
    })
  })
})
