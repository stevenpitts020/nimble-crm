import React, { useReducer } from 'react'
import { log, accountRequestService } from '../services'
import {
  IAccountRequestUpdate,
  IAccountRequest,
  IStateMachine,
  IProvider,
} from '.'
import useErrorHandler from '../hooks/useErrorHandler'

interface IAccountRequestState extends IStateMachine {
  accountRequest?: IAccountRequest
}
/* Initial state for reducer */
export const initialState = {
  status: 'idle',
}
/* a typical fetch action */
interface IAction {
  type: 'fetch' | 'update' | 'resolve' | 'reject' | 'cancel'
}
interface IRejectAction extends IAction {
  payload: string
}
interface IResolveAction extends IAction {
  payload: IAccountRequest
}
/* Types for the Context and Provider */
type IReducer = (
  prevState: IAccountRequestState,
  action: IAction | IRejectAction | IResolveAction
) => IAccountRequestState

/* Reducer */
const reducer = (prevState: IAccountRequestState, action: IAction) => {
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
        accountRequest: (action as IResolveAction).payload,
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

interface IAccountRequestDetailContext {
  accountState: IAccountRequestState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  getAccountRequest: (id: string) => void
  updateAccountRequest: (
    id: string,
    accountRequest: IAccountRequestUpdate
  ) => void
  clearData: () => void
}

export const AccountRequestDetailContext = React.createContext(
  {} as IAccountRequestDetailContext
)

export const AccountRequestDetailProvider = (props: IProvider) => {
  const [accountState, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  /**
   * Fetch an account request
   *
   * @param id - id for account request
   */
  const getAccountRequest = async (id: string) => {
    try {
      dispatch({ type: 'fetch' })

      const result = await accountRequestService.getAccountRequest(id)
      dispatch({
        type: 'resolve',
        payload: result,
      })

      log.info(result, 'getAccountRequest')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'getAccountRequest')
        dispatch({
          type: 'cancel',
          payload: accountRequestService.errorMessage(error),
        })
      })
    }
  }

  /**
   * Update an Account Request
   *
   * @param id - account rquest id
   * @param accountRequest - data to update
   */
  const updateAccountRequest = async (
    id: string,
    accountRequest: IAccountRequestUpdate
  ) => {
    try {
      dispatch({ type: 'update' })

      const result = await accountRequestService.updateAccountRequest(
        id,
        accountRequest
      )

      dispatch({
        type: 'resolve',
        payload: result,
      })

      log.info(result, 'updateAccountRequest')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'updateAccountRequest')
        dispatch({
          type: 'reject',
          payload: accountRequestService.errorMessage(error),
        })
      })
    }
  }

  /**
   * Deletes all data
   */
  const clearData = () => {
    dispatch({ type: 'cancel' })
    return
  }
  return (
    <AccountRequestDetailContext.Provider
      value={{
        accountState,
        dispatch,
        getAccountRequest,
        updateAccountRequest,
        clearData,
      }}
    >
      {props.children}
    </AccountRequestDetailContext.Provider>
  )
}
