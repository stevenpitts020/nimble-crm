import React, { useReducer } from 'react'
import { log, userService } from '../services'
import { IStateMachine, IProvider, IUser, IPaginationOptions } from '.'
import { PER_PAGE } from '../components/User/UserTable/constants'
import useErrorHandler from '../hooks/useErrorHandler'

interface IUserListState extends IStateMachine {
  pagination: IPaginationOptions
  users: IUser[]
  count: number
}

export const initialSearchOptions = {
  limit: PER_PAGE,
  offset: 0,
  sort: 'last_name',
  search: '',
}

export const initialState: IUserListState = {
  status: 'idle',
  users: [],
  pagination: initialSearchOptions,
  count: 0,
}

interface IAction {
  type: 'fetch' | 'resolve' | 'reject' | 'cancel'
}

interface IResolveAction extends IAction {
  payload: {
    users: IUser[]
    pagination: IPaginationOptions
    count: number
  }
}

interface IRejectAction extends IAction {
  payload: string
}

type IReducer = (
  prevState: IUserListState,
  action: IAction | IRejectAction | IResolveAction
) => IUserListState

const reducer = (prevState: IUserListState, action: IAction) => {
  switch (action.type) {
    case 'fetch':
      return {
        ...prevState,
        status: 'loading',
      }
    case 'resolve':
      return {
        ...prevState,
        status: 'success',
        users: (action as IResolveAction).payload.users,
        pagination: (action as IResolveAction).payload.pagination,
        count: (action as IResolveAction).payload.count,
        error: undefined,
      }
    case 'reject':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
        users: [],
      }
    case 'cancel':
      return {
        ...prevState,
        status: 'idle',
        error: undefined,
        users: [],
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IUserListContext {
  state: IUserListState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  list: (options: IPaginationOptions) => void
  clear: () => void
}

export const UserListContext = React.createContext({} as IUserListContext)

export const UserListProvider = (props: IProvider) => {
  const [state, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  const list = async (options: IPaginationOptions) => {
    try {
      dispatch({ type: 'fetch' })

      const users: IUser[] = await userService.findAll(options)

      let count = state.count

      count = (
        await userService.count(options.search || '', options.branch || '')
      ).count

      dispatch({
        type: 'resolve',
        payload: {
          users,
          pagination: options,
          count,
        },
      })

      log.info(users, 'listUsers')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'listUsers')
        dispatch({
          type: 'reject',
          payload: userService.errorMessage(error),
        })
      })
    }
  }

  const clear = () => {
    dispatch({ type: 'cancel' })
    return
  }

  return (
    <UserListContext.Provider
      value={{
        state,
        dispatch,
        list,
        clear,
      }}
    >
      {props.children}
    </UserListContext.Provider>
  )
}
