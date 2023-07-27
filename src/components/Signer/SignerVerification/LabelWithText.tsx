import React from 'react'
import { Stack } from '../..'
import { Typography } from 'antd'

const { Text } = Typography

interface ILabelWithText {
  label: string
  children?: React.ReactNode
}
/* helper */
export const LabelWithText: React.FC<ILabelWithText> = (
  props: ILabelWithText
) => {
  return (
    <Stack className="ni-signer-text-label" direction="vertical" spacing="none">
      <Text className="info-label" strong={true}>
        {props.label}
      </Text>
      <Text className="info-value">{props.children}</Text>
    </Stack>
  )
}
