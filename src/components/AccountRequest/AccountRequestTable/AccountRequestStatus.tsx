import React from 'react'
import { IAccountRequest } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'

interface IAccountRequestStatus {
  accountRequest: IAccountRequest
  isStatusClickable?: (accountRequest: IAccountRequest) => boolean
  onStatusClick?: (accountRequest: IAccountRequest) => void
}

export const AccountRequestStatus: React.FC<IAccountRequestStatus> = (
  props: IAccountRequestStatus
) => {
  const acctReq = props.accountRequest
  const status = acctReq.status
  const mappedStatus = FormatHelper.getAccountRequestStatus(status)
  const clickable = props.isStatusClickable
    ? props.isStatusClickable(acctReq)
    : false

  const onClick = () => {
    if (clickable && props.onStatusClick) props.onStatusClick(acctReq)
  }

  const style = {} as any
  if (clickable) style.cursor = 'pointer'

  return (
    <div className="account-request-status">
      {status === 'INCOMPLETE' && (
        <button onClick={onClick} className="incomplete" style={style}>
          {mappedStatus}
        </button>
      )}
      {status === 'PENDING' && (
        <button onClick={onClick} className="pending" style={style}>
          {mappedStatus}
        </button>
      )}
      {status === 'SIGNED' && (
        <button onClick={onClick} className="signed" style={style}>
          {mappedStatus}
        </button>
      )}
      {status === 'APPROVED' && (
        <button onClick={onClick} className="approved" style={style}>
          {mappedStatus}
        </button>
      )}
      {status === 'DECLINED' && (
        <button onClick={onClick} className="declined" style={style}>
          {mappedStatus}
        </button>
      )}
    </div>
  )
}
