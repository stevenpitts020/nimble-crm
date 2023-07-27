import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import ErrorPassword from './ErrorPassword'
import { RequestPasswordProvider } from '../../store/RequestPasswordProvider'

const errorPasswordWithProvider = (props: any) => {
  return (
    <RequestPasswordProvider>
      <ErrorPassword {...props} />
    </RequestPasswordProvider>
  )
}

export const renderWithReactRouter = (
  ui: any,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: any = {}
) => {
  const Wrapper = ({ children }: any) => (
    <Router history={history}>
      {/* I need to copy and paste the route from MainContainer for this to work*/}
      <Route
        path="/auth/error/:code"
        exact={true}
        key="errorPassword"
        component={ErrorPassword}
      />
      {children}
    </Router>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  }
}

describe('<ErrorPassword />', () => {
  describe('Reset Password ', () => {
    it('should render reset link expired', async () => {
      const props = {}
      const { getByText } = renderWithReactRouter(
        errorPasswordWithProvider(props),
        { route: '/auth/error/reset-expired' }
      )

      await waitFor(() => {
        const container = getByText('This password reset link has expired')
        expect(container).toBeInTheDocument()
      })
    })

    it('should render reset link used', async () => {
      const props = {}
      const { getByText } = renderWithReactRouter(
        errorPasswordWithProvider(props),
        { route: '/auth/error/reset-used' }
      )

      await waitFor(() => {
        const container = getByText(
          'This password reset link has already been used'
        )
        expect(container).toBeInTheDocument()
      })
    })
  })

  describe('Set Password ', () => {
    it('should render set password link expired', async () => {
      const props = {}
      const { getByText } = renderWithReactRouter(
        errorPasswordWithProvider(props),
        { route: '/auth/error/password-expired' }
      )

      await waitFor(() => {
        const container = getByText('This set password link has expired')
        expect(container).toBeInTheDocument()
      })
    })

    it('should render set password link used', async () => {
      const props = {}
      const { getByText } = renderWithReactRouter(
        errorPasswordWithProvider(props),
        { route: '/auth/error/password-used' }
      )

      await waitFor(() => {
        const container = getByText(
          'This set password link has already been used'
        )
        expect(container).toBeInTheDocument()
      })
    })
  })
})
