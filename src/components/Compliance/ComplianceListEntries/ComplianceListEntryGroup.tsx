import React from 'react'
import { Typography, Collapse, Space, Tag } from 'antd'
import { Divider } from '../..'
import { ClockIcon, ExternalLinkIcon } from '../../Common/Icon/Icon'
import { ISignerComplianceVerificationListEntry } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'
import ComplianceHelper from '../../../utils/ComplianceHelper'

// Here's a bunch of auxiliary components
// So far only used here so I think for now I'll keep em here

const resultHeader = (props: {
  title: string
  date: string
  deletedDate: string
  subtype: string
}) => {
  const { Title } = Typography

  const displayDate = (someDate: string) => {
    return FormatHelper.dateFormatExtended(someDate)
  }
  const subtypeSplit = (subtypes: string) => {
    if (subtypes != null) {
      const subtypesList = subtypes.split(',').map(subtype => {
        return (
          <Tag key={subtype} className="ant-tag-compliance">
            {ComplianceHelper.parseSubtype(subtype.replace(' ', ''))}
          </Tag>
        )
      })
      return subtypesList
    }
  }

  return (
    <div className="d-flex flex-column ni-title">
      <Title level={5} className="ni-color-darkblue">
        {props.title}
      </Title>
      <div>{subtypeSplit(props.subtype)}</div>
      <Space size="middle" direction="horizontal">
        {!FormatHelper.isEmpty(props.date) && (
          <div>
            <ClockIcon style={{ fontSize: '13px' }} />
            <span className="ni-color-gray ant-typography smallest bold u-margin-left-xs">
              Listed {displayDate(props.date)}
            </span>
          </div>
        )}
        {!FormatHelper.isEmpty(props.deletedDate) && (
          <div>
            <ClockIcon style={{ fontSize: '13px' }} />
            <span className="ni-color-gray ant-typography smallest bold u-margin-left-xs">
              Removed {displayDate(props.deletedDate)}
            </span>
          </div>
        )}
      </Space>
    </div>
  )
}

const showVisitLink = (listEntry: ISignerComplianceVerificationListEntry) => {
  if (FormatHelper.isEmpty(listEntry.url)) {
    return null
  }
  return (
    <a
      href={listEntry.url}
      className="d-flex flex-1 flex-wrap ni-color-gray ant-typography smallest bold"
      rel="noreferrer noopener nofollow"
      target="_blank"
    >
      <ExternalLinkIcon />
      <span className="u-margin-left-sm">Visit</span>
    </a>
  )
}

export const ComplianceListEntryGroup = (props: {
  title: string
  listEntries: ISignerComplianceVerificationListEntry[]
}) => {
  const { Text } = Typography
  const { Panel } = Collapse
  return (
    <div>
      <Divider
        className="ni-color-silver"
        direction="horizontal"
        spacing="md"
      />
      <Collapse
        className="ni-media-result"
        expandIconPosition="right"
        ghost={false}
        bordered={false}
      >
        <Panel
          header={resultHeader({
            title: props.title,
            date: props.listEntries[0].date,
            deletedDate: props.listEntries[0].deletedDate,
            subtype: props.listEntries[0].subtype,
          })}
          extra={showVisitLink(props.listEntries[0])}
          key="1"
        >
          <ul className="ni-detail-list ni-col-flex u-margin-top-md slim">
            {props.listEntries?.map(
              (item: ISignerComplianceVerificationListEntry) => {
                return (
                  <li
                    key={item.id}
                    className="flex-spaced-horizontal no-border"
                  >
                    <Text className="item-title uppercase flex-035 ni-color-silver">
                      {item.name}
                    </Text>
                    <Text className="bold ni-color-black flex-1">
                      {item.value}
                    </Text>
                  </li>
                )
              }
            )}
          </ul>
        </Panel>
      </Collapse>
    </div>
  )
}
