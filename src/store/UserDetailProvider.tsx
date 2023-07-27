import React, { useReducer } from 'react'
import { log, userService } from '../services'
import { IStateMachine, IProvider, IUser, IUserUpdate } from '.'
import useErrorHandler from '../hooks/useErrorHandler'

interface IUserDetailState extends IStateMachine {
  user?: IUser
}

export const initialState = {
  status: 'idle',
}

interface IAction {
  type: 'fetch' | 'update' | 'resolve' | 'reject' | 'cancel'
}

interface IRejectAction extends IAction {
  payload: string
}

interface IResolveAction extends IAction {
  payload: IUser
}

/* Types for the Context and Provider */
type IReducer = (
  prevState: IUserDetailState,
  action: IAction | IRejectAction | IResolveAction
) => IUserDetailState

/* Reducer */
const reducer = (prevState: IUserDetailState, action: IAction) => {
  switch (action.type) {
    case 'fetch':
      return {
        ...prevState,
        status: 'loading',
      }
    case 'update':
      return {
        ...prevState,
        status: 'updating',
      }
    case 'resolve':
      return {
        ...prevState,
        status: 'success',
        user: (action as IResolveAction).payload,
        error: undefined,
      }
    case 'reject':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
      }
    case 'cancel':
      return {
        ...prevState,
        status: 'cancel',
        error: (action as IRejectAction).payload,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IUserDetailContext {
  state: IUserDetailState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  getUser: (id: string) => void
  updateUser: (user: IUserUpdate) => void
  clear: () => void
}

export const UserDetailContext = React.createContext({} as IUserDetailContext)

export const UserDetailProvider = (props: IProvider) => {
  const [state, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  const getUser = async (id: string) => {
    try {
      dispatch({ type: 'fetch' })

      const result = await userService.findOne(id)
      dispatch({
        type: 'resolve',
        payload: result,
      })

      log.info(result, 'getUser')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'getUser')
        dispatch({
          type: 'cancel',
          payload: userService.errorMessage(error),
        })
      })
    }
  }

  const updateUser = async (user: IUserUpdate) => {
    try {
      dispatch({ type: 'update' })

      const result = await userService.update(user)

      dispatch({
        type: 'resolve',
        payload: result,
      })

      log.info(result, 'updateUser')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'updateUser')
        dispatch({
          type: 'reject',
          payload: userService.errorMessage(error),
        })
      })
    }
  }

  /**
   * Deletes all data
   */
  const clear = () => {
    dispatch({ type: 'cancel' })
    return
  }
  return (
    <UserDetailContext.Provider
      value={{
        state,
        dispatch,
        getUser,
        updateUser,
        clear,
      }}
    >
      {props.children}
    </UserDetailContext.Provider>
  )
}
