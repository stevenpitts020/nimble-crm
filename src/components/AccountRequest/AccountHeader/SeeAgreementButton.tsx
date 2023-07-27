import React from 'react'
import { Button } from 'antd'
import {
  CheckCircleWhiteIcon,
  AlertTriangleIconWhite,
} from '../../Common/Icon/Icon'

interface IAgreementButton {
  uri: string
  accountRequestStatus: string
}
const composeButtonClassName = (completed: boolean, declined: boolean) => {
  const className = ['agreement-button']
  if (completed) {
    className.push('completed')
  }
  if (declined) {
    className.push('declined')
  }
  return className.join(' ')
}

export const SeeAgreementButton: React.FC<IAgreementButton> = ({
  uri,
  accountRequestStatus,
}) => {
  const completed =
    accountRequestStatus === 'COMPLETED' ||
    accountRequestStatus === 'SIGNED' ||
    accountRequestStatus === 'APPROVED'

  const declined = accountRequestStatus === 'DECLINED'

  return (
    <a
      href={uri}
      target="_blank"
      rel="noreferrer noopener"
      data-testid="agreement-button"
      data-status={accountRequestStatus}
    >
      <Button
        shape="round"
        className={composeButtonClassName(completed, declined)}
      >
        {completed ? (
          <CheckCircleWhiteIcon data-testid="signed" />
        ) : (
          <AlertTriangleIconWhite data-testid="pending" />
        )}
        See Agreement
      </Button>
    </a>
  )
}
