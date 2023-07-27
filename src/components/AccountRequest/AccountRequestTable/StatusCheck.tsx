import React from 'react'
import { Tooltip } from 'antd'
import { ValidationIcon } from '../../Signer/SignerVerification/SignerVerificationStatus'

interface IStatusCheck {
  title: string
  verificationCheck: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH'
}

export const StatusCheck: React.FC<IStatusCheck> = ({
  title,
  verificationCheck,
}) => {
  return (
    <Tooltip title={title}>
      <div className="status-check-item">
        <span aria-hidden="true" hidden={true}>
          {title}
        </span>

        <ValidationIcon check={verificationCheck} />
      </div>
    </Tooltip>
  )
}
