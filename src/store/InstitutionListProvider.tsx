import React, { useReducer } from 'react'
import { log, institutionService } from '../services'
import { IStateMachine, IProvider, IInstitution, IPaginationOptions } from '.'
import { PER_PAGE } from '../components/Institution/InstitutionTable/constants'
import useErrorHandler from '../hooks/useErrorHandler'

interface IInstitutionListState extends IStateMachine {
  pagination: IPaginationOptions
  institutions: IInstitution[]
  count: number
}

export const initialSearchOptions = {
  limit: PER_PAGE,
  offset: 0,
  sort: 'name',
  search: '',
}

export const initialState: IInstitutionListState = {
  status: 'idle',
  institutions: [],
  pagination: initialSearchOptions,
  count: 0,
}

interface IAction {
  type: 'fetch' | 'resolve' | 'reject' | 'cancel'
}

interface IResolveAction extends IAction {
  payload: {
    institutions: IInstitution[]
    pagination: IPaginationOptions
    count: number
  }
}

interface IRejectAction extends IAction {
  payload: string
}

type IReducer = (
  prevState: IInstitutionListState,
  action: IAction | IRejectAction | IResolveAction
) => IInstitutionListState

const reducer = (prevState: IInstitutionListState, action: IAction) => {
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
        institutions: (action as IResolveAction).payload.institutions,
        pagination: (action as IResolveAction).payload.pagination,
        count: (action as IResolveAction).payload.count,
        error: undefined,
      }
    case 'reject':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
        institutions: [],
      }
    case 'cancel':
      return {
        ...prevState,
        status: 'idle',
        error: undefined,
        institutions: [],
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IInstitutionListContext {
  state: IInstitutionListState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  list: (options: IPaginationOptions) => void
  clear: () => void
}

export const InstitutionListContext = React.createContext(
  {} as IInstitutionListContext
)

export const InstitutionListProvider = (props: IProvider) => {
  const [state, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  const list = async (options: IPaginationOptions) => {
    try {
      dispatch({ type: 'fetch' })

      const institutions: IInstitution[] = await institutionService.findAll(
        options
      )

      let count = state.count

      count = (await institutionService.count(options.search || '')).count

      dispatch({
        type: 'resolve',
        payload: {
          institutions,
          pagination: options,
          count,
        },
      })

      log.info(institutions, 'listInstitutions')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'listInstitutions')
        dispatch({
          type: 'reject',
          payload: institutionService.errorMessage(error),
        })
      })
    }
  }

  const clear = () => {
    dispatch({ type: 'cancel' })
    return
  }

  return (
    <InstitutionListContext.Provider
      value={{
        state,
        dispatch,
        list,
        clear,
      }}
    >
      {props.children}
    </InstitutionListContext.Provider>
  )
}
