import React from 'react'
import nock from 'nock'
import axios from 'axios'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { FormRequestPassword } from './FormRequestPassword'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { RequestPasswordProvider } from '../../../store/RequestPasswordProvider'
import Config from '../../../services/Config'
import {
  recoverPassNotFound,
  successResponse,
} from '../../../services/__mocks__/Auth'

const renderForm = (props: any) => {
  const history = createMemoryHistory()
  return render(
    <Router history={history}>
      <RequestPasswordProvider>
        <FormRequestPassword {...props} />
      </RequestPasswordProvider>
    </Router>
  )
}

describe('<RequestPassword />', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  test('renders email box', () => {
    const { getByLabelText } = renderForm({})
    const container = getByLabelText(/Your E-mail/i)

    expect(container).toBeInTheDocument()
  })

  test('render warning if form is invalid', async () => {
    const { getByTestId, getByLabelText } = renderForm({})

    // fill out the form
    fireEvent.change(getByLabelText(/e-mail/i), { target: { value: 'chuck' } })
    fireEvent.click(getByTestId('submit'))
    await waitFor(() => {
      const formElement = getByTestId('request-pass-form')
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

    test('render message if email is wrong', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/recover/test@wmail.com')
        .reply(404, recoverPassNotFound)

      const { getByTestId, getByLabelText } = renderForm({})

      // fill out the form
      fireEvent.change(getByLabelText(/e-mail/i), {
        target: { value: 'test@wmail.com' },
      })

      fireEvent.click(getByTestId('submit'))

      await waitFor(() => {
        const formElement = getByTestId('alert')
        expect(formElement).toHaveTextContent(
          'Could not find an user with that email'
        )
      })

      scope.done()
    })

    test('render message if ok', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/recover/test@wmail.com')
        .reply(204, successResponse)

      const { getByTestId, getByLabelText } = renderForm({})

      // fill out the form
      fireEvent.change(getByLabelText(/e-mail/i), {
        target: { value: 'test@wmail.com' },
      })

      fireEvent.click(getByTestId('submit'))
      await waitFor(() => {
        const formElement = getByTestId('alertSuccess')
        expect(formElement).toHaveTextContent('Password reset link sent')
      })

      scope.done()
    })
  })
})
