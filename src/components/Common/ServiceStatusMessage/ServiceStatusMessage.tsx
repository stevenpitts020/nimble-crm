import React from 'react'
import { Typography } from 'antd'
import { PendingCircleIcon, Stack } from '../..'
const { Text } = Typography

interface IStatusProps {
  title: string
  message: string
}

export const ServiceStatusMessage: React.FC<IStatusProps> = (
  props: IStatusProps
) => {
  return (
    <Stack direction="vertical" className="u-margin-top-xxxl u-align-center">
      <PendingCircleIcon
        className="ni-color-accent u-margin-top-xxxl u-margin-bottom-md"
        style={{ fontSize: '80px' }}
      />
      <Text className="ni-color-black lh-md" strong={true}>
        {props.title}
      </Text>
      <Text className="ni-color-gray lh-md" strong={true}>
        {props.message}
      </Text>
    </Stack>
  )
}
