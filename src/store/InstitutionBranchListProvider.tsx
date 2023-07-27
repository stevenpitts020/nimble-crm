import React, { useReducer } from 'react'
import { log, InstitutionBranchesService } from '../services'
import {
  IStateMachine,
  IProvider,
  IInstitutionBranch,
  IPaginationOptions,
} from '.'
import { PER_PAGE } from '../components/InstitutionBranch/InstitutionBranchTable/constants'
import useErrorHandler from '../hooks/useErrorHandler'

interface IInstitutionBranchListState extends IStateMachine {
  pagination: IPaginationOptions
  institutionBranches: IInstitutionBranch[]
  count: number
}

export const initialSearchOptions = {
  limit: PER_PAGE,
  offset: 0,
  sort: 'name',
  search: '',
}

export const initialState: IInstitutionBranchListState = {
  status: 'idle',
  institutionBranches: [],
  pagination: initialSearchOptions,
  count: 0,
}

interface IAction {
  type: 'fetch' | 'resolve' | 'reject' | 'cancel'
}

interface IResolveAction extends IAction {
  payload: {
    institutionBranches: IInstitutionBranch[]
    pagination: IPaginationOptions
    count: number
  }
}

interface IRejectAction extends IAction {
  payload: string
}

type IReducer = (
  prevState: IInstitutionBranchListState,
  action: IAction | IRejectAction | IResolveAction
) => IInstitutionBranchListState

const reducer = (prevState: IInstitutionBranchListState, action: IAction) => {
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
        institutionBranches: (action as IResolveAction).payload
          .institutionBranches,
        pagination: (action as IResolveAction).payload.pagination,
        count: (action as IResolveAction).payload.count,
        error: undefined,
      }
    case 'reject':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
        institutionBranches: [],
      }
    case 'cancel':
      return {
        ...prevState,
        status: 'idle',
        error: undefined,
        institutionBranches: [],
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IInstitutionBranchListContext {
  state: IInstitutionBranchListState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  list: (options: IPaginationOptions) => void
  clear: () => void
}

export const InstitutionBranchListContext = React.createContext(
  {} as IInstitutionBranchListContext
)

export const InstitutionBranchListProvider = (props: IProvider) => {
  const [state, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  const list = async (options: IPaginationOptions) => {
    try {
      dispatch({ type: 'fetch' })

      const institutionBranches: IInstitutionBranch[] = await InstitutionBranchesService.findAll(
        options
      )

      let count = state.count

      count = (await InstitutionBranchesService.count(options.search || ''))
        .count

      dispatch({
        type: 'resolve',
        payload: {
          institutionBranches,
          pagination: options,
          count,
        },
      })

      log.info(institutionBranches, 'listInstitutionsBranches')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'listInstitutionBranches')
        dispatch({
          type: 'reject',
          payload: InstitutionBranchesService.errorMessage(error),
        })
      })
    }
  }

  const clear = () => {
    dispatch({ type: 'cancel' })
    return
  }

  return (
    <InstitutionBranchListContext.Provider
      value={{
        state,
        dispatch,
        list,
        clear,
      }}
    >
      {props.children}
    </InstitutionBranchListContext.Provider>
  )
}
