import React from 'react'
import { render } from '@testing-library/react'
import { SignerRole } from './SignerRole'

const renderApp = (props: any) => {
  return render(<SignerRole {...props} />)
}

describe('<SignerRole />', () => {
  test('should render content', () => {
    const props = {
      role: 'primary',
    }
    const { getByText } = renderApp(props)

    const role = getByText(props.role)
    expect(role).toBeInTheDocument()
  })
})
