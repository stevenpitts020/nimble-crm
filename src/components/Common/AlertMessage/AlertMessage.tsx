import React, { useContext } from 'react'
import { Alert } from 'antd'

/* Our Context */
import { AlertContext } from '../../../store/AlertProvider'

export const AlertMessage: React.FC = () => {
  const { alertState } = useContext(AlertContext)

  const onClick = () => {
    if (alertState.onClick) alertState.onClick()
  }
  return (
    <div data-testid="alert-message" onClick={onClick}>
      {alertState.message && (
        <Alert
          className="ni-alert-message"
          message={alertState.message}
          type={alertState.type}
        />
      )}
    </div>
  )
}
