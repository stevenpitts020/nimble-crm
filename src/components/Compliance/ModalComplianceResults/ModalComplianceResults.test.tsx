import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { ModalComplianceResults } from './ModalComplianceResults'
import { successResponseApproved as successResponse } from '../../../services/__mocks__/AccountRequest'
import FormatHelper from '../../../utils/FormatHelper'
import { SignerComplianceVerificationProvider } from '../../../store/SignerComplianceVerificationProvider'
import AuthProvider from '../../../store/AuthProvider'

const renderApp = (props: any) => {
  return render(
    <AuthProvider existingToken="xpto">
      <SignerComplianceVerificationProvider>
        <ModalComplianceResults {...props} />
      </SignerComplianceVerificationProvider>
    </AuthProvider>
  )
}

describe('<ModalComplianceResults />', () => {
  test('should render both images', async () => {
    const signer = successResponse.signers[0]
    const { getByText, getByAltText } = renderApp({ signer, text: 'hello' })

    fireEvent.click(getByText(/hello/))

    // TODO mock get data
    await waitFor(() => {
      expect(
        getByAltText(FormatHelper.signerFullName(signer))
      ).toBeInTheDocument()
    })
  })
})
