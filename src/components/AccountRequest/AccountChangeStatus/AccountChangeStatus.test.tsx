import React from 'react'
import { render, waitFor, fireEvent, screen } from '@testing-library/react'
import { AccountChangeStatus } from './AccountChangeStatus'
import { AccountRequestDetailProvider } from '../../../store/AccountRequestDetailProvider'
import { ProfileProvider } from '../../../store/ProfileProvider'
import AuthProvider from '../../../store/AuthProvider'
import { successResponse } from '../../../services/__mocks__/InstitutionBranches'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../../../services/__mocks__/Profile'
import Config from '../../../services/Config'
import Repo from '../../../services/Repo'

const renderApp = (props: any) => {
  return render(
    <AuthProvider existingToken="xpto">
      <ProfileProvider>
        <AccountRequestDetailProvider>
          <AccountChangeStatus {...props} />
        </AccountRequestDetailProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

describe('<AccountChangeStatus />', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should render buttons', async () => {
    const props = {
      id: 'xpto',
      product: 'Simple Checking',
      amount: 200,
      accountNumber: '300-400',
      routingNumber: '500-600',
      primarySignerfullName: 'John Doe',
      disableAcceptButton: false,
      branches: successResponse,
    }
    Repo.setItem('access_token', 'xpto')
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/me/')
      .reply(200, mocks.successResponse)

    const { getByText } = renderApp(props)

    await waitFor(() => {
      const accept = getByText('Accept')
      expect(accept).toBeInTheDocument()

      const decline = getByText('Decline')
      expect(decline).toBeInTheDocument()
    })

    Repo.removeItem('access_token')
    scope.done()
  })

  it('should render button Accept disabled', async () => {
    const props = {
      id: 'xpto',
      product: 'Simple Checking',
      amount: 200,
      accountNumber: '300-400',
      routingNumber: '500-600',
      primarySignerfullName: 'John Doe',
      disableAcceptButton: true,
      branches: successResponse,
    }
    Repo.setItem('access_token', 'xpto')
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/me/')
      .reply(200, mocks.successResponse)

    const { getByTestId } = renderApp(props)

    await waitFor(() => {
      const accept = getByTestId('accept-button')
      expect(accept).toBeDisabled()
    })

    Repo.removeItem('access_token')
    scope.done()
  })

  it('should load information from profile on the accept textarea', async () => {
    const props = {
      id: 'xpto',
      product: 'Simple Checking',
      amount: 200,
      accountNumber: '300-400',
      routingNumber: '500-600',
      primarySignerfullName: 'John Doe',
      disableAcceptButton: false,
      branches: successResponse,
    }
    Repo.setItem('access_token', 'xpto')
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/me/')
      .reply(200, mocks.successResponse)

    const { getByPlaceholderText, getByText } = renderApp(props)
    fireEvent.click(getByText(/Accept/))

    await waitFor(() => {
      const result = getByPlaceholderText(/Insert Text/).textContent
      expect(result).toMatch(/200/) // employee name
      expect(result).toMatch(/John Goodman/) // employee name
      expect(result).toMatch(/Singular/) // company name
    })
    Repo.removeItem('access_token')
    scope.done()
  })

  it('should load information from profile on the decline textarea', async () => {
    const props = {
      id: 'xpto',
      product: 'Simple Checking',
      amount: 200,
      accountNumber: '300-400',
      routingNumber: '500-600',
      primarySignerfullName: '{$Signer_FullName}',
      disableAcceptButton: false,
      branches: successResponse,
    }
    Repo.setItem('access_token', 'xpto')
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/me/')
      .reply(200, mocks.successResponse)

    renderApp(props)

    fireEvent.click(screen.getByText(/Decline/))

    await waitFor(() => {
      screen.getByPlaceholderText(/Insert Text/)
    })

    expect(screen.getByPlaceholderText(/Insert Text/)).toHaveTextContent(
      /John Goodman/
    )
    expect(screen.getByPlaceholderText(/Insert Text/)).toHaveTextContent(
      '{$Signer_FullName}'
    )
    expect(screen.getByPlaceholderText(/Insert Text/)).toHaveTextContent(
      /Singular/
    )

    Repo.removeItem('access_token')
    scope.done()
  })
})
