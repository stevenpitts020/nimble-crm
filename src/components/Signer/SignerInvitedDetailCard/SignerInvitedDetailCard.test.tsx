import React from 'react'
import { render } from '@testing-library/react'
import { SignerInvitedDetailCard } from './SignerInvitedDetailCard'
import { successResponseApproved } from '../../../services/__mocks__/AccountRequest'

const renderApp = (props: any) => {
  return render(<SignerInvitedDetailCard {...props} />)
}

describe('<SignerInvitedDetailCard />', () => {
  test('should render content', () => {
    const [signer] = successResponseApproved.signers
    const { getByText, getByTestId } = renderApp({ signer })

    const email = signer.email || ''
    expect(email).toBeTruthy()
    expect(getByText(email)).toBeInTheDocument()

    const role = signer.role || ''
    expect(getByText(role)).toBeInTheDocument()

    expect(getByTestId('SignerInvited-resendInvite')).toBeInTheDocument()
  })
})
