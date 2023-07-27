import { Button, Row, Tooltip, Typography } from 'antd'
import React from 'react'
import { CardLineChart, ICardLineChartData } from '../..'
import { HelpIcon } from '../../Common/Icon/Icon'

const { Text, Title } = Typography

interface IStatCardProps {
  label: string
  value: string
  subtitle?: string
  color?: string
}

export const StatCard: React.FC<IStatCardProps> = (props: IStatCardProps) => {
  const statColor = (color?: string) => {
    switch (color) {
      case 'green':
        return 'ni-bg-gradient-green'
      case 'orange':
        return 'ni-bg-gradient-orange'
      case 'blue':
        return 'ni-bg-gradient-blue'
      default:
        return 'ni-bg-gradient-gray'
    }
  }

  const months = 'Jan Fev Mar Abr May Jun Jul Aug Set'.split(' ')
  const data = months.map(month => {
    return {
      key: month,
      label: month + ' 2019',
      value: (25 + Math.random() * 30).toFixed(2),
    }
  }) as ICardLineChartData[]

  return (
    <div className={`ni-stat-card ${statColor(props.color)}`}>
      <Row align="middle" justify="space-between">
        <Text className="ni-stat-card--label">{props.label}</Text>
        <Tooltip placement="right" title="This is additional information.">
          <Button
            type="link"
            shape="circle"
            size="small"
            className="ni-stat-card--info"
          >
            <HelpIcon />
          </Button>
        </Tooltip>
      </Row>
      <Row
        align="bottom"
        justify="space-between"
        className="ni-stat-card--bottom-row"
      >
        <Title level={1} className="ni-stat-card--value">
          {props.value}
        </Title>
        <Text className="ni-stat-card--subtitle">{props.subtitle}</Text>
      </Row>
      <div className="ni-stat-card--wrapper">
        <CardLineChart data={data} />
      </div>
    </div>
  )
}

StatCard.defaultProps = {
  color: 'gray',
}
