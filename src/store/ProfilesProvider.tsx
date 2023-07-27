import React, { useContext, useEffect, useReducer } from 'react'
import { log, profileService } from '../services'
import useErrorHandler from '../hooks/useErrorHandler'
import { IUser, IProvider, IStateMachine, IPaginationOptions } from '.'
import { AuthContextStore } from './AuthProvider'

interface IProfilesState extends IStateMachine {
  profiles?: IUser[]
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
  payload: IUser[]
}

/* Types for the Context and Provider */
type IReducer = (
  prevState: IProfilesState,
  action: IAction | IRejectAction | IResolveAction
) => IProfilesState

const reducer = (prevState: IProfilesState, action: IAction) => {
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
        profiles: (action as IResolveAction).payload,
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

interface IProfilesContext {
  profilesState: IProfilesState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  listReferrers: (options: IPaginationOptions) => void
}

// export this because we will be using it in components
// like this: const { personalInfo } = useContext(ProfileContext)
export const ProfilesContext = React.createContext({} as IProfilesContext)

export const ProfilesProvider = (props: IProvider) => {
  const [profilesState, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()
  const { isAuthenticated } = useContext(AuthContextStore)

  useEffect(() => {
    // load all profiles, for this user, on authenticate
    const loadProfiles = async () => await listReferrers({ sort: 'first_name' })
    if (isAuthenticated()) loadProfiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const listReferrers = async (options: IPaginationOptions) => {
    try {
      dispatch({ type: 'fetch' })

      const referrers = await profileService.referrers(options)
      log.info(referrers, 'listReferrers')

      dispatch({ type: 'resolve', payload: referrers })
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'listReferrers')
        dispatch({
          type: 'reject',
          payload: profileService.errorMessage(error),
        })
      })
    }
  }

  return (
    <ProfilesContext.Provider
      value={{
        profilesState,
        dispatch,
        listReferrers,
      }}
    >
      {props.children}
    </ProfilesContext.Provider>
  )
}
