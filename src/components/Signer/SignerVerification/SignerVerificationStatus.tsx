import React from 'react'
import { Row, Col, Spin } from 'antd'
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  Stack,
  PendingCircleIcon,
} from '../../../components'
import { SignerVerificationStatusSchema } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'
import { LabelWithText } from './LabelWithText'

// auxiliary short versions
const checkedIcon = () => (
  <CheckCircleIcon style={{ fontSize: '24px' }} data-testid="passed" />
)
const alertIcon = () => (
  <AlertTriangleIcon style={{ fontSize: '24px' }} data-testid="failed" />
)
const pendingIcon = () => (
  <PendingCircleIcon style={{ fontSize: '24px' }} data-testid="pending" />
)

/**
 * Return an Icon Valid or Invalid
 * @param props check 1 or 0
 */
export const ValidationIcon = (props: {
  check: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH'
}) => {
  switch (props.check) {
    case 'NOMATCH':
    case 'VALID':
      return checkedIcon()
    case 'INVALID':
    case 'MATCH':
      return alertIcon()
    default:
      return pendingIcon()
  }
}

export const validCheck = (
  check: 'VALID' | 'INVALID' | 'PENDING' | 'NOMATCH' | 'MATCH',
  date: string
) => {
  const formattedDate = FormatHelper.dateFormat(new Date(date), '-')

  switch (check) {
    case 'VALID':
      return 'Successful Verification'
    case 'INVALID':
      return formattedDate
    case 'MATCH':
      return 'Possible Matches'
    case 'NOMATCH':
      return 'No matches'
    default:
      return 'Pending'
  }
}

interface IVerification {
  verificationStatus?: SignerVerificationStatusSchema
}

export const SignerVerificationStatus: React.FC<IVerification> = (
  props: IVerification
) => {
  // shortcut
  const status = props.verificationStatus

  if (status === undefined) {
    return <Spin />
  }

  return (
    <Row
      gutter={[0, 16]}
      className="ni-signer-verification"
      data-testid="ni-signer-verification"
    >
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon check={status.faceStatus} />
          <LabelWithText label="Face">
            {validCheck(status.faceStatus, status.faceUpdatedAt)}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon check={status.documentStatus} />
          <LabelWithText label="Document">
            {validCheck(status.documentStatus, status.documentUpdatedAt)}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon check={status.addressStatus} />
          <LabelWithText label="Address">
            {validCheck(status.addressStatus, status.addressUpdatedAt)}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon check={status.sanctionsStatus} />
          <LabelWithText label="Sanctions">
            {validCheck(status.sanctionsStatus, status.sanctionsUpdatedAt)}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon check={status.mediaStatus} />
          <LabelWithText label="Adverse Media">
            {validCheck(status.mediaStatus, status.mediaUpdatedAt)}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon check={status.politicalExposure} />
          <LabelWithText label="Politically Exposed">
            {validCheck(
              status.politicalExposure,
              status.politicalExposureUpdatedAt
            )}
          </LabelWithText>
        </Stack>
      </Col>
    </Row>
  )
}
