import React from 'react'
import { render } from '@testing-library/react'
import { Box } from './Box'

const renderBox = (props: any) => {
  const defaultProps = {
    className: 'test-me',
  }
  return render(<Box {...defaultProps} {...props} />)
}

describe('<Box />', () => {
  test('renders learn react text', () => {
    const { getByText } = renderBox({ children: 'learn react' })
    const container = getByText(/learn react/i)

    expect(container).toBeInTheDocument()
  })

  test('renders custom textAlign', () => {
    const { getByText } = renderBox({
      textAlign: 'right',
      children: 'learn react',
    })
    const container = getByText(/learn react/i)

    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('u-align-right')
  })
})
