import React from 'react'
import { Radio } from 'antd'

interface IPoliticallyExposed {
  checkPoliticalExposure: boolean | null
}
export const PoliticallyExposed: React.FC<IPoliticallyExposed> = ({
  checkPoliticalExposure,
}) => {
  const optionsWithDisabled = [
    { label: 'Yes', value: 'Yes', disabled: true },
    { label: 'No', value: 'No', disabled: true },
  ]
  return (
    <div className="political-radio-buttons">
      <Radio.Group
        options={optionsWithDisabled}
        disabled={true}
        value={checkPoliticalExposure ? 'Yes' : 'No'}
      />
    </div>
  )
}
