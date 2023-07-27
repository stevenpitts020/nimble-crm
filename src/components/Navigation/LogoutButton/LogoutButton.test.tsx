import React from 'react'
import { render } from '@testing-library/react'
import { LogoutButton } from './LogoutButton'

describe('<LogoutButton />', () => {
  test('renders button text', () => {
    const { getByText } = render(<LogoutButton />)
    const container = getByText(/Logout/i)

    expect(container).toBeInTheDocument()
  })
})
