import React, { useContext } from 'react'
import { Spin, Skeleton } from 'antd'
import { useParams } from 'react-router'
import { NotFound, Stack, Box } from '../../components'
import { UserDetailContext } from '../../store/UserDetailProvider'
import { AlertContext } from '../../store/AlertProvider'

interface RouteParams {
  id: string
}

const UserDetail: React.FC = (props: any) => {
  const { id } = useParams<RouteParams>()

  const { state, getUser, updateUser } = useContext(UserDetailContext)

  const { showAlert, clearAlert } = useContext(AlertContext)

  const user = state?.user

  const isLoading = state.status === 'loading'

  // load
  React.useEffect(() => {
    if (id) getUser(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  React.useEffect(() => {
    const displayAlertMessage = () => {
      showAlert({ message: 'test', type: 'error' })
    }

    if (user) displayAlertMessage()

    return () => clearAlert()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleSave = () => {
    if (user) updateUser({ id: user.id }) // FIXME: populate with user info
  }

  if (user === undefined) {
    if (!isLoading) return <NotFound title="Cannot find requested user." />
    return <Skeleton />
  }

  return (
    <div data-testid="user-detail">
      <Spin spinning={isLoading} tip="Loading...">
        <Stack direction="vertical" spacing="lg">
          <Box row="flex-center" justify="center">
            {JSON.stringify(user)}
          </Box>
        </Stack>
      </Spin>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default UserDetail
