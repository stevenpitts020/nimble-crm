import React from 'react'
import { render } from '@testing-library/react'
import { SignerDocuments } from './SignerDocuments'

const renderApp = (props: any) => {
  return render(<SignerDocuments {...props} />)
}

describe('<SignerDocuments />', () => {
  test('should render content', () => {
    const props = {
      imageFront: 'public/apple-touch-icon.png',
      imageBack: 'public/apple-touch-icon2.png',
      documentType: 'USDL',
      documentNumber: '200',
      documentExpirationDate: '2019-03-10T12:34:11.341Z',
      documentIssuedDate: '1970-03-16T12:34:11.341Z',
    }
    const { getByText } = renderApp(props)

    expect(getByText(props.documentNumber)).toBeInTheDocument()
    expect(getByText('Mar 10, 2019')).toBeInTheDocument()
    expect(getByText('Mar 16, 1970')).toBeInTheDocument()
  })

  test('should render content with pending if not existing', () => {
    const props = {
      imageFront: 'public/apple-touch-icon.png',
      imageBack: 'public/apple-touch-icon2.png',
    }
    const { getAllByText } = renderApp(props)

    expect(getAllByText('Pending').length).toEqual(3)
  })
})
