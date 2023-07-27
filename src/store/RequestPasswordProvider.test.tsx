import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  RequestPasswordProvider,
  RequestPasswordContext,
} from './RequestPasswordProvider'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/Auth'
import Config from '../services/Config'

const AppInner = () => {
  const { requestState, requestPassword, changePassword } = React.useContext(
    RequestPasswordContext
  )

  const handleClick = async () => {
    await requestPassword('test@wearesingular.com')
  }

  const handleRecover = async () => {
    await changePassword('test@wearesingular.com', '123123', 'xpto')
  }
  return (
    <div data-testid="provider">
      <p data-testid="status">{requestState.status}</p>
      <p data-testid="error">{requestState.error}</p>
      <button data-testid="update" type="button" onClick={handleClick}>
        Request
      </button>
      <button data-testid="recover" type="button" onClick={handleRecover}>
        Recover Pass
      </button>
    </div>
  )
}

// Simplified Boilerplate app
function App() {
  return (
    <RequestPasswordProvider>
      <AppInner />
    </RequestPasswordProvider>
  )
}

describe('RequestPasswordProvider', () => {
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
    expect(getByTestId(/status/).textContent).toEqual('idle')
  })

  it('updates state with request password link', async () => {
    const scope = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post(/auth/)
      .reply(204, mocks.recoverPassSuccess)

    const { getByTestId } = render(<App />)
    fireEvent.click(getByTestId(/update/))

    await waitFor(() => {
      const status = getByTestId(/status/).textContent
      expect(status).toEqual('success')
    })
    scope.done()
  })

  it('updates state with recover password', async () => {
    const scope = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .put(/auth/)
      .reply(204, mocks.recoverPassSuccess)

    const { getByTestId } = render(<App />)
    fireEvent.click(getByTestId(/recover/))

    await waitFor(() => {
      const status = getByTestId(/status/).textContent
      expect(status).toEqual('success')
    })
    scope.done()
  })

  it('updates error through recover password', async () => {
    const scope = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .put(/auth/)
      .reply(404, mocks.recoverPassNotFound)

    const { getByTestId } = render(<App />)
    fireEvent.click(getByTestId(/recover/))

    await waitFor(() => {
      const status = getByTestId(/status/).textContent
      expect(status).toEqual('failure')

      const result = getByTestId(/error/).textContent
      expect(result).toEqual(mocks.recoverPassNotFound.message)
    })
    scope.done()
  })

  it('updates error through requestPassword', async () => {
    const scope = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post(/auth/)
      .reply(404, mocks.recoverPassNotFound)

    const { getByTestId } = render(<App />)
    fireEvent.click(getByTestId(/update/))

    await waitFor(() => {
      const status = getByTestId(/status/).textContent
      expect(status).toEqual('failure')

      const result = getByTestId(/error/).textContent
      expect(result).toEqual(mocks.recoverPassNotFound.message)
    })
    scope.done()
  })
})
