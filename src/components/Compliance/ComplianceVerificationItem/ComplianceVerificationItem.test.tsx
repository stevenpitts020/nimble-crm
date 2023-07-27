import React from 'react'
import { render } from '@testing-library/react'
import { ComplianceVerificationItem } from './ComplianceVerificationItem'
import { complianceVerificationItemMock } from '../../../services/__mocks__/SignerComplianceVerification'
import FormatHelper from '../../../utils/FormatHelper'

const renderApp = (props: any) => {
  return render(<ComplianceVerificationItem {...props} />)
}

describe('<ComplianceVerificationItem />', () => {
  test('should render item information', () => {
    const props = {
      item: complianceVerificationItemMock,
    }
    const relevance = props.item.matchTypes
      .map(type => FormatHelper.snakeToPascalCase(type))
      .join(', ')

    const countries = (props.item.countries
      ? props.item.countries.length
      : 0
    ).toString()

    const { getByText } = renderApp(props)

    expect(getByText(relevance)).toBeInTheDocument()
    expect(getByText(countries)).toBeInTheDocument()
    expect(getByText(props.item.fullName)).toBeInTheDocument()
  })

  test('should render header', () => {
    const props = {
      item: complianceVerificationItemMock,
    }
    const name = props.item.fullName

    const { getByText, queryByText } = renderApp(props)

    expect(getByText(name)).toBeInTheDocument()
    expect(getByText('Adverse Media')).toBeInTheDocument()
    expect(getByText('Warning')).toBeInTheDocument()
    expect(getByText('Sanctions')).toBeInTheDocument()
    // we dont have this in the mock :)
    expect(queryByText('Political Exposure')).not.toBeInTheDocument()
  })
})
