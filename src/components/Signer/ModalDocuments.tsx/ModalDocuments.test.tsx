import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ModalDocuments } from './ModalDocuments'
import { successResponseApproved } from '../../../services/__mocks__/AccountRequest'
import FormatHelper from '../../../utils/FormatHelper'

const renderApp = (props: any) => {
  return render(<ModalDocuments {...props} />)
}

describe('<ModalDocuments />', () => {
  test('should render both images', () => {
    const [signer] = successResponseApproved.signers
    const { getByText, getByAltText } = renderApp({ signer, text: 'hello' })

    fireEvent.click(getByText(/hello/))

    expect(getByText(FormatHelper.signerFullName(signer))).toBeInTheDocument()

    expect(getByAltText('front').getAttribute('src')).toEqual(
      signer.idProofDocument.frontIdProof.default
    )
    expect(getByAltText('back').getAttribute('src')).toEqual(
      signer.idProofDocument.backIdProof.default
    )
  })
})
