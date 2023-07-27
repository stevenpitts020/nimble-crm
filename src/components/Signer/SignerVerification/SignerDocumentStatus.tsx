import React from 'react'
import { LabelWithText } from './LabelWithText'

interface ISignerDocumentStatus {
  signerStatus?: 'INVITED' | 'PENDING' | 'SIGNED'
  accountRequestStatus: string
}

export const SignerDocumentStatus: React.FC<ISignerDocumentStatus> = ({
  signerStatus,
  accountRequestStatus,
}) => {
  if (signerStatus === 'SIGNED' || accountRequestStatus === 'SIGNED') {
    return (
      <LabelWithText label="Agreement">
        <span data-testid="signed-contract">{` Signed`}</span>
      </LabelWithText>
    )
  }

  const waiting =
    accountRequestStatus === 'INCOMPLETE' && signerStatus === 'PENDING'

  return (
    <LabelWithText label="Agreement">
      <span data-testid="pending-contract">
        {waiting ? ` Waiting for other signers` : ` Pending Signature`}
      </span>
    </LabelWithText>
  )
}
