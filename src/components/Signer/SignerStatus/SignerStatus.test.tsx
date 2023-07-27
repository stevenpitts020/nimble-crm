import React from 'react'
import { render } from '@testing-library/react'
import { SignerStatus } from './SignerStatus'

const renderApp = (props: any) => {
  return render(<SignerStatus {...props} />)
}

describe('<SignerStatus />', () => {
  test('should render image and role', () => {
    const props = {
      role: 'primary',
      fullName: 'Joe',
      photoSource: 'https://wearesingular.com/img/apple-touch-icon.png',
    }
    const { getByText, getByAltText } = renderApp(props)

    const role = getByText(props.role)
    expect(role).toBeInTheDocument()

    const img = getByAltText(props.fullName)
    expect(img).toHaveAttribute('src', props.photoSource)
  })
})
