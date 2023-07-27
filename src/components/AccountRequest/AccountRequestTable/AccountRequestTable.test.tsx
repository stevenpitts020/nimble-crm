import React from 'react'
import { AccountRequestTable } from './AccountRequestTable'
import { AccountRequestProvider } from '../../../store/AccountRequestProvider'
import { waitFor } from '@testing-library/react'
import nock from 'nock'
import axios from 'axios'
import * as mocks from '../../../services/__mocks__/AccountRequest'
import { renderWithReactRouter } from '../AccountHeader/AccountHeader.test'
import Config from '../../../services/Config'

describe('AccountRequestTable', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  // rendering variations on env require --updateSnapshot to be run on test runner instance
  test.skip('it renders the account requests', async () => {
    const mockedResponse = [mocks.successResponseApproved]
    const mockedCountResponse = mocks.successCountResponse
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests/)
      .reply(200, mockedResponse)

    const countScope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests\/count/)
      .reply(200, mockedCountResponse)

    const { container } = renderWithReactRouter(
      <AccountRequestProvider>
        <AccountRequestTable />
      </AccountRequestProvider>
    )

    await waitFor(() => {
      scope.done()
      countScope.done()
    })
    expect(container).toMatchSnapshot()
  })

  test('it renders empty component', async () => {
    const mockedResponse = [] as any
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(/account-requests/)
      .reply(200, mockedResponse)

    const { getByTestId } = renderWithReactRouter(
      <AccountRequestProvider>
        <AccountRequestTable />
      </AccountRequestProvider>
    )

    await waitFor(() => {
      const empty = getByTestId('empty-accounts')
      expect(empty).toBeInTheDocument()
    })
    scope.done()
  })
})
