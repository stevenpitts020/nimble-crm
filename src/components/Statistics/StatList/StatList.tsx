import { List, Progress, Row, Typography } from 'antd'
import React from 'react'

interface IStatListProps {
  data?: string
}

const { Text } = Typography

// Dummy data for now
const data = [
  {
    percent: 10,
    title: 'Drop out',
    value: 20,
  },
  {
    percent: 40,
    title: 'In Progress',
    value: 30,
  },
  {
    percent: 100,
    title: 'Pending',
    value: 100,
  },
  {
    percent: 30,
    title: 'Denied',
    value: 30,
  },
  {
    percent: 51,
    title: 'Converted',
    value: 20,
  },
]
// TODO create a proper component
const StatListItem = (item: any) => (
  <div className="ni-stat-list--item">
    <Row justify="space-between" align="top">
      <Text type="secondary" className="ni-stat-list--item--title">
        {item.title}
      </Text>
      <Text strong={true} className="ni-stat-list--item--value">
        {item.value}
      </Text>
    </Row>
    <Row>
      <Progress
        strokeColor={{
          '0%': '#4BBFEC',
          '100%': '#4BBFEC',
        }}
        percent={item.percent}
        showInfo={false}
        strokeWidth={4}
      />
    </Row>
  </div>
)

// TODO pass proper data
export const StatList: React.FC<IStatListProps> = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={StatListItem}
      className="ni-stat-list"
    />
  )
}
