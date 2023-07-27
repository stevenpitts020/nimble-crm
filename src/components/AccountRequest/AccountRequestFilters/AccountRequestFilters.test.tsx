import React from 'react'
import { Router } from 'react-router-dom'

import { AccountRequestTable } from '../AccountRequestTable/AccountRequestTable'
import { AccountRequestFilters } from './AccountRequestFilters'
import { AccountRequestProvider } from '../../../store/AccountRequestProvider'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../../../services/__mocks__/AccountRequest'
import Config from '../../../services/Config'
import AuthProvider from '../../../store/AuthProvider'
import { ProfileProvider } from '../../../store/ProfileProvider'

export const renderWithReactRouter = (
  ui: any,
  {
    route = '/accounts',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: any = {}
) => {
  const Wrapper = ({ children }: any) => (
    <Router history={history}>{children}</Router>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  }
}

describe('AccountRequestFilters', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })
  // no longer applies
  test.skip('it renders the account table with only Pending statuses by default', async () => {
    const mockedResponse = [mocks.successResponsePending]
    const mockedCountResponse = mocks.successCountResponseWithPendingFilter
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests/)
      .reply(200, mockedResponse)

    const countScope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests\/count/)
      .reply(200, mockedCountResponse)

    const { queryAllByTestId, getByTestId } = renderWithReactRouter(
      <AccountRequestProvider>
        <AccountRequestFilters />
        <AccountRequestTable />
      </AccountRequestProvider>
    )

    await waitFor(() => {
      const pendingRows = queryAllByTestId('status-PENDING')
      expect(pendingRows.length).toEqual(0)
      const pagination = getByTestId('pagination-total')
      expect(pagination).toHaveAttribute('data-pagination-total', '0')
      scope.done()
      countScope.done()
    })
  })

  test('it renders the account table with only Approved statuses after clicking on Approve filter', async () => {
    const mockedResponse = [
      mocks.successResponseApproved,
      mocks.successResponseDeclined,
      mocks.successResponsePending,
    ]
    const mockedCountResponse = mocks.successCountResponseWithApproveFilter

    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests/)
      .reply(200, mockedResponse)

    const countScope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests\/count/)
      .reply(200, mockedCountResponse)

    const { queryAllByTestId, getByText, getByTestId } = renderWithReactRouter(
      <AuthProvider>
        <ProfileProvider>
          <AccountRequestProvider>
            <AccountRequestFilters />
            <AccountRequestTable />
          </AccountRequestProvider>
        </ProfileProvider>
      </AuthProvider>
    )
    fireEvent.click(getByText('Approved'))

    await waitFor(() => {
      const approvedRows = queryAllByTestId('status-APPROVED')
      expect(approvedRows.length).toEqual(1)
      const pagination = getByTestId('pagination-total')
      expect(pagination).toHaveAttribute('data-pagination-total', '1')
      scope.done()
      countScope.done()
    })
  })

  test('it renders all account requests after you turn off filters', async () => {
    const mockedResponse = [
      mocks.successResponseApproved,
      mocks.successResponseDeclined,
      mocks.successResponsePending,
    ]
    const mockedCountResponse = mocks.successCountResponse
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests/)
      .reply(200, mockedResponse)

    const countScope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests\/count/)
      .reply(200, mockedCountResponse)

    const { queryAllByTestId, getByText, getByTestId } = renderWithReactRouter(
      <AuthProvider>
        <ProfileProvider>
          <AccountRequestProvider>
            <AccountRequestFilters />
            <AccountRequestTable />
          </AccountRequestProvider>
        </ProfileProvider>
      </AuthProvider>
    )

    fireEvent.click(getByText('Waiting Signatures'))

    await waitFor(() => {
      const allRows = queryAllByTestId(/^status/)
      expect(allRows.length).toEqual(mockedResponse.length)
      const pagination = getByTestId('pagination-total')
      expect(pagination).toHaveAttribute('data-pagination-total', `2`)
      scope.done()
      countScope.done()
    })
  })
})
