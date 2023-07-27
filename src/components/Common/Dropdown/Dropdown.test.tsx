import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Dropdown } from './Dropdown'
import { successResponse } from '../../../services/__mocks__/InstitutionBranches'
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: 'ni-test',
  }
  return render(<Dropdown {...defaultProps} {...props} />)
}
describe('Dropdown', () => {
  test('should render correctly', () => {
    renderWithProps({ className: 'ni-test' })
    expect(screen.getByTestId('select-branches')).toBeInTheDocument()
  })
  test('select branch', () => {
    renderWithProps({ className: 'ni-test', options: successResponse })
    const select = screen.getByTestId('select-branches')
    fireEvent.change(select, { target: { value: 'Brookings' } })
    expect(screen.getByText(/Brookings/i)).toBeInTheDocument()
  })
})
