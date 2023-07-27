import React, { useReducer } from 'react'
import { log, signerComplianceVerificationService } from '../services'
import useErrorHandler from '../hooks/useErrorHandler'
import { IStateMachine, ISignerComplianceVerification, IProvider } from '.'
import FormatHelper from '../utils/FormatHelper'

/* Initial state for reducer */
export const initialState = {
  status: 'idle',
}
/* a typical fetch action */
interface IAction {
  type: 'fetch' | 'resolve' | 'reject'
}
interface IRejectAction extends IAction {
  payload: string
}
interface IResolveAction extends IAction {
  payload: ISignerComplianceVerification
}
// this extends IStateMachine which has a status and error already
// so the reducer will control a state with:
// { status: 'iddle', error: null, identityVerifications: [] }
export interface IProviderState extends IStateMachine {
  complianceVerification?: ISignerComplianceVerification
}
/* Types for the Context and Provider */
type IReducer = (
  prevState: IProviderState,
  action: IAction | IRejectAction | IResolveAction
) => IProviderState

// now we actually implement the reducer
const reducer = (prevState: IProviderState, action: IAction) => {
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
        complianceVerification: (action as IResolveAction).payload,
      }
    case 'reject':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// we have to explain what someone can access in our context, in this case, only a method and the state
// note: state is a bit generic name for this, oh well.
interface IStateContext {
  state: IProviderState
  getSignerComplianceVerification: (signerId: string) => void
}
// export this because we will be using it in components
// like this: const { state, getSignerIdentityVerification } = useContext(SignerComplianceVerificationContext)
export const SignerComplianceVerificationContext = React.createContext(
  {} as IStateContext
)
// now we actually implement what we meant in ISignerComplianceVerificationContext
export const SignerComplianceVerificationProvider = (props: IProvider) => {
  const [state, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  /**
   * Fetch data and store in the state
   * @param signerId - signer id
   */
  const getSignerComplianceVerification = async (signerId: string) => {
    try {
      // call reducer with a fetch action
      dispatch({ type: 'fetch' })

      // NOTE: since we end up testing this in the provider as well,
      // I Think we might end up removing the services
      const result = await signerComplianceVerificationService.getSignerComplianceVerification(
        signerId
      )
      log.info(result, 'SignerComplianceVerificationContext')

      if (!FormatHelper.isEmpty(result) && result.length > 0) {
        // call reducer with resolve action and store the result from the api (should be an array of verifications)
        dispatch({ type: 'resolve', payload: result[0] })
      } else {
        dispatch({ type: 'resolve', payload: undefined })
      }
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'SignerComplianceVerificationContext')
        dispatch({
          type: 'reject',
          payload: signerComplianceVerificationService.errorMessage(error),
        })
      })
    }
  }

  return (
    <SignerComplianceVerificationContext.Provider
      value={{
        state,
        getSignerComplianceVerification,
      }}
    >
      {props.children}
    </SignerComplianceVerificationContext.Provider>
  )
}
