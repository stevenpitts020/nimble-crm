import React from 'react'
import { Typography, Row, Col, Tag, Drawer } from 'antd'
import { ArrowRightIcon, Divider, Stack } from '../..'
import { ComplianceVerificationItemDetail } from '../ComplianceVerificationItemDetail/ComplianceVerificationItemDetail'
import {
  ISignerComplianceVerificationItem,
  ISignerComplianceVerificationListEntry,
} from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'
import ComplianceHelper from '../../../utils/ComplianceHelper'

const { Text, Title } = Typography

// Here's a bunch of auxiliary components
// So far only used here so I think for now I'll keep em here

const ListDescriptionItem = (itemProps: {
  title: string
  text?: string | null
}) => (
  <li className="flex-spaced-horizontal">
    <Text className="item-title uppercase">{itemProps.title}</Text>
    <Text className="bold ni-color-black">{itemProps.text}</Text>
  </li>
)

interface IComplianceResultHeader {
  item: ISignerComplianceVerificationItem
}

const ResultHeader: React.FC<IComplianceResultHeader> = (
  props: IComplianceResultHeader
) => {
  const [isVisible, setIsVisible] = React.useState(false)

  const handleOpenWindow = () => {
    setIsVisible(true)
  }

  const handleCloseWindow = (): void => {
    setIsVisible(false)
  }

  const containsTag = (
    list: ISignerComplianceVerificationListEntry[],
    label: string
  ) => {
    if (list?.length > 0) {
      return <Tag className="ant-tag-compliance">{label}</Tag>
    }
  }

  const containsSubtype = (list: [any]) => {
    if (list?.length > 0) {
      if (list[0].subtype != null) {
        return (
          <Tag className="ant-tag-compliance">
            {ComplianceHelper.parseSubtype(list[0].subtype)}{' '}
          </Tag>
        )
      }
    }
  }
  return (
    <React.Fragment>
      <Row
        justify="space-between"
        align="top"
        className="header cursor-pointer"
        onClick={handleOpenWindow}
      >
        <Col style={{ width: '200px' }}>
          <Title className="no-margin truncate" level={4}>
            {props.item.fullName}
          </Title>
          <Stack
            direction="horizontal"
            className="u-margin-top-md tags-container"
          >
            {containsTag(props.item.adverseMedia, 'Adverse Media')}
            {containsTag(props.item.warnings, 'Warning')}
            {containsTag(props.item.sanctions, 'Sanctions')}
            {containsTag(props.item.politicalExposure, 'Political Exposure')}
            {containsSubtype(props.item.politicalExposure)}
          </Stack>
        </Col>
        <Col flex="0 1 30px">
          <ArrowRightIcon
            className="ni-color-accent"
            style={{ fontSize: '22px' }}
          />
        </Col>
      </Row>
      <Drawer
        width={835}
        closable={false}
        visible={isVisible}
        onClose={handleCloseWindow}
        className="ni-signer-details-drawer"
      >
        <ComplianceVerificationItemDetail
          item={props.item}
          onClose={handleCloseWindow}
        />
      </Drawer>
    </React.Fragment>
  )
}

export const ComplianceVerificationItem = (props: {
  item: ISignerComplianceVerificationItem
}) => {
  const relevance = props.item.matchTypes
    .map(type => FormatHelper.snakeToPascalCase(type))
    .join(', ')
  const countries = (props.item.countries
    ? props.item.countries.length
    : 0
  ).toString()

  return (
    <div className="ni-compliance-result">
      <Divider
        className="ni-color-silver"
        direction="horizontal"
        spacing="xl"
        size="2"
      />
      <ResultHeader item={props.item} />

      <ul className="ni-detail-list ni-col-flex u-margin-top-md">
        <ListDescriptionItem title="Relevance" text={relevance} />
        <ListDescriptionItem title="Countries" text={countries} />
        {FormatHelper.dateFormat(props.item.dateOfBirth, '-') !==
          'Invalid date' && (
          <ListDescriptionItem
            title="Date of Birth"
            text={FormatHelper.dateFormat(props.item.dateOfBirth, '-')}
          />
        )}
        {FormatHelper.dateFormat(props.item.dateOfDeath, '-') !==
          'Invalid date' && (
          <ListDescriptionItem
            title="Date of Death"
            text={FormatHelper.dateFormat(props.item.dateOfDeath, '-')}
          />
        )}
      </ul>
    </div>
  )
}
