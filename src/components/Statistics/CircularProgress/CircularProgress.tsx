import React, { useState, useEffect } from 'react'
import { Progress, Typography } from 'antd'

interface ICircularProgressProps {
  data?: string
  width: number
  percent: number
  successPercent?: number
  size?: 'default' | 'small'
  legend?: string
}

const { Title, Text } = Typography

// TODO create a proper component
const CircularProgressSubtitle = (
  percent?: number,
  successPercent?: number
) => (
  <div className="ni-circular-progress--subtitle">
    <Title level={4}>
      {percent}
      <Text>%</Text>
    </Title>
    <Text type="secondary" className="ni-circular-progress--legend">
      Downloaded
    </Text>
  </div>
)

// TODO pass proper data
export const CircularProgress: React.FC<ICircularProgressProps> = (
  props: ICircularProgressProps
) => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    setPercentage(1)

    setTimeout(() => {
      setPercentage(props.percent)
    }, 200)
  }, [props.percent])

  return (
    <div className="ni-circular-progress--wrapper">
      <Progress
        type="circle"
        strokeColor={{
          '0%': '#56CCF2',
          '100%': '#1D7FB7',
        }}
        strokeWidth={3}
        percent={percentage}
        format={CircularProgressSubtitle}
        successPercent={props.successPercent}
        width={props.width}
        className={`ni-circular-progress ni-circular-progress--contains-legend--${props.legend !==
          undefined} ni-circular-progress--size-${props.size}`}
      />
    </div>
  )
}
