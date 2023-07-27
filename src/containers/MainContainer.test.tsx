import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/Profile'
import * as accountsMocks from '../services/__mocks__/AccountRequest'
import Config from '../services/Config'
import MainContainer from './MainContainer'
import AuthProvider from '../store/AuthProvider'
import Repo from '../services/Repo'

const renderApp = (props: any) => {
  return render(
    <AuthProvider existingToken="xpto">
      <Router>
        <MainContainer {...props} />
      </Router>
    </AuthProvider>
  )
}
// tslint:disable-next-line: no-var-requires
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('<MainContainer />', () => {
  describe('When not signed in', () => {
    it('should render Login Page', () => {
      const props = {}
      const { getByText } = renderApp(props)
      const container = getByText('Sign In with Email')
      expect(container).toBeInTheDocument()
    })
  })

  describe('When signed in', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    test('should redirect to Account Requests Page', async () => {
      Repo.setItem('access_token', 'xpto')

      nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/account-requests/count')
        .reply(200, { count: 200 })

      nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/me/')
        .reply(200, mocks.successResponse)

      nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/account-requests?limit=10&offset=0&sort=createdAt')
        .reply(200, [accountsMocks])

      Repo.setItem('access_token', 'xpto')

      // there are providers that change state on useEffect
      await waitFor(() => {
        const { getByText } = renderApp({})

        const container = getByText(/Account/i)
        expect(container).toBeInTheDocument()
      })

      Repo.removeItem('access_token')
    })
  })

  describe('when token expires', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should redirect to Login Page', async () => {
      Repo.setItem('access_token', 'xpto')

      const scope1 = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/me/')
        .reply(200, mocks.successResponse)

      const scope2 = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(
          '/account-requests?limit=10&offset=0&sort=-createdAt&status=!DRAFT'
        )
        .reply(401, mocks.invalidResponse)

      const { container } = renderApp({})

      // there are providers that change state on useEffect
      await waitFor(() => {
        expect(container).toHaveTextContent('Your session has expired')
      })

      scope1.done()
      scope2.done()
      Repo.removeItem('access_token')
    })
  })
})
