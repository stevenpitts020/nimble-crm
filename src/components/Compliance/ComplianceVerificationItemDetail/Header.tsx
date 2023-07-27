import React from 'react'
import { Typography, Button } from 'antd'
import { Stack, ArrowLeftIcon } from '../..'

const { Text } = Typography

interface IHeader {
  title: string
  onClose: () => void
}

export const Header: React.FC<IHeader> = (props: IHeader) => {
  return (
    <Stack
      direction="horizontal"
      spacing="lg"
      verticalAlign="center"
      collapse="sm"
      className="ni-compliance-header"
    >
      <Button
        shape="circle"
        type="dashed"
        onClick={props.onClose}
        data-testid="goback-button"
        className="ni-compliance-back"
      >
        <ArrowLeftIcon className="ni-color-white" />
      </Button>
      <Text className="ni-color-silver stronger">{props.title}</Text>
    </Stack>
  )
}
