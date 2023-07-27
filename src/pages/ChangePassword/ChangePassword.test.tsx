import React from 'react'
import { render, waitFor } from '@testing-library/react'
import ChangePassword from './ChangePassword'
import AuthProvider from '../../store/AuthProvider'

describe('Change the password page is rendered', () => {
  it('should render ok', async () => {
    const { getByText } = render(
      <AuthProvider>
        <ChangePassword />
      </AuthProvider>
    )

    await waitFor(() => {
      const container = getByText('Change your password')
      expect(container).toBeInTheDocument()
    })
  })
})
