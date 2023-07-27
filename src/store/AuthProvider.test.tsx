import React from 'react'
import _ from 'lodash'
import { render, fireEvent, waitFor } from '@testing-library/react'
import AuthProvider from './AuthProvider'
import { AuthContextStore } from './AuthProvider'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/Auth'
import Config from '../services/Config'
import Repo from '../services/Repo'

const DisplayInformation = () => {
  const { auth, isAuthenticated } = React.useContext(AuthContextStore)
  return <p data-testid="auth">{isAuthenticated() ? auth.token : 'false'}</p>
}

const Error = () => {
  const { auth } = React.useContext(AuthContextStore)
  return <p data-testid="error">{auth.error}</p>
}

const AuthenticationSuccess = () => {
  const { isAuthenticated } = React.useContext(AuthContextStore)
  const result = String(isAuthenticated())
  return <p data-testid="is-loggedin">{result}</p>
}

const Button = () => {
  const { handleLogin } = React.useContext(AuthContextStore)

  const handleAuth = async () => {
    await handleLogin({ email: 'test@wearesingular.com', password: 'test123' })
  }

  return (
    <button data-testid="button" type="button" onClick={handleAuth}>
      Get Auth
    </button>
  )
}

const ButtonClear = () => {
  const { handleLogout } = React.useContext(AuthContextStore)

  const onClear = async () => {
    await handleLogout()
  }

  return (
    <button data-testid="clear" type="button" onClick={onClear}>
      Clear
    </button>
  )
}

// Simplified Boilerplate app
const App = (props: { initialToken?: string }) => {
  return (
    <AuthProvider existingToken={props.initialToken}>
      <>
        <Error />
        <AuthenticationSuccess />
        <ButtonClear />
        <DisplayInformation />
        <Button />
      </>
    </AuthProvider>
  )
}

describe('AuthProvider', () => {
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
    expect(getByTestId(/auth/).textContent).toEqual('false')
  })

  it('updates state through handleLogin', async () => {
    const scope = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/auth/magic-link')
      .reply(200, _.merge(mocks.successResponse, { type: 'PWD' }))

    const { getByTestId } = render(<App />)

    expect(getByTestId(/auth/).textContent).toEqual('false')

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/auth/).textContent
      expect(result).toEqual(mocks.successResponse.token)

      const isloggedin = getByTestId(/is-loggedin/).textContent
      expect(isloggedin).toEqual('true')
    })
    scope.done()
  })

  it('updates error through handleLogin', async () => {
    const scope = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/auth/magic-link')
      .reply(401, mocks.invalidResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/error/).textContent
      // custom error message defined in auth service
      expect(result).toEqual(
        'Invalid or expired login token/password. Try again.'
      )
    })
    scope.done()
  })

  it('handleLogout clears authentication', async () => {
    const scope = nock(Config.coreAPI)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/auth/magic-link')
      .reply(200, _.merge(mocks.successResponse, { type: 'PWD' }))

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/auth/).textContent
      expect(result).toEqual(mocks.successResponse.token)
    })

    fireEvent.click(getByTestId(/clear/))

    await waitFor(() => {
      const result1 = getByTestId(/error/).textContent
      expect(result1).toEqual('')

      const result2 = getByTestId(/auth/).textContent
      expect(result2).toEqual('false')
    })
    scope.done()
  })

  it('sets auth token from App', async () => {
    Repo.setItem('access_token', 'xpto')
    const initialToken = 'xpto'
    const { getByTestId } = render(<App initialToken={initialToken} />)

    await waitFor(() => {
      const isloggedin = getByTestId(/is-loggedin/).textContent
      expect(isloggedin).toEqual('true')

      expect(getByTestId(/auth/).textContent).toEqual('xpto')
    })
    Repo.removeItem('access_token')
  })
})
