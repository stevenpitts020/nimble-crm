import React from 'react'
import { ISignerCreditVerification } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'

interface ISignerCreditScore {
  data: ISignerCreditVerification
}

export const SignerCreditScore: React.FC<ISignerCreditScore> = (
  props: ISignerCreditScore
) => {
  const score = props.data
  const rangeName = FormatHelper.getScoreRangeName(score.score)

  return (
    <div
      className={`ant-column ni-signer-credit-score ${rangeName!}`}
      data-testid="CreditScore"
    >
      <span className="title">
        Credit Score {score.score === null && 'not available'}
      </span>
      {score.score !== null && (
        <p className={`info-label credit-score-status`}>
          <strong>{score.score}</strong>
        </p>
      )}
    </div>
  )
}
