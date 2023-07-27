import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ModalPersonalInfo } from './ModalPersonalInfo'
import { successResponseApproved } from '../../../services/__mocks__/AccountRequest'
import FormatHelper from '../../../utils/FormatHelper'

const renderApp = (props: any) => {
  return render(<ModalPersonalInfo {...props} />)
}

describe('<ModalPersonalInfo />', () => {
  test('should render basic content', () => {
    const signer = successResponseApproved.signers[0]
    const { getByText } = renderApp({ signer, text: 'hello' })

    fireEvent.click(getByText(/hello/))

    expect(getByText('Detailed Information')).toBeInTheDocument()
    expect(getByText(FormatHelper.signerFullName(signer))).toBeInTheDocument()

    const email = signer.email || ''
    expect(getByText(email)).toBeInTheDocument()

    const address = signer.address || ''
    expect(getByText(address)).toBeInTheDocument()
  })
})
