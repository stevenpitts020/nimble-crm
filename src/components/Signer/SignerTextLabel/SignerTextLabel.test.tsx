import React from 'react'
import { render } from '@testing-library/react'
import { SignerTextLabel } from './SignerTextLabel'

const renderApp = (props: any) => {
  return render(<SignerTextLabel {...props} />)
}

describe('<SignerTextLabel />', () => {
  test('should render content', () => {
    const props = {
      label: 'Food Type',
      text: 'Vegan',
    }
    const { getByText } = renderApp(props)

    expect(getByText(props.label)).toBeInTheDocument()
    expect(getByText(props.text)).toBeInTheDocument()
  })

  test('should render content with null label', () => {
    const props = {
      label: null,
      text: 'Vegan',
    }
    const { getByText } = renderApp(props)

    expect(getByText(props.text)).toBeInTheDocument()
  })
})
