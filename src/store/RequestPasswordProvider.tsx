import React, { useReducer } from 'react'
import { IProvider, IStateMachine, IReducerAction } from '.'
import { log, authRecoverPasswordService } from '../services'

/* Initial state for reducer */
const initialState: IStateMachine = {
  status: 'idle',
}

/* Reducer type */
type IReducer = (
  prevState: IStateMachine,
  action: IReducerAction
) => IStateMachine

const reducer = (prevState: IStateMachine, event: IReducerAction) => {
  switch (event.type) {
    case 'fetch':
      return {
        ...prevState,
        status: 'loading',
      }
    case 'resolve':
      return {
        ...prevState,
        status: 'success',
        error: undefined,
      }
    case 'reject':
      return {
        ...prevState,
        status: 'failure',
        error: event.payload,
      }
    case 'cancel':
      return {
        ...prevState,
        status: 'cancel',
        error: undefined,
      }
    default:
      return prevState
  }
}

interface IRequestPasswordContext {
  requestState: IStateMachine
  dispatch: ({ type }: { type: string }) => void
  requestPassword: (email: string) => void
  changePassword: (email: string, password: string, code: string) => void
}

export const RequestPasswordContext = React.createContext(
  {} as IRequestPasswordContext
)

export const RequestPasswordProvider = (props: IProvider) => {
  const [requestState, dispatch] = useReducer<IReducer>(reducer, initialState)

  /**
   *  Requests a password change link
   * @param email email to send link
   */
  const requestPassword = async (email: string) => {
    try {
      log.info(email, 'RequestPasswordProvider')
      dispatch({ type: 'fetch' })
      await authRecoverPasswordService.requestResetPasswordLink(email)
      await dispatch({ type: 'resolve' })
    } catch (error) {
      log.error(error, 'RequestPasswordProvider')
      dispatch({
        type: 'reject',
        payload: authRecoverPasswordService.errorMessage(error),
      })
    }
  }
  /**
   * Change a password
   * @param email - user email
   * @param password - the password
   * @param code - security code
   */
  const changePassword = async (
    email: string,
    password: string,
    code: string
  ) => {
    try {
      log.info({ email, password, code }, 'RequestPasswordProvider')
      dispatch({ type: 'fetch' })
      await authRecoverPasswordService.changePassword(email, password, code)
      await dispatch({ type: 'resolve' })
    } catch (error) {
      log.error(error, 'RequestPasswordProvider')
      dispatch({
        type: 'reject',
        payload: authRecoverPasswordService.errorMessage(error),
      })
    }
  }

  return (
    <RequestPasswordContext.Provider
      value={{
        requestState,
        dispatch,
        requestPassword,
        changePassword,
      }}
    >
      {props.children}
    </RequestPasswordContext.Provider>
  )
}
