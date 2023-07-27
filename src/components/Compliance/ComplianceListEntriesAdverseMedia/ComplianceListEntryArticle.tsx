import React from 'react'
import { Typography } from 'antd'
import { Divider, ClockIcon } from '../..'

const { Title } = Typography

export const ComplianceListEntryArticle = (props: {
  title: string
  date?: string
  children: React.ReactNode
}) => (
  <div>
    <Divider className="ni-color-silver" direction="horizontal" spacing="md" />
    <div className="d-flex flex-column">
      <Title level={5} className="ni-color-darkblue">
        {props.title}
      </Title>

      <div className="d-flex flex-wrap u-margin-bottom-xs">
        <ClockIcon />
        <span className="ni-color-gray ant-typography smallest bold u-margin-left-xs">
          {props.date}
        </span>
      </div>

      {props.children}
    </div>
  </div>
)
