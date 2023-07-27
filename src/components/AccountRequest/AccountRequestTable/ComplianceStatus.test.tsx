import React from 'react'
import { render } from '@testing-library/react'
import { ComplianceStatus } from './ComplianceStatus'
import * as mocks from '../../../services/__mocks__/AccountRequest'

const renderApp = (props: any) => {
  return render(<ComplianceStatus {...props} />)
}

describe('<ComplianceStatus />', () => {
  describe('with default props', () => {
    test('should render ok', () => {
      const props = {}
      const { getByTestId } = renderApp(props)
      const container = getByTestId('compliance-status')
      expect(container).toBeInTheDocument()
    })
  })

  describe('with accountRequest', () => {
    const accountRequestMock = mocks.successResponseApproved

    test('should render ok', () => {
      const props = {
        accountRequest: accountRequestMock,
      }
      const { getByTestId, getByText } = renderApp(props)
      const container = getByTestId('compliance-status')
      expect(container).toBeInTheDocument()

      const docDoc = getByText(/Document Match - Not valid/)
      expect(docDoc).toBeInTheDocument()

      const addressDoc = getByText(/Address Check - Not valid/)
      expect(addressDoc).toBeInTheDocument()

      const sanctionDoc = getByText(/Sanctions - No matches found/)
      expect(sanctionDoc).toBeInTheDocument()

      const verifyDoc = getByText(
        /Politically Exposed - Possible matches found/
      )
      expect(verifyDoc).toBeInTheDocument()

      const verifyFace = getByText(/Face Match - Successful Verification/)
      expect(verifyFace).toBeInTheDocument()

      const mediaDoc = getByText(/Adverse Media - No matches found/)
      expect(mediaDoc).toBeInTheDocument()
    })
  })
})
