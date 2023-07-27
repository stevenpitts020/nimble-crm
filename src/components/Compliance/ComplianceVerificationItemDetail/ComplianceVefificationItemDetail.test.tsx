import React from 'react'
import { render } from '@testing-library/react'
import { ComplianceVerificationItemDetail } from './ComplianceVerificationItemDetail'
import { complianceVerificationItemMock } from '../../../services/__mocks__/SignerComplianceVerification'
import FormatHelper from '../../../utils/FormatHelper'

const renderApp = (props: any) => {
  return render(<ComplianceVerificationItemDetail {...props} />)
}

describe('<ComplianceVerificationItemDetail />', () => {
  test('should render item information', () => {
    const props = {
      item: complianceVerificationItemMock,
    }

    const nameAlias = props.item.nameAka.join(', ')
    const countries = props.item.countries.join(', ')
    const associates = props.item.associates.join(', ')
    const age = FormatHelper.age(props.item.dateOfBirth)
    const date = FormatHelper.dateFormat(props.item.dateOfBirth, '-')
    const composed = `${date} (Age: ${age})`

    const { getByText } = renderApp(props)

    expect(getByText(nameAlias)).toBeInTheDocument()
    expect(getByText(countries)).toBeInTheDocument()
    expect(getByText(associates)).toBeInTheDocument()

    expect(getByText(composed)).toBeInTheDocument()
  })
})
