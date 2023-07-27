import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ModalIdentity } from './ModalIdentity'
import { successResponse } from '../../../services/__mocks__/AccountRequest'
import FormatHelper from '../../../utils/FormatHelper'

const renderApp = (props: any) => {
  return render(<ModalIdentity {...props} />)
}
// this needs to load provider and mock response in order to pass
describe.skip('<ModalIdentity />', () => {
  test('should render basic content', () => {
    const [signer] = successResponse.signers
    const { getByText } = renderApp({ signer, text: 'hello' })

    fireEvent.click(getByText(/hello/))
    expect(getByText('Identity Verification')).toBeInTheDocument()
    expect(getByText('Address')).toBeInTheDocument()
    expect(getByText(FormatHelper.signerFullName(signer))).toBeInTheDocument()
  })
})
