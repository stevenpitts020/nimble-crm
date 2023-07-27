import React from 'react'
import { render } from '@testing-library/react'
import { AccountDeclineForm } from './AccountDeclineForm'

// we need all of these for the contexts
import { AccountRequestDetailProvider } from '../../../store/AccountRequestDetailProvider'
import { ProfileProvider } from '../../../store/ProfileProvider'
import AuthProvider from '../../../store/AuthProvider'

const renderApp = (props: any) => {
  return render(
    <AuthProvider existingToken="xpto">
      <ProfileProvider>
        <AccountRequestDetailProvider>
          <AccountDeclineForm {...props} />
        </AccountRequestDetailProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}
describe('<AccountDeclineForm />', () => {
  test('should render content', () => {
    const props = {}
    const { getByTestId } = renderApp(props)

    const accept = getByTestId('account-request-Decline-form')
    expect(accept).toBeInTheDocument()
  })
})
