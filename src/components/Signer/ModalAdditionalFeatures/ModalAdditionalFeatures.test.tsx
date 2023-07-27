import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ModalAdditionalFeatures } from './ModalAdditionalFeatures'
import { successResponseApproved } from '../../../services/__mocks__/AccountRequest'

const productOptions = [
  {
    key: 'atm_only_card',
    category: 'product_feature',
    title: 'ATM Only Card',
    value: 'true',
  },
  {
    key: 'bill_pay',
    category: 'product_feature',
    title: 'Bill Pay',
    value: 'true',
  },
  {
    id: '75b0c309-1412-4786-ae42-8fbbfa5dc34c',
    key: 'checks',
    category: 'product_feature',
    value: 'true',
  },
  {
    key: 'debit_card',
    category: 'product_feature',
    title: 'Debit Card',
    value: 'true',
  },
  {
    key: 'e_statements',
    category: 'product_feature',
    title: 'E-Statements',
    value: 'true',
  },
  {
    key: 'mobile_and_online_banking',
    category: 'product_feature',
    title: 'Mobile & Online Banking',
    value: 'true',
  },
  {
    key: 'mobile_deposits',
    category: 'product_feature',
    title: 'Mobile Deposits',
    value: 'true',
  },
]
const renderApp = (props: any) => {
  return render(<ModalAdditionalFeatures {...props} />)
}
describe('<ModalAdditionalFeatus />', () => {
  test('should render basic content', () => {
    const [signer] = successResponseApproved.signers
    const { getByText } = renderApp({ signer, text: 'hello', productOptions })

    fireEvent.click(getByText(/hello/))
    expect(getByText('Additional Features')).toBeInTheDocument()
    expect(getByText('ATM Only Card')).toBeInTheDocument()
  })
  test('should render show empty message if no product options', () => {
    const [signer] = successResponseApproved.signers
    const { getByText } = renderApp({
      signer,
      text: 'hello',
      productOptions: [],
    })

    fireEvent.click(getByText(/hello/))
    expect(getByText('No additional Features available')).toBeInTheDocument()
  })
})
