import { Typography } from 'antd'
import React from 'react'

interface ISectionTitle {
  children?: string
  subtitle?: string
  break?: false | true
  after?: object
}
const { Title, Text } = Typography

export const SectionTitle: React.FC<ISectionTitle> = (props: ISectionTitle) => {
  return (
    <Title level={3} className="ni-section-header--title">
      <Text className="ni-section-header--subtitle">
        {props.subtitle}&nbsp;
      </Text>
      {props.break ? <br /> : null}
      {props.children}
      &nbsp;
      {props.after}
    </Title>
  )
}
