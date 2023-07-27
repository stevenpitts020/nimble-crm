import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AccountRequestDetailContext } from '../../../store/AccountRequestDetailProvider'
import * as mocks from '../../../services/__mocks__/AccountRequest'
import { AccountHeader } from './AccountHeader'

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

describe('<Account Header />', () => {
  describe('with default props', () => {
    test('should render ok', () => {
      const props = {
        accountRequestId: 'xpto',
        accountNumber: 'xpto2',
        title: 'I dunno',
        contract: {
          uri: 'https://google.com',
        },
        bsa: {
          score: 5,
          risk: 'Moderate',
        },
        branchName: 'Branch#1',
      }

      const { getByTestId } = renderWithReactRouter(
        <AccountHeader {...props} />
      )

      const container = getByTestId('ni-account-request-header')
      expect(container).toBeInTheDocument()
    })

    test('should render title, id', () => {
      const props = {
        title: 'mister',
        id: 'xpto',
        accountRequestId: 'xpto',
        accountNumber: 'xpto2',
      }

      const { getByText } = renderWithReactRouter(<AccountHeader {...props} />)
      expect(getByText('mister')).toBeInTheDocument()
      expect(getByText(/xpto/)).toBeInTheDocument()
    })

    test('should render agreement button', () => {
      const props = {
        title: 'mister',
        id: 'xpto',
        contract: {
          uri: 'https://google.com',
        },
        accountRequestId: 'xpto',
        accountNumber: 'xpto2',
        branchName: 'Branch#1',
      }
      const accountState = {
        accountRequest: mocks.successCountResponse,
        status: 'idle',
        error: null,
      }
      const { getByText } = renderWithReactRouter(
        <AccountRequestDetailContext.Provider
          value={{
            accountState,
          }}
        >
          <AccountHeader {...props} />
        </AccountRequestDetailContext.Provider>
      )
      expect(getByText('See Agreement')).toBeInTheDocument()
    })
    test('should show branch name', () => {
      const props = {
        title: 'mister',
        id: 'xpto',
        contract: {
          uri: 'https://google.com',
        },
        accountRequestId: 'xpto',
        accountNumber: 'xpto2',
        branchName: 'Branch#1',
      }
      const { getByText } = renderWithReactRouter(<AccountHeader {...props} />)
      expect(getByText(/Branch#1/)).toBeInTheDocument()
    })
  })
})
