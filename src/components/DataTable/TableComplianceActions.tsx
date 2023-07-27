import React from 'react'
import { Tooltip, Row } from 'antd'
import { CheckCircleIcon } from '../Common/Icon/Icon'

// TODO define what is received
interface ITableComplianceActions {
  customer?: string
}

export const TableComplianceActions: React.FC<ITableComplianceActions> = () => {
  return (
    <Row
      className="ni-table-compliance-actions"
      justify="space-between"
      align="middle"
    >
      <Tooltip title="Facial Match">
        <CheckCircleIcon />
      </Tooltip>
      <Tooltip title="Don't do that, Dave">
        <CheckCircleIcon />
      </Tooltip>
      <Tooltip title="Ark me about Loom">
        <CheckCircleIcon />
      </Tooltip>
      <Tooltip title="OFAC">
        <CheckCircleIcon />
      </Tooltip>
      <Tooltip title="Facial Match">
        <CheckCircleIcon />
      </Tooltip>
      <Tooltip title="This is a placeholder">
        <CheckCircleIcon />
      </Tooltip>
    </Row>
  )
}
