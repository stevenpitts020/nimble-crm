import { Row } from 'antd'
import React from 'react'
import { EmailIcon, PhoneIcon, SmartPhoneIcon } from '../Common/Icon/Icon'

// TODO define what is received
interface ITableClientActions {
  customer?: string
}

export const TableClientActions: React.FC<ITableClientActions> = (
  props: ITableClientActions
) => {
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{ width: '100px' }}
      className="ni-client-actions"
    >
      <PhoneIcon style={{ fontSize: '20px' }} />
      <EmailIcon style={{ fontSize: '20px' }} />
      <SmartPhoneIcon style={{ fontSize: '20px' }} />
    </Row>
  )
}
