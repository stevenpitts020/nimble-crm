import React from 'react'
import { render } from '@testing-library/react'
import { AccountAprovalForm } from './AccountAprovalForm'

// we need all of these for the contexts
import { AccountRequestDetailProvider } from '../../../store/AccountRequestDetailProvider'
import { ProfileProvider } from '../../../store/ProfileProvider'
import AuthProvider from '../../../store/AuthProvider'

const renderApp = (props: any) => {
  return render(
    <AuthProvider existingToken="xpto">
      <ProfileProvider>
        <AccountRequestDetailProvider>
          <AccountAprovalForm {...props} />
        </AccountRequestDetailProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

describe('<AccountAprovalForm />', () => {
  test('should render content', () => {
    const props = {}
    const { getByTestId } = renderApp(props)

    const accept = getByTestId('account-request-aproval-form')
    expect(accept).toBeInTheDocument()
  })
})
