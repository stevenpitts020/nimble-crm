import React from 'react'
import { render } from '@testing-library/react'
import { ComplianceListEntries } from './ComplianceListEntries'
import { complianceVerificationItemMock } from '../../../services/__mocks__/SignerComplianceVerification'

const renderApp = (props: any) => {
  return render(<ComplianceListEntries {...props} />)
}

describe('<ComplianceListEntries />', () => {
  test('should render group items by source', () => {
    // we need to group these entries before sending to the component
    const groupedEntries = complianceVerificationItemMock.warnings?.reduce(
      (groups: any, item) => {
        const source = groups[item.source] || []
        source.push(item)
        groups[item.source] = source
        return groups
      },
      {}
    )

    const props = {
      listEntries: groupedEntries,
    }
    const { getByText } = renderApp(props)

    expect(getByText('opep')).toBeInTheDocument()
    expect(getByText('complyadvantage')).toBeInTheDocument()
  })
})
