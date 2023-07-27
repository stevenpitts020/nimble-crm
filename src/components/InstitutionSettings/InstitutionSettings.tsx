import React, { useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { Card, Typography, Row, Col, Button } from 'antd'
import _ from 'lodash'

import { SectionHeader, InstitutionLogo } from '../../components'
import { InstitutionContext } from '../../store/InstitutionProvider'
import Disclosures from './Disclosures/Disclosures'

import { Sheets } from './Sheets'
import BSA from './BSA/BSA'
import ComplianceQuestions from './ComplianceQuestions/ComplianceQuestions'
import { AuthContextStore } from '../../store/AuthProvider'
import { ProfileContext } from '../../store/ProfileProvider'

interface RouteParams {
  domain: string
}

const { Title } = Typography

export const InstitutionSettings: React.FC = (props: any) => {
  const { domain } = useParams<RouteParams>()

  const { institutionState, getInstitutionByDomain } = useContext(
    InstitutionContext
  )

  const { isSuperAdmin } = useContext(AuthContextStore)
  const { profileState } = useContext(ProfileContext)

  const history = useHistory()

  const isLoading = institutionState.status === 'loading'

  useEffect(() => {
    const getInstitutionData = async () => {
      await getInstitutionByDomain(domain, true)
    }

    getInstitutionData()
    // eslint-disable-next-line
  }, [domain])

  const id = _.get(institutionState, 'institution.id')
  const institutionName = _.get(institutionState, 'institution.name')
  const institutionDomain = _.get(institutionState, 'institution.domain')
  const institutionIcon = _.get(institutionState, 'institution.logoUri.default')
  const institutionBackgroundImage = _.get(
    institutionState,
    'institution.backgroundImageUri.default'
  )

  const disclosures = _.get(institutionState, 'institution.disclosures')

  const bsa = _.get(institutionState, 'institution.publicMetadata.bsa', {})

  const questions = institutionState.institution?.questions

  function onProductsClick() {
    history.push(`/products/${institutionDomain}`)
  }

  if (isLoading) {
    return null
  }

  return (
    <div data-testid="institution-settings">
      <SectionHeader
        title={`${institutionName} Institution Settings`}
        subtitle=""
        rightComponent={<></>}
      />
      <Row gutter={25} style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Card bordered={false} style={{ height: '20rem' }}>
            <Title level={2}>Appearance</Title>
            <Title level={4}>Edit your institutions branding</Title>
            <Row style={{ marginTop: '40px' }}>
              <Col span={6}>
                <Title level={5}>Icon Logo</Title>
                <InstitutionLogo
                  src={institutionIcon}
                  alt={institutionName}
                  width={'100'}
                />
              </Col>
              <Col span={6}>
                <Title level={5}>Background Image</Title>
                <InstitutionLogo
                  src={institutionBackgroundImage}
                  alt={institutionName}
                  width={'100'}
                />
              </Col>
              <Col span={12}>
                <Title level={5}>Header Logo</Title>
                <InstitutionLogo
                  src={institutionIcon}
                  alt={institutionName}
                  width={'100'}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={10}>
          <Card bordered={false} style={{ height: '20rem' }}>
            <Title level={2}>Basic Details</Title>
            <Title level={5}>Institution Name</Title>
            {institutionName}
            <Title level={5}>Institution Domain</Title>
            {institutionDomain}
            <Title level={5}>Institution Domain API</Title>
            {institutionDomain}
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false} style={{ height: '20rem' }}>
            <Title level={2}>Menu</Title>
            <Button
              type="link"
              size="large"
              block={true}
              onClick={onProductsClick}
            >
              Products
            </Button>
          </Card>
        </Col>
      </Row>

      <Row hidden={true} gutter={25} style={{ marginBottom: '2rem' }}>
        <Card style={{ width: '100%', margin: '10px' }}>
          <Sheets state={institutionState} />
        </Card>
      </Row>

      <Row hidden={true} gutter={25} style={{ marginBottom: '5rem' }}>
        <Col span={24}>
          <ComplianceQuestions institutionId={id} questions={questions} />
        </Col>
      </Row>

      <Row gutter={25} style={{ marginBottom: '5rem' }}>
        <Col span={24}>
          <Disclosures
            id={id}
            institutionDisclosures={
              !disclosures || _.isEmpty(disclosures)
                ? { count: 0, data: [] }
                : disclosures
            }
          />
        </Col>
      </Row>

      <Row
        hidden={!isSuperAdmin(profileState?.profile)}
        gutter={25}
        style={{ marginBottom: '5rem' }}
      >
        <Col span={24}>
          <BSA id={id} bsa={bsa} />
        </Col>
      </Row>
    </div>
  )
}
