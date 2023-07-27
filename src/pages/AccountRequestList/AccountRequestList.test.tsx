import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../../services/__mocks__/AccountRequest'
import Config from '../../services/Config'

import AccountRequestList from './AccountRequestList'
import { AccountRequestProvider } from '../../store/AccountRequestProvider'
import AuthProvider from '../../store/AuthProvider'
import { ProfileProvider } from '../../store/ProfileProvider'

const renderApp = (props: any) => {
  const history = createMemoryHistory()

  return render(
    <Router history={history}>
      <AuthProvider>
        <ProfileProvider>
          <AccountRequestProvider>
            <AccountRequestList {...props} />
          </AccountRequestProvider>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  )
}

describe('<AccountRequestList />', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')
  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('should render ok', async () => {
    const mockedResponse = [mocks.successResponse]

    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests/)
      .reply(200, mockedResponse)

    const props = {}
    renderApp(props)

    await waitFor(() => {
      const container = screen.getByTestId('account-list')
      expect(container).toBeInTheDocument()
      scope.done()
    })
  })
})
