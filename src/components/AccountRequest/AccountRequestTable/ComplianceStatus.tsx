import React from 'react'
import { StatusCheck } from './StatusCheck'
import { IAccountRequest } from '../../../store'

// TODO define what is received
interface IComplianceStatus {
  accountRequest: IAccountRequest
}

export const ComplianceStatus: React.FC<IComplianceStatus> = (
  props: IComplianceStatus
) => {
  if (!props.accountRequest) {
    return (
      <div
        className="ni-table-compliance-status"
        data-testid="compliance-status"
      >
        Loading
      </div>
    )
  }

  const statusLabel = (check: string) => {
    switch (check) {
      case 'VALID':
        return 'Successful Verification'
      case 'INVALID':
        return 'Not valid'
      case 'MATCH':
        return 'Possible matches found'
      case 'NOMATCH':
        return 'No matches found'
      default:
        return 'Pending'
    }
  }

  const status = props.accountRequest.verificationStatus

  const faceStatus = `Face Match - ${statusLabel(status.faceStatus)}`
  const documentStatus = `Document Match - ${statusLabel(
    status.documentStatus
  )}`
  const addressStatus = `Address Check - ${statusLabel(status.addressStatus)}`
  const sanctionsStatus = `Sanctions - ${statusLabel(status.sanctionsStatus)}`
  const mediaStatus = `Adverse Media - ${statusLabel(status.mediaStatus)}`
  const politicalExposure = `Politically Exposed - ${statusLabel(
    status.politicalExposure
  )}`

  return (
    <div className="ni-table-compliance-status" data-testid="compliance-status">
      <StatusCheck title={faceStatus} verificationCheck={status.faceStatus} />
      <StatusCheck
        title={documentStatus}
        verificationCheck={status.documentStatus}
      />
      <StatusCheck
        title={addressStatus}
        verificationCheck={status.addressStatus}
      />
      <StatusCheck
        title={sanctionsStatus}
        verificationCheck={status.sanctionsStatus}
      />
      <StatusCheck title={mediaStatus} verificationCheck={status.mediaStatus} />
      <StatusCheck
        title={politicalExposure}
        verificationCheck={status.politicalExposure}
      />
    </div>
  )
}
