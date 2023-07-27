import React from 'react'
import { Statistic, Typography } from 'antd'
import { ArrowUpFilledIcon, ArrowDownFilledIcon } from '../../Common/Icon/Icon'

const { Text } = Typography

interface IStatNumberProps {
  label: string
  value: string
  prefix?: string
  direction?: string
  percent: string
}

const GrowthNumber = (props: any) => (
  <span className={`ni-stat-number--growth--${props.direction}`}>
    {props.direction === 'up' ? <ArrowUpFilledIcon /> : <ArrowDownFilledIcon />}
    <Text> {props.percent}</Text>
  </span>
)

export const StatNumber: React.FC<IStatNumberProps> = (
  props: IStatNumberProps
) => {
  return (
    <div className="ni-stat-number">
      <Statistic
        title={props.label}
        value={props.value}
        precision={0}
        prefix={props.prefix}
        suffix={
          <GrowthNumber direction={props.direction} percent={props.percent} />
        }
      />
    </div>
  )
}

StatNumber.defaultProps = {
  direction: 'up',
  prefix: '#',
}
