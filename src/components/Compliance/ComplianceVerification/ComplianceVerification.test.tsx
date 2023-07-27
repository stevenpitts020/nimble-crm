import React from 'react'
import { render } from '@testing-library/react'
import { ComplianceVerification } from './ComplianceVerification'
import { successResponse } from '../../../services/__mocks__/SignerComplianceVerification'

const renderApp = (props: any) => {
  return render(<ComplianceVerification {...props} />)
}

describe('<ComplianceVerification />', () => {
  const complianceVerificationMock = successResponse[0]

  test('should render basic information', () => {
    const props = {
      complianceVerification: complianceVerificationMock,
      fullName: 'John',
      dateOfBirth: undefined,
    }
    const total = props.complianceVerification.results.length
    const text = /Found 2 possible results for the name John born in/
    const { getByText } = renderApp(props)

    expect(getByText(total.toString())).toBeInTheDocument()
    expect(getByText(text)).toBeInTheDocument()

    expect(
      getByText(props.complianceVerification.results[0].fullName)
    ).toBeInTheDocument()
    expect(
      getByText(props.complianceVerification.results[1].fullName)
    ).toBeInTheDocument()
  })

  test('should render no results text', () => {
    const props = {
      complianceVerification: undefined,
      fullName: 'John',
      dateOfBirth: undefined,
    }
    const text = 'No results found on any Sanction or Watchlist'
    const { getByText } = renderApp(props)

    expect(getByText(text)).toBeInTheDocument()
  })
})
