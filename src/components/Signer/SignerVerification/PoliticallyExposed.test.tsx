import React from 'react'
import { render } from '@testing-library/react'
import { PoliticallyExposed } from './PoliticallyExposed'

describe('<Politically exposed component />', () => {
  test('should render NO in radio', () => {
    const checkPoliticalExposure = false
    const { getByLabelText } = render(
      <PoliticallyExposed checkPoliticalExposure={checkPoliticalExposure} />
    )
    const yes = getByLabelText(/Yes/)
    const no = getByLabelText(/No/)

    expect(no.parentElement).toHaveClass('ant-radio-checked')
    expect(yes.parentElement).not.toHaveClass('ant-radio-checked')
  })
})
