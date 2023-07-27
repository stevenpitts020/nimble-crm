import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { SignerIdProofImages } from './SignerIdProofImages'

const renderApp = (props: any) => {
  return render(<SignerIdProofImages {...props} />)
}

describe('<SignerIdProofImages />', () => {
  test('should render empty images', () => {
    const props = {}
    const { getByTestId } = renderApp(props)

    expect(getByTestId('signer-id-proof-images')).toBeInTheDocument()
  })

  test('should render front image', () => {
    const props = {
      imageFront: 'public/apple-touch-icon.png',
      imageBack: 'public/apple-touch-icon2.png',
    }
    const { getByAltText } = renderApp(props)
    expect(getByAltText('front').getAttribute('src')).toEqual(props.imageFront)
  })

  test('should render back image', async () => {
    const props = {
      type: 'USDL',
      imageFront: 'public/apple-touch-icon.png',
      imageBack: 'public/apple-touch-icon2.png',
    }
    const { getByAltText, getByText } = renderApp(props)
    fireEvent.click(getByText('Back'), 'click')

    await waitFor(() => {
      expect(getByAltText('back').getAttribute('src')).toEqual(props.imageBack)
    })
  })
})
