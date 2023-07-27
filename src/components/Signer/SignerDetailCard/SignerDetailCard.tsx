import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import {
  SignerStatus,
  SignerPersonalInfo,
  SignerModalMenu,
  SignerEmailVerification,
} from '../../../components'

import { IProductOptionsConfiguration, SignerSchema } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'
import { SignerVerificationStatus } from '../SignerVerification/SignerVerificationStatus'
import { SignerCreditScore } from '../SignerCreditScore/SignerCreditScore'

interface ISignerDetail {
  loading?: boolean
  signer: SignerSchema
  createdAt: string // TODO: this should be inside signer but waiting for API
  productOptions: IProductOptionsConfiguration[]
}

export const SignerDetailCard: React.FC<ISignerDetail> = (
  props: ISignerDetail
) => {
  const { signer, productOptions } = props
  const { Title } = Typography
  // TODO: reactivate credit score check
  const status = 'success'
  const data = undefined
  const hasCreditReport = 'no-report'

  return (
    <Card
      data-testid="signer-detail-card"
      bordered={false}
      className="ni-signer-detail-card"
      loading={props.loading}
    >
      <Row gutter={[0, 0]} justify="space-between" className="card-body">
        <Col xs={24} sm={24} md={24} lg={6} xl={4} className="signer-left">
          {status === 'success' && (
            <SignerStatus
              fullName={FormatHelper.signerFullName(signer)}
              size={171}
              role={signer.role}
              photoSource={signer.selfie?.default}
              step={signer.step}
              scoreData={data && data[0]}
            />
          )}
          {!FormatHelper.isEmpty(data) && <SignerCreditScore data={data![0]} />}
        </Col>
        <Col xs={24} sm={24} md={24} lg={18} xl={20} className="signer-center">
          <Row gutter={0} align="middle" justify="space-between">
            <Title level={1}>{FormatHelper.signerFullName(signer)}</Title>
            <Row gutter={0} justify={'space-between'}>
              <SignerEmailVerification
                signerId={signer.id}
                emailVerified={signer.emailVerified}
                emailVerifiedAt={signer.emailVerifiedAt}
              />
              <div className="account-status">
                <p className={signer.status?.toLowerCase()}>
                  {signer.status?.toLowerCase()}
                </p>
              </div>
            </Row>
          </Row>
          <SignerModalMenu
            signer={signer}
            report={hasCreditReport}
            productOptions={productOptions}
          />
          <Row gutter={0} align="middle">
            <SignerPersonalInfo signer={signer} />
          </Row>
        </Col>
      </Row>
      <Row className="card-footer">
        <SignerVerificationStatus
          verificationStatus={signer.verificationStatus}
        />
      </Row>
    </Card>
  )
}

SignerDetailCard.defaultProps = {
  loading: false,
}
