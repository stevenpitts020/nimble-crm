import React, { useContext } from 'react'
import { ExperimentOutlined, UserOutlined } from '@ant-design/icons'
import { Spin, Button, Typography, Avatar } from 'antd'
import { useHistory } from 'react-router-dom'
import { Stack } from '../../index'

/* Our Context */
import { AuthContextStore } from '../../../store/AuthProvider'
import { ProfileContext } from '../../../store/ProfileProvider'
import { InstitutionLogo } from '../../InstitutionLogo/InstitutionLogo'

interface IHeader {
  name?: string
}

export const HeaderNavigation: React.FC<IHeader> = (props: IHeader) => {
  const { Title, Text } = Typography
  const {
    handleLogout,
    isAdmin,
    isSuperAdmin,
    isInstitutionAdmin,
  } = useContext(AuthContextStore)
  const { profileState } = useContext(ProfileContext)
  const history = useHistory()

  const handleLogoutClick = async () => {
    handleLogout()
  }

  const handleGoToRoot = async () => {
    history.push('/')
  }

  const handleChangePasswordClick = async () => {
    history.push('/auth/change-password')
  }

  const handleLabs = async () => history.push('/labs')
  const handleUsers = async () => history.push('/users')
  const handleRequests = async () => history.push('/accounts')
  const handleInstitution = async () =>
    history.push(
      `/institutions/${profileState.profile?.institution?.domain}/settings`
    )
  const handleInstitutions = async () => history.push('/institutions')
  const handleBranches = async () => history.push('/branches')

  return (
    <Spin size="default" spinning={profileState.status === 'loading'}>
      <header className="ni-header">
        <div className="section ni-header-institution">
          {profileState.status === 'success' && (
            <Button
              type="link"
              onClick={handleGoToRoot}
              title={profileState.profile?.institution?.name}
              style={{ height: 'auto', padding: 0 }}
            >
              <Stack direction="horizontal" verticalAlign="center" spacing="md">
                {typeof profileState.profile?.institution?.logoUri.default ===
                'string' ? (
                  <InstitutionLogo
                    src={profileState.profile?.institution?.logoUri?.default}
                    alt={profileState.profile?.institution?.name}
                    width={'200'}
                    filter={
                      profileState.profile?.institution?.name === 'Central Bank'
                    }
                  />
                ) : (
                  <Title level={2}>
                    {profileState.profile?.institution?.name}
                  </Title>
                )}
              </Stack>
            </Button>
          )}
        </div>
        <div className="section ni-header-user">
          {profileState.status === 'success' && (
            <>
              <div>
                <Text>{profileState.profile?.email}</Text>
                <br />
                <Button type="link" onClick={handleLabs}>
                  <ExperimentOutlined />
                  Labs
                </Button>
                <Button
                  hidden={true}
                  type="link"
                  onClick={handleChangePasswordClick}
                >
                  Change Password
                </Button>
                <Button type="link" onClick={handleRequests}>
                  Requests
                </Button>
                {isAdmin(profileState.profile) && (
                  <Button type="link" onClick={handleUsers}>
                    Users
                  </Button>
                )}
                {isInstitutionAdmin(profileState.profile) && (
                  <Button type="link" onClick={handleBranches}>
                    Branches
                  </Button>
                )}
                {isSuperAdmin(profileState.profile) && (
                  <Button type="link" onClick={handleInstitutions}>
                    Institutions
                  </Button>
                )}
                {!isSuperAdmin(profileState.profile) &&
                  isInstitutionAdmin(profileState.profile) && (
                    <Button type="link" onClick={handleInstitution}>
                      Institution
                    </Button>
                  )}
                <Button type="link" onClick={handleLogoutClick}>
                  Logout
                </Button>
              </div>
              <Avatar icon={<UserOutlined />} className="ni-header-avatar" />
            </>
          )}
        </div>
      </header>
    </Spin>
  )
}

HeaderNavigation.defaultProps = {
  name: 'Loading',
}
