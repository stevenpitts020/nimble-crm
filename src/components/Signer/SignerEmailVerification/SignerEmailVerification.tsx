import React, { useState } from 'react'
import { SignerEmailVerificationService, log } from '../../../services/'
interface ISignerEmailVerification {
  signerId: string
  emailVerified: boolean
  emailVerifiedAt?: string // not using this atm but could be usefull in the future
}

export const SignerEmailVerification: React.FC<ISignerEmailVerification> = (
  props: ISignerEmailVerification
) => {
  const { emailVerified, signerId } = props
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState('Resend Verification Email')
  const handleResendVerification = async (
    ev: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLoading(true)
    try {
      const response = await SignerEmailVerificationService.sendEmailVerification(
        signerId
      )
      setButtonText('Verification Email sent')
      log.info(response, 'resendVerificationEmail')
    } catch (error) {
      setButtonText('Verification was not sent')
      log.error(error, 'resendVerificationEmail')
    }
    setLoading(false)
  }
  return (
    <div className="email-verification-status">
      {emailVerified ? (
        <p className={'email-verified'}>Email Verified</p>
      ) : (
        <button
          onClick={handleResendVerification}
          disabled={loading}
          data-testid="resendButton"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
