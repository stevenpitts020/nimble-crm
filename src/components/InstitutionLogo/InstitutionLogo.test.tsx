import React from 'react'
import { render } from '@testing-library/react'
import { InstitutionLogo } from './InstitutionLogo'

describe('<InstitutionLogo />', () => {
  test('renders image', () => {
    const { getByAltText } = render(
      <InstitutionLogo src="apple-touch-icon.png" alt="company" />
    )
    const container = getByAltText(/company/i)

    expect(container).toBeInTheDocument()
  })
})
