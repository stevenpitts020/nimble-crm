import React, { useReducer } from 'react'
import _ from 'lodash'
import { log, baseRateService } from '../services'
import useErrorHandler from '../hooks/useErrorHandler'
import { IStateMachine, IBaseRate, IProvider } from '.'

export interface IBaseRateState extends IStateMachine {
  baseRate?: IBaseRate[]
}
/* Initial state for reducer */
export const initialState = {
  status: 'idle',
}

/* a typical fetch action */
interface IAction {
  type: 'fetch' | 'resolve' | 'reject' | 'cancel'
}
interface IRejectAction extends IAction {
  payload: string
}
interface IResolveAction extends IAction {
  payload: IBaseRate[]
}
/* Types for the Context and Provider */
type IReducer = (
  prevState: IBaseRateState,
  action: IAction | IRejectAction | IResolveAction
) => IBaseRateState

const reducer = (prevState: IBaseRateState, action: IAction) => {
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
        baseRate: (action as IResolveAction).payload,
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
        status: 'idle',
        error: undefined,
        baseRate: undefined,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IBaseRateContext {
  baseRateState: IBaseRateState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  getBaseRate: () => void
  clearData: () => void
}

export const BaseRateContext = React.createContext({} as IBaseRateContext)

export const BaseRateProvider = (props: IProvider) => {
  const [baseRateState, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  const getBaseRate = async () => {
    try {
      dispatch({ type: 'fetch' })
      const _result = await baseRateService.getBaseRate()
      const result = _.get(_result, 'data')
      log.info(result, 'getBaseRate')

      dispatch({ type: 'resolve', payload: result })
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'getBaseRate')
        dispatch({
          type: 'reject',
          payload: baseRateService.errorMessage(error),
        })
      })
    }
  }

  const clearData = () => dispatch({ type: 'cancel' })

  return (
    <BaseRateContext.Provider
      value={{
        baseRateState,
        dispatch,
        getBaseRate,
        clearData,
      }}
    >
      {props.children}
    </BaseRateContext.Provider>
  )
}
