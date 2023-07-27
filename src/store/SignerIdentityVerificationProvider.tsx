import React, { useReducer } from 'react'
import { log, signerIdentityVerificationsService } from '../services'
import useErrorHandler from '../hooks/useErrorHandler'
import { IStateMachine, ISignerIdentityVerification, IProvider } from '.'

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
  payload: [ISignerIdentityVerification]
}
// this extends IStateMachine which has a status and error already
// so the reducer will control a state with:
// { status: 'iddle', error: null, identityVerifications: [] }
export interface ISignerIdentityVerificationState extends IStateMachine {
  identityVerifications?: [ISignerIdentityVerification]
}
/* Types for the Context and Provider */
type IReducer = (
  prevState: ISignerIdentityVerificationState,
  action: IAction | IRejectAction | IResolveAction
) => ISignerIdentityVerificationState

// now we actually implement the reducer
const reducer = (
  prevState: ISignerIdentityVerificationState,
  action: IAction
) => {
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
        identityVerifications: (action as IResolveAction).payload,
        error: null,
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
interface ISignerIdentityVerificationContext {
  state: ISignerIdentityVerificationState
  getSignerIdentityVerification: (signerId: string) => void
}
// export this because we will be using it in components
// like this: const { state, getSignerIdentityVerification } = useContext(SignerIdentityVerificationContext)
export const SignerIdentityVerificationContext = React.createContext(
  {} as ISignerIdentityVerificationContext
)
// now we actually implement what we meant in ISignerIdentityVerificationContext
export const SignerIdentityVerificationProvider = (props: IProvider) => {
  const [state, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  /**
   * Fetch data and store in the state
   * @param signerId - signer id
   */
  const getSignerIdentityVerification = async (signerId: string) => {
    try {
      // call reducer with a fetch action
      dispatch({ type: 'fetch' })

      // NOTE: since we end up testing this in the provider as well,
      // I Think we might end up removing the services
      const result = await signerIdentityVerificationsService.getIdentityVerification(
        signerId
      )
      log.info(result, 'SignerIdentityVerificationContext')

      // call reducer with resolve action and store the result from the api (should be an array of verifications)
      dispatch({ type: 'resolve', payload: result })
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'SignerIdentityVerificationContext')
        dispatch({
          type: 'reject',
          payload: signerIdentityVerificationsService.errorMessage(error),
        })
      })
    }
  }

  return (
    <SignerIdentityVerificationContext.Provider
      value={{
        state,
        getSignerIdentityVerification,
      }}
    >
      {props.children}
    </SignerIdentityVerificationContext.Provider>
  )
}
