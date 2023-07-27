import React from 'react'
import { Avatar } from 'antd'
interface DescriptionProps {
  fullName: string
  altText?: string
  title?: string
  photoSource?: string
  shape?: 'square' | 'circle'
  avatar?: React.ReactNode
}

export const ModalHeader: React.FC<DescriptionProps> = (
  props: DescriptionProps
) => {
  return (
    <div className="ni-signer-modal-header">
      <div className="avatar-col">
        {props.avatar ? (
          props.avatar
        ) : (
          <Avatar
            alt={props.altText || props.fullName}
            size={80}
            src={props.photoSource}
            data-testid="avatar"
            shape={props.shape}
          >
            {props.fullName[0]}
          </Avatar>
        )}
      </div>

      <div className="info-col">
        <p className="t1" data-testid="header-title">
          {props.title}
        </p>
        <p className="t2" data-testid="header-fullname">
          {props.fullName}
        </p>
      </div>
    </div>
  )
}
