import React, { useState } from 'react'
import { SignerSchema } from '../../../store'
import { Card, Row, Col } from 'antd'
import { Typography, Button } from 'antd'
import { SignerStatus } from '../../../components'
import FormatHelper from '../../../utils/FormatHelper'
import { invitesService, log } from '../../../services'

interface Props {
  signer: SignerSchema
}

export const SignerInvitedDetailCard: React.FC<Props> = props => {
  const { signer } = props
  const { Title, Text } = Typography

  const [lastInviteSentAt, setLastInviteSentAt] = useState<string | undefined>(
    undefined
  )

  const [loading, setLoading] = useState(false)

  const resendInviteHandler = async (
    ev: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLoading(true)
    try {
      const response = await invitesService.resendInvite(signer.id)
      log.info(response, 'resendInvite')
      const date = new Date()
      const timeNow = date.getTime()
      setLastInviteSentAt(FormatHelper.dateTimeFormatExtended(timeNow, '-'))
    } catch (error) {
      log.error(error, 'resendInvite')
    }
    setLoading(false)
  }

  return (
    <Card
      data-testid="signer-invited-detail-card"
      bordered={false}
      className="ni-signer-invited-detail-card"
    >
      <Row gutter={0}>
        <Col xs={24} sm={12} md={12} lg={6} xl={4} className="signer-left">
          <SignerStatus
            fullName={FormatHelper.signerFullName(signer)}
            size={171}
            role={signer.role}
            photoSource={signer.selfie?.default}
            step={signer.step}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={18} xl={20} className="signer-center">
          <Row gutter={0} justify="space-between">
            <Title level={3}>{signer.email}</Title>
            <div className="account-request-status">
              <p className={signer.status?.toLowerCase()}>
                {signer.status?.toLowerCase()}
              </p>
            </div>
          </Row>
          <Row gutter={0} justify="space-between" align="middle">
            <Text className="info-value">
              Latest Invitation sent at{' '}
              {lastInviteSentAt ||
                FormatHelper.dateTimeFormatExtended(signer.invitedAt, '-')}
            </Text>
            <Button
              shape="round"
              type="primary"
              onClick={resendInviteHandler}
              data-testid="SignerInvited-resendInvite"
              disabled={loading}
              loading={loading}
            >
              {loading ? 'Sending...' : 'Resend Invitation'}
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
