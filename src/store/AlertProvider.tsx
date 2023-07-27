import React from 'react'

interface IProvider {
  children: React.ReactNode
}

interface IAlertContext {
  alertState: IMessage
  showAlert: (options: IMessage) => void
  clearAlert: () => void
}

// export this because we will be using it in components
export const AlertContext = React.createContext({} as IAlertContext)

export interface IMessage {
  message: string | null
  type: 'info' | 'warning' | 'error' | 'success'
  timeout?: number
  onClick?: () => void
}

export const initialState: IMessage = {
  message: null,
  type: 'info',
}

export const AlertProvider = (props: IProvider) => {
  const [alertState, setMessage] = React.useState<IMessage>(initialState)

  const showAlert = (options: IMessage) => {
    setMessage({ message: options.message, type: options.type })
    if (options.timeout) setTimeout(clearAlert, options.timeout)
  }

  const clearAlert = () => setMessage(initialState)

  return (
    <AlertContext.Provider
      value={{
        alertState,
        showAlert,
        clearAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}
