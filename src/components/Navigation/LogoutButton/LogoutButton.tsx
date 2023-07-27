import React, { useContext } from 'react'
import { Button } from 'antd'

/* Our Context */
import { AuthContextStore } from '../../../store/AuthProvider'

export const LogoutButton: React.FC<{}> = () => {
  const { handleLogout } = useContext(AuthContextStore)

  const handleLogoutClick = () => handleLogout()

  return (
    <div className="ni-logout-wrapper">
      <Button type="link" onClick={handleLogoutClick}>
        Logout
      </Button>
    </div>
  )
}
