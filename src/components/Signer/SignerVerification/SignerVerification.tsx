import React from 'react'
import { Row, Col } from 'antd'
import { CheckCircleIcon, AlertTriangleIcon, Stack } from '../../../components'
import { IdentityVerificationResultSchema } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'
import { PoliticallyExposed } from './PoliticallyExposed'
import { LabelWithText } from './LabelWithText'
import { SignerDocumentStatus } from './SignerDocumentStatus'

// auxiliary short versions
const checkedIcon = () => (
  <CheckCircleIcon
    style={{ fontSize: '18px', paddingRight: '6px' }}
    data-testid="passed"
  />
)
const alertIcon = () => (
  <AlertTriangleIcon
    style={{ fontSize: '18px', paddingRight: '6px' }}
    data-testid="failed"
  />
)

/**
 * Return an Icon Valid or Invalid
 * @param props check 1 or 0
 */
const ValidationIcon = (props: { check: boolean }) => (
  <div data-testid={props.check ? 'passed' : 'failed'}>
    {props.check ? checkedIcon() : alertIcon()}
  </div>
)

export const validCheck = (validation: 1 | 0 | undefined, date: string) => {
  const formattedDate = FormatHelper.dateFormat(new Date(date), '-')
  if (validation === 1) {
    return 'Successful Verification'
  }
  return <>{formattedDate}</>
}

export const complyAdvantageCheck = (
  validation: boolean | null,
  date: Date | null
) => {
  if (date === null || validation || null) {
    return <>{`Pending`}</>
  }
  return 'Successful Verification'
}

export const docValid = (
  document: IdentityVerificationResultSchema['document'] | undefined
) => {
  if (document === undefined) {
    return 0
  }

  if (
    document.document_proof === 1 &&
    document.document === 1 &&
    document.document_must_not_be_expired === 1
  ) {
    return 1
  } else {
    return 0
  }
}

interface IVerification {
  identityVerification?: IdentityVerificationResultSchema | null
  shuftiValidationDate: string
  complyAdvantageChecks: {
    checkSanction: boolean | null
    sanctionVerifiedAt: Date | null
    checkPoliticalExposure: boolean | null
    politicalExposureVerifiedAt: Date | null
    checkAdverseMedia: boolean | null
    adverseMediaVerifiedAt: Date | null
  }
  agreement: {
    signerStatus?: 'INVITED' | 'PENDING' | 'SIGNED'
    accountRequestStatus: string
  }
}

// DEPRECATED

export const SignerVerification: React.FC<IVerification> = (
  props: IVerification
) => {
  const {
    identityVerification,
    shuftiValidationDate,
    complyAdvantageChecks,
  } = props
  const {
    checkSanction,
    sanctionVerifiedAt,
    checkPoliticalExposure,
    politicalExposureVerifiedAt,
    checkAdverseMedia,
    adverseMediaVerifiedAt,
  } = complyAdvantageChecks
  const { signerStatus, accountRequestStatus } = props.agreement

  return (
    <Row
      className="ni-signer-verification"
      data-testid="ni-signer-verification"
    >
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon
            check={docValid(identityVerification?.document) === 1}
          />
          <LabelWithText label="Document">
            {validCheck(
              docValid(identityVerification?.document),
              shuftiValidationDate
            )}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon check={identityVerification?.face === 1} />
          <LabelWithText label="Face">
            {validCheck(identityVerification?.face, shuftiValidationDate)}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon
            check={
              complyAdvantageCheck(checkSanction, sanctionVerifiedAt) ===
              'Successful Verification'
            }
          />
          <LabelWithText label="Sanctions">
            {complyAdvantageCheck(checkSanction, sanctionVerifiedAt)}
          </LabelWithText>
        </Stack>
      </Col>

      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon check={checkPoliticalExposure !== null} />
          <LabelWithText label="Politically Exposed">
            {checkPoliticalExposure !== null ? (
              <PoliticallyExposed
                checkPoliticalExposure={checkPoliticalExposure}
              />
            ) : (
              complyAdvantageCheck(
                checkPoliticalExposure,
                politicalExposureVerifiedAt
              )
            )}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon
            check={
              complyAdvantageCheck(
                checkAdverseMedia,
                adverseMediaVerifiedAt
              ) === 'Successful Verification'
            }
          />
          <LabelWithText label="Adverse Media">
            {complyAdvantageCheck(checkAdverseMedia, adverseMediaVerifiedAt)}
          </LabelWithText>
        </Stack>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Stack direction="horizontal" spacing="xs" verticalAlign="center">
          <ValidationIcon
            check={
              signerStatus === 'INVITED' || accountRequestStatus === 'INVITED'
            }
          />
          <SignerDocumentStatus
            signerStatus={signerStatus}
            accountRequestStatus={accountRequestStatus}
          />
        </Stack>
      </Col>
    </Row>
  )
}
