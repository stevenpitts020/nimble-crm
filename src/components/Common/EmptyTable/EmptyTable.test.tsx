import React from 'react'
import { render } from '@testing-library/react'
import { EmptyTable } from './EmptyTable'

describe('<EmptyTable />', () => {
  test('Shows title and description', async () => {
    const { getByText } = render(<EmptyTable />)

    expect(getByText(/This list is empty/i)).toBeInTheDocument()
  })
})
