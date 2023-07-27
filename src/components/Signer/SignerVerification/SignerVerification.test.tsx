import React from 'react'
import { render } from '@testing-library/react'
import {
  SignerVerification,
  validCheck,
  docValid,
  complyAdvantageCheck,
} from './SignerVerification'
import { successResponse } from '../../../services/__mocks__/AccountRequest'

const renderApp = (props: any) => {
  return render(<SignerVerification {...props} />)
}

describe.skip('<SignerVerification />', () => {
  test('should render content', () => {
    const props = {
      identityVerification:
        successResponse.signers[0].identityVerificationResult,
      shuftiValidationDate: successResponse.createdAt,
      complyAdvantageChecks: {
        checkSanction: successResponse.signers[0].checkSanction,
        sanctionVerifiedAt: successResponse.signers[0].sanctionVerifiedAt,
        checkPoliticalExposure:
          successResponse.signers[0].checkPoliticalExposure,
        politicalExposureVerifiedAt:
          successResponse.signers[0].politicalExposureVerifiedAt,
        checkAdverseMedia: successResponse.signers[0].checkAdverseMedia,
        adverseMediaVerifiedAt:
          successResponse.signers[0].adverseMediaVerifiedAt,
        checkAntiMoneyLaundering:
          successResponse.signers[0].checkAntiMoneyLaundering,
        antiMoneyLaunderingVerifiedAt:
          successResponse.signers[0].antiMoneyLaunderingVerifiedAt,
      },
      agreement: {
        signerStatus: 'PENDING',
        accountRequestStatus: 'PENDING',
      },
    }
    const { getByTestId } = renderApp(props)

    const role = getByTestId('ni-signer-verification')
    expect(role).toBeInTheDocument()
  })

  describe('validCheck', () => {
    // rendering variations on env require --updateSnapshot to be run on test runner instance
    test.skip('return ok and a date', () => {
      const result = validCheck(1, '12-03-2097')
      expect(result).toMatchSnapshot()
    })

    // rendering variations on env require --updateSnapshot to be run on test runner instance
    test.skip('return not ok and a date', () => {
      const result = validCheck(0, '12-03-2097')
      expect(result).toMatchSnapshot()
    })

    // rendering variations on env require --updateSnapshot to be run on test runner instance
    test.skip('return not ok with undefined and a date', () => {
      const result = validCheck(undefined, '12-03-2097')
      expect(result).toMatchSnapshot()
    })
  })

  describe('docValid', () => {
    test('return ok if successful', () => {
      const result = docValid({
        issue_date: 0,
        document_visibility: 0,
        document_must_not_be_expired: 1,
        document: 1,
        document_country: 0,
        selected_type: 0,
        document_proof: 1,
        name: 0,
        face_on_document_matched: 0,
      })
      expect(result).toEqual(1)
    })

    test('return 1 if undefined', () => {
      const result = docValid(undefined)
      expect(result).toEqual(0)
    })

    test('return 0 if failed', () => {
      const result = docValid({
        issue_date: 0,
        document_visibility: 0,
        document_must_not_be_expired: 1,
        document: 0,
        document_country: 0,
        selected_type: 0,
        document_proof: 0,
        name: 0,
        face_on_document_matched: 0,
      })
      expect(result).toEqual(0)
    })
  })

  describe('compyAdvantage check', () => {
    test('return ok and a date', () => {
      const result = complyAdvantageCheck(true, new Date())
      const { getByTestId } = render(result)
      const redIcon = getByTestId('failed')
      expect(redIcon).toBeInTheDocument()
    })

    test('return not ok and a date', () => {
      const result = complyAdvantageCheck(false, new Date())
      const { getByTestId } = render(result)
      const greenIcon = getByTestId('passed')
      expect(greenIcon).toBeInTheDocument()
    })

    test('return not ok with null and a date', () => {
      const result = complyAdvantageCheck(null, new Date())
      const { getByTestId } = render(result)
      const redIcon = getByTestId('failed')
      expect(redIcon).toBeInTheDocument()
    })
  })

  describe('contract signature check', () => {
    const props = {
      identityVerification:
        successResponse.signers[0].identityVerificationResult,
      shuftiValidationDate: successResponse.createdAt,
      complyAdvantageChecks: {
        checkSanction: successResponse.signers[0].checkSanction,
        sanctionVerifiedAt: successResponse.signers[0].sanctionVerifiedAt,
        checkPoliticalExposure:
          successResponse.signers[0].checkPoliticalExposure,
        politicalExposureVerifiedAt:
          successResponse.signers[0].politicalExposureVerifiedAt,
        checkAdverseMedia: successResponse.signers[0].checkAdverseMedia,
        adverseMediaVerifiedAt:
          successResponse.signers[0].adverseMediaVerifiedAt,
        checkAntiMoneyLaundering:
          successResponse.signers[0].checkAntiMoneyLaundering,
        antiMoneyLaunderingVerifiedAt:
          successResponse.signers[0].antiMoneyLaunderingVerifiedAt,
      },
      agreement: {
        signerStatus: 'PENDING',
        accountRequestStatus: 'PENDING',
      },
    }
    test('return pending signature', () => {
      const { getByText, getByTestId } = renderApp(props)
      const text = getByText(/Pending Signature/)
      const redIcon = getByTestId('pending-contract')
      expect(text).toBeInTheDocument()
      expect(redIcon).toBeInTheDocument()
    })
    test('return signed waiting for other signers', () => {
      const completedprops = {
        ...props,
        agreement: {
          signerStatus: 'PENDING',
          accountRequestStatus: 'INCOMPLETE',
        },
      }
      const { getByText, getByTestId } = renderApp(completedprops)
      const text = getByText(/Waiting for other signers/)
      const redIcon = getByTestId('pending-contract')
      expect(text).toBeInTheDocument()
      expect(redIcon).toBeInTheDocument()
    })
    test('return signed and green icon', () => {
      const completedprops = {
        ...props,
        agreement: {
          signerStatus: 'SIGNED',
          accountRequestStatus: 'SIGNED',
        },
      }
      const { getByText, getByTestId } = renderApp(completedprops)
      const text = getByText(/Signed/)
      const greenIcon = getByTestId('signed-contract')
      expect(text).toBeInTheDocument()
      expect(greenIcon).toBeInTheDocument()
    })
  })
})
