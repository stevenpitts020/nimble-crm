import React from 'react'
import { Tag } from 'antd'

interface ISignerRole {
  role: string
}

export const SignerRole: React.FC<ISignerRole> = (props: ISignerRole) => {
  const colorClassName =
    props.role === 'PRIMARY'
      ? 'ni-signer-role ni-tag-primary'
      : 'ni-signer-role ni-tag-secondary'

  return (
    <>
      <Tag className={colorClassName}>{props.role}</Tag>
    </>
  )
}
