import React from 'react'
import { render, waitFor } from '@testing-library/react'
import AccountRequestDetail from './AccountRequestDetail'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { AccountRequestDetailContext } from '../../store/AccountRequestDetailProvider'
import { AlertProvider } from '../../store/AlertProvider'
import { AlertMessage } from '../../components/Common/AlertMessage/AlertMessage'
import { ProfileProvider } from '../../store/ProfileProvider'
import AuthProvider from '../../store/AuthProvider'
import * as mocks from '../../services/__mocks__/AccountRequest'

import nock from 'nock'
import axios from 'axios'
import Config from '../../services/Config'

const renderApp = (props: any) => {
  const history = createMemoryHistory()
  const { accountRequestProviderValue, ...otherProps } = props
  return render(
    <Router history={history}>
      <AuthProvider>
        <AlertProvider>
          <AlertMessage />
          <ProfileProvider>
            <AccountRequestDetailContext.Provider
              value={accountRequestProviderValue}
            >
              <AccountRequestDetail
                {...accountRequestProviderValue}
                {...otherProps}
              />
            </AccountRequestDetailContext.Provider>
          </ProfileProvider>
        </AlertProvider>
      </AuthProvider>
    </Router>
  )
}

describe('<AccountRequestDetail />', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)

    nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(
        '/account-requests/2552ab85-08da-4bb5-be00-9e94d282d348/bsa-risk-results'
      )
      .reply(200, mocks.bsaRiskResultsMock)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('should render if loaded account request ok', async () => {
    const accountRequest = mocks.successResponseApproved
    const accountRequestProviderValue = {
      accountState: { status: 'success', accountRequest },
      getAccountRequest: jest.fn(),
    }
    const { getByTestId } = renderApp({
      id: accountRequest.id,
      accountRequestProviderValue,
    })

    await waitFor(() => {
      const container = getByTestId('account-detail')
      expect(container).toBeInTheDocument()
    })
  })

  test('should render not ok', async () => {
    const accountRequestProviderValue = {
      accountState: { status: 'failure', accountRequest: undefined },
      getAccountRequest: jest.fn(),
    }

    const { getByText } = renderApp({ id: null, accountRequestProviderValue })
    await waitFor(() => {
      const container = getByText('Cannot find that account request.')
      expect(container).toBeInTheDocument()
    })
  })

  test('shows onboarded and invited signers', async () => {
    const accountRequest = mocks.successResponse
    const accountRequestProviderValue = {
      accountState: { status: 'success', accountRequest },
      getAccountRequest: jest.fn(),
    }

    const { getAllByTestId } = renderApp({
      id: accountRequest.id,
      accountRequestProviderValue,
    })

    await waitFor(() => {
      const invited = accountRequest.signers.filter(s => s.status === 'INVITED')
      expect(invited.length).toBeGreaterThanOrEqual(0)
      const invitedCards = getAllByTestId('signer-invited-detail-card')
      expect(invitedCards).toHaveLength(invited.length)
    })
  })
  test('should show who approved the account request', async () => {
    const accountRequest = mocks.successResponse
    const accountRequestProviderValue = {
      accountState: { status: 'success', accountRequest },
      getAccountRequest: jest.fn(),
    }
    const { getByText } = renderApp({
      id: accountRequest.id,
      accountRequestProviderValue,
    })
    expect(
      getByText(
        'REQUEST ACCEPTED BY GEORGE LUCAS (DEMOUSER@NIMBLEFI.COM) ON 12-23-2019 03:32 pm'
      )
    ).toBeInTheDocument()
  })
  test('should show who rejected the account request', async () => {
    const accountRequest = mocks.successResponseDeclined
    const accountRequestProviderValue = {
      accountState: { status: 'success', accountRequest },
      getAccountRequest: jest.fn(),
    }
    const { getByText } = renderApp({
      id: accountRequest.id,
      accountRequestProviderValue,
    })
    expect(
      getByText(
        'REQUEST DECLINED BY GEORGE LUCAS (DEMOUSER@NIMBLEFI.COM) ON 12-23-2019 03:32 pm'
      )
    ).toBeInTheDocument()
  })
})
