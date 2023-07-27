import React from 'react'
import { Typography } from 'antd'
import { Stack } from '../../../components'

interface ISignerTextLabel {
  label: string | null
  text: string
}

export const SignerTextLabel: React.FC<ISignerTextLabel> = (
  props: ISignerTextLabel
) => {
  const { Text } = Typography

  return (
    <Stack
      className="ni-signer-text-label"
      direction="horizontal"
      spacing="xxs"
    >
      <Text className="info-value">{props.text}</Text>
      <Text className="info-label-big">{props.label}</Text>
    </Stack>
  )
}
