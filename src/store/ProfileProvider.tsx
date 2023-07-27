import React, { useContext, useReducer, useEffect } from 'react'
import { log, profileService } from '../services'
import { AuthContextStore } from '../store/AuthProvider'
import useErrorHandler from '../hooks/useErrorHandler'
import { IUser, IProvider, IStateMachine } from '.'

interface IProfileState extends IStateMachine {
  profile?: IUser
}
/* Initial state for reducer */
const initialState = {
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
  payload: IUser
}
/* Types for the Context and Provider */
type IReducer = (
  prevState: IProfileState,
  action: IAction | IRejectAction | IResolveAction
) => IProfileState

const reducer = (prevState: IProfileState, action: IAction) => {
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
        profile: (action as IResolveAction).payload,
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
        profile: undefined,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IProfileContext {
  profileState: IProfileState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  getProfile: () => void
  clearProfile: () => void
}

// export this because we will be using it in components
// like this: const { personalInfo } = useContext(ProfileContext)
export const ProfileContext = React.createContext({} as IProfileContext)

export const ProfileProvider = (props: IProvider) => {
  const [profileState, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()
  const { isAuthenticated } = useContext(AuthContextStore)

  // load profile if we are authenticated
  useEffect(() => {
    const loadProfile = async () => {
      await getProfile()
    }
    if (isAuthenticated()) {
      loadProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  /**
   * Fetches a profile from an authenticated user
   */
  const getProfile = async () => {
    try {
      dispatch({ type: 'fetch' })

      const result = await profileService.getMe()
      log.info(result, 'getProfile')

      dispatch({ type: 'resolve', payload: result })
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'getProfile')
        dispatch({
          type: 'reject',
          payload: profileService.errorMessage(error),
        })
      })
    }
  }

  const clearProfile = () => dispatch({ type: 'cancel' })

  return (
    <ProfileContext.Provider
      value={{
        profileState,
        dispatch,
        getProfile,
        clearProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  )
}
