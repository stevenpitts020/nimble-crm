import React from 'react'
import { render } from '@testing-library/react'
import { InstitutionAvatar } from './InstitutionAvatar'

describe('<InstitutionAvatar />', () => {
  test('renders image', () => {
    const { getByAltText } = render(
      <InstitutionAvatar src="apple-touch-icon.png" alt="company" />
    )
    const container = getByAltText(/company/i)

    expect(container).toBeInTheDocument()
  })
})
