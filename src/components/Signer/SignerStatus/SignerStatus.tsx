import React from 'react'
import { Avatar } from 'antd'
import { SignerRole, Stack, DefaultAvatarIcon } from '../../../components'
import { ISignerCreditVerification } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'

interface ISignerStatus {
  fullName: string
  role: string
  photoSource?: string
  step: string
  size: number
  scoreData?: ISignerCreditVerification
}

export const SignerStatus: React.FC<ISignerStatus> = (props: ISignerStatus) => {
  const scoreRangeName =
    !FormatHelper.isEmpty(props.scoreData) &&
    FormatHelper.getScoreRangeName(props.scoreData!.score)

  return (
    <Stack
      className="ni-signer-status"
      direction="vertical"
      verticalAlign="center"
      spacing="sm"
    >
      <div className={`ni-signer-score-circle ${scoreRangeName}`}>
        {props.photoSource ? (
          <Avatar
            size={props.size}
            src={props.photoSource}
            data-testid="avatar"
            className="ni-signer-status-avatar"
            alt={props.fullName}
          >
            {props.fullName[0]}
          </Avatar>
        ) : (
          <DefaultAvatarIcon />
        )}
      </div>

      <SignerRole role={props.role} />
    </Stack>
  )
}
