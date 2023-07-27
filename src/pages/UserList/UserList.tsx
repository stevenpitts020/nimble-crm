import React from 'react'
import { SectionHeader, UserTable, UserListActions } from '../../components'

const UserList: React.FC = (props: any) => {
  const [watchDataChanged, setWatchDataChanged] = React.useState<boolean>(false)

  const notifyDataChanged = () => setWatchDataChanged(!watchDataChanged)

  return (
    <div data-testid="user-list">
      <SectionHeader
        title="Account Management"
        subtitle="User"
        rightComponent={
          <UserListActions
            notifyDataChanged={notifyDataChanged}
            watchDataChanged={watchDataChanged}
          />
        }
      />
      <UserTable
        notifyDataChanged={notifyDataChanged}
        watchDataChanged={watchDataChanged}
      />
    </div>
  )
}

export default UserList
