import React from 'react'
import { SectionHeader, AccountRequestTable } from '../../components'
import { AccountRequestFilters } from '../../components'
import { AccountRequestActions } from '../../components/AccountRequest/AccountRequestActions/AccountRequestActions'

const AccountRequestList: React.FC = (props: any) => {
  const [watchDataChanged, setWatchDataChanged] = React.useState<boolean>(false)
  const notifyDataChanged = () => setWatchDataChanged(!watchDataChanged)

  return (
    <div data-testid="account-list">
      <SectionHeader
        title="Requests"
        subtitle="Account"
        afterTitle={
          <AccountRequestActions
            notifyDataChanged={notifyDataChanged}
            watchDataChanged={watchDataChanged}
          />
        }
        rightComponent={<AccountRequestFilters />}
      />
      <AccountRequestTable />
    </div>
  )
}

export default AccountRequestList
