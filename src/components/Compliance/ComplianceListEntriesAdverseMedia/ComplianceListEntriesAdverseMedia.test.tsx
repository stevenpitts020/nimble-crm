import React from 'react'
import { render } from '@testing-library/react'
import { ComplianceListEntriesAdverseMedia } from './ComplianceListEntriesAdverseMedia'
import { complianceVerificationItemMock } from '../../../services/__mocks__/SignerComplianceVerification'

const renderApp = (props: any) => {
  return render(<ComplianceListEntriesAdverseMedia {...props} />)
}

describe('<ComplianceListEntriesAdverseMedia />', () => {
  test('should render ComplianceListEntryArticle', () => {
    const props = {
      listEntries: complianceVerificationItemMock.warnings,
    }
    const { getByText } = renderApp(props)

    complianceVerificationItemMock.warnings.forEach(item => {
      expect(getByText(item.name)).toBeInTheDocument()
      expect(getByText(item.value)).toBeInTheDocument()
    })
  })

  test('should render no Results', () => {
    const props = {
      listEntries: complianceVerificationItemMock.politicalExposure,
    }
    const { getByText } = renderApp(props)

    expect(getByText('No Results')).toBeInTheDocument()
  })
})
