import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Typography, Row, Col } from 'antd'
import _ from 'lodash'
import { Editor } from '@tinymce/tinymce-react'

import { SectionHeader } from '../../components'
import { InstitutionContext } from '../../store/InstitutionProvider'

interface RouteParams {
  domain: string
}

const { Title } = Typography

export const InstitutionTemplates: React.FC = (props: any) => {
  const { domain } = useParams<RouteParams>()
  const { institutionState, getInstitutionByDomain } = useContext(
    InstitutionContext
  )
  const isLoading = institutionState.status === 'loading'

  useEffect(() => {
    const getInstitutionData = async () => {
      await getInstitutionByDomain(domain, true)
    }

    getInstitutionData()
    // eslint-disable-next-line
  }, [domain])

  const institutionName = _.get(institutionState, 'institution.name')
  const institutionTemplateApprove = _.get(
    institutionState,
    'institution.templateApprove',
    ''
  )
  const institutionTemplateDecline = _.get(
    institutionState,
    'institution.templateDecline',
    ''
  )

  if (isLoading) {
    return null
  }

  return (
    <div data-testid="institution-tempaltes">
      <SectionHeader
        title={`${institutionName} Institution Templates`}
        subtitle=""
        rightComponent={<></>}
      />
      <Row gutter={25} style={{ marginBottom: '5rem' }}>
        <Col span={12}>
          <Title level={2}>Decline Default Template</Title>
          <Title level={4} style={{ marginBottom: '2rem' }}>
            Update the default system decline e-mail template
          </Title>
          <Editor
            apiKey="26m8cpybqra3ykmysf6os45jtq53jucghnmq7ujg4livpqg5"
            initialValue={institutionTemplateDecline}
            init={{
              height: 300,
              menubar: true,
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </Col>
        <Col span={12}>
          <Title level={2}>Approval Default Template</Title>
          <Title level={4} style={{ marginBottom: '2rem' }}>
            Update the default system approval e-mail template
          </Title>
          <Editor
            apiKey="26m8cpybqra3ykmysf6os45jtq53jucghnmq7ujg4livpqg5"
            initialValue={institutionTemplateApprove}
            init={{
              height: 300,
              menubar: false,
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </Col>
      </Row>
    </div>
  )
}
