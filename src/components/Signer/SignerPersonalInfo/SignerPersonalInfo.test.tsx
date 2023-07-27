import React from 'react'
import { render } from '@testing-library/react'
import { SignerPersonalInfo } from './SignerPersonalInfo'
import { successResponseApproved } from '../../../services/__mocks__/AccountRequest'

const renderApp = (props: any) => {
  return render(<SignerPersonalInfo {...props} />)
}

describe('<SignerPersonalInfo />', () => {
  test('should render content', () => {
    const props = {
      signer: successResponseApproved.signers[0],
    }
    const { getByText } = renderApp(props)

    const role = getByText(props.signer.email)
    expect(role).toBeInTheDocument()
  })
})
