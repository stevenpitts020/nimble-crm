import React, { useReducer, useState } from 'react'
import { log, accountRequestService } from '../services'
import { ISearchOptions, IAccountRequest, IStateMachine, IProvider } from '.'
import { PER_PAGE } from '../components/AccountRequest/AccountRequestTable/constants'
import useErrorHandler from '../hooks/useErrorHandler'

interface IAccountState extends IStateMachine {
  count: number
  pagination: ISearchOptions
  accountRequests: IAccountRequest[]
}

/* Initial state for reducer */
export const initialSearchOptions = {
  limit: PER_PAGE,
  offset: 0,
  sort: '-createdAt',
}
export const initialState: IAccountState = {
  status: 'idle',
  accountRequests: [],
  pagination: initialSearchOptions,
  count: 0,
}

/* a typical fetch action */
interface IAction {
  type: 'fetch' | 'resolve' | 'reject' | 'cancel'
}

interface IResolveAction extends IAction {
  payload: {
    accountRequests: IAccountRequest[]
    pagination: ISearchOptions
    count: number
  }
}

interface IRejectAction extends IAction {
  payload: string
}

/* Types for the Context and Provider */
type IReducer = (
  prevState: IAccountState,
  action: IAction | IRejectAction | IResolveAction
) => IAccountState

/* Reducer */
const reducer = (prevState: IAccountState, action: IAction) => {
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
        accountRequests: (action as IResolveAction).payload.accountRequests,
        pagination: (action as IResolveAction).payload.pagination,
        count: (action as IResolveAction).payload.count,
        error: undefined,
      }
    case 'reject':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
        accountRequests: [],
      }
    case 'cancel':
      return {
        ...prevState,
        status: 'idle',
        error: undefined,
        accountRequests: [],
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IAccountRequestContext {
  accountState: IAccountState
  statusFilters: string[]
  currentStatusFilter: string | null
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  listAccountRequests: (options: ISearchOptions) => void
  clearAccounts: () => void
  changeStatusFilter: (filter: string | null) => void
}

// export this because we will be using it in components
// like this: const { personalInfo } = useContext(AccountRequestContext)
export const AccountRequestContext = React.createContext(
  {} as IAccountRequestContext
)

export const AccountRequestProvider = (props: IProvider) => {
  const [accountState, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  // filters and how to change them
  const statusFilters = [
    'INCOMPLETE',
    'PENDING',
    'SIGNED',
    'APPROVED',
    'DECLINED',
  ]
  type IFilterState = string | null
  const [currentStatusFilter, setCurrentStatusFilter] = useState<IFilterState>(
    null
  )

  /**
   * Change current search filters
   *
   * @param filter - statusFilters
   */
  const changeStatusFilter = (filter: string | null) => {
    setCurrentStatusFilter(filter)
  }

  /**
   * Fetch a list of Account Requests
   *
   * @param options - ISearchOptions
   */
  const listAccountRequests = async (options: ISearchOptions) => {
    try {
      dispatch({ type: 'fetch' })

      if (currentStatusFilter !== null) {
        options.status = currentStatusFilter
      }
      const accountRequests: IAccountRequest[] = await accountRequestService.listAccountRequests(
        options
      )
      let count = accountState.count

      const response = await accountRequestService.countAccountRequests(
        options.status
      )
      count = response.count

      dispatch({
        type: 'resolve',
        payload: {
          accountRequests,
          pagination: options,
          count,
        },
      })

      log.info(accountRequests, 'listAccountRequests')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'listAccountRequests')
        dispatch({
          type: 'reject',
          payload: accountRequestService.errorMessage(error),
        })
      })
    }
  }

  /**
   * Clear everything
   */
  const clearAccounts = () => {
    dispatch({ type: 'cancel' })
    return
  }

  return (
    <AccountRequestContext.Provider
      value={{
        accountState,
        statusFilters,
        currentStatusFilter,
        changeStatusFilter,
        dispatch,
        listAccountRequests,
        clearAccounts,
      }}
    >
      {props.children}
    </AccountRequestContext.Provider>
  )
}
