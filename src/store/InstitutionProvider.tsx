import React, { useReducer } from 'react'
import { extractDomain } from '../utils/ExtractDomain'
import { log, institutionService } from '../services'
import useErrorHandler from '../hooks/useErrorHandler'
import { IStateMachine, IInstitution, IProvider } from '.'

export interface IInstitutionState extends IStateMachine {
  institution?: IInstitution
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
  payload: IInstitution
}
/* Types for the Context and Provider */
type IReducer = (
  prevState: IInstitutionState,
  action: IAction | IRejectAction | IResolveAction
) => IInstitutionState

const reducer = (prevState: IInstitutionState, action: IAction) => {
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
        institution: (action as IResolveAction).payload,
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
        institution: undefined,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IInstitutionContext {
  institutionState: IInstitutionState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  getInstitutionByDomain: (url: string, isDomain?: boolean) => void
  clearData: () => void
}

// export this because we will be using it in components
// like this: const { personalInfo } = useContext(InstitutionContext)
export const InstitutionContext = React.createContext({} as IInstitutionContext)

export const InstitutionProvider = (props: IProvider) => {
  const [institutionState, dispatch] = useReducer<IReducer>(
    reducer,
    initialState
  )
  const handleError = useErrorHandler()

  /**
   * Fetch a institution
   * @param url - slug for the institution
   */
  const getInstitutionByDomain = async (url: string, isDomain?: boolean) => {
    try {
      dispatch({ type: 'fetch' })

      const institutionDomain = isDomain ? url : extractDomain(url)
      const result = await institutionService.getInstitution(institutionDomain)
      log.info(result, 'getInstitutionByDomain')

      dispatch({ type: 'resolve', payload: result })
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'getInstitutionByDomain')
        dispatch({
          type: 'reject',
          payload: institutionService.errorMessage(error),
        })
      })
    }
  }

  const clearData = () => dispatch({ type: 'cancel' })

  return (
    <InstitutionContext.Provider
      value={{
        institutionState,
        dispatch,
        getInstitutionByDomain,
        clearData,
      }}
    >
      {props.children}
    </InstitutionContext.Provider>
  )
}
