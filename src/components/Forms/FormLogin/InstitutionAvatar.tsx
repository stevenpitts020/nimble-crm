import React from 'react'
import { Avatar } from 'antd'
import { PlaceHolderInstitutionIcon } from '../../Common/Icon/Icon'

interface InstitutionAvatarSchema {
  alt?: string
  src?: string
}

export const InstitutionAvatar: React.FC<InstitutionAvatarSchema> = (
  props: InstitutionAvatarSchema
) => {
  return (
    <Avatar
      className="ni-institution-avatar"
      size={104}
      alt={props.alt || 'Placeholder'}
      src={props.src}
      icon={<PlaceHolderInstitutionIcon />}
    />
  )
}
