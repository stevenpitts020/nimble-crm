import React, { useReducer, ReactChild } from 'react'
import * as Sentry from '@sentry/react'
import _ from 'lodash'
/* Use a Service to abstract some logic */
import { authService, log } from '../services/'
import FormatHelper from '../utils/FormatHelper'
import ErrorBoundary from './ErrorBoundary'
import { ISelectOptions, IStateMachine, IUser } from '.'
import LocationHelper from '../utils/LocationHelper'

export interface IAuthState extends IStateMachine {
  token?: string | null
}

/* Initial state for reducer */
const initialState = {
  status: 'idle',
}

/* define action types */
interface IAction {
  type:
    | 'fetch'
    | 'logout'
    | 'login_success'
    | 'login_fail'
    | 'change_pass_fail'
    | 'change_pass_success'
    | 'magic_link_success'
}

interface IRejectAction extends IAction {
  payload: string
}

interface IResolveAction extends IAction {
  token: string
}

/* Types for the Context and Provider */
type IReducer = (
  prevState: IAuthState,
  action: IAction | IRejectAction | IResolveAction
) => IAuthState

/* Reducer */
const reducer = (prevState: IAuthState, action: IAction) => {
  switch (action.type) {
    case 'fetch':
      return {
        ...prevState,
        status: 'loading',
      }
    case 'login_success':
      return {
        ...prevState,
        status: 'success',
        token: (action as IResolveAction).token,
        error: undefined,
      }
    case 'login_fail':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
        token: undefined,
      }
    case 'change_pass_success':
      return {
        ...prevState,
        status: 'passwordChanged',
        error: undefined,
        token: undefined,
      }
    case 'change_pass_fail':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
        token: undefined,
      }
    case 'magic_link_success':
      return {
        ...prevState,
        status: 'success',
        error: (action as IRejectAction).payload,
        token: undefined,
      }
    case 'logout':
      return {
        ...prevState,
        status: 'idle',
        error: (action as IRejectAction).payload,
        token: undefined,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

/* We need to specify Type for new Context Store */
interface IAuthContextInterface {
  auth: IAuthState
  dispatchAuth: (action: IAction | IRejectAction | IResolveAction) => void
  handleLogin: (credentials: { email: string; password: string }) => void
  handleMagicLink: (credentials: { email: string; token: string }) => void
  handleLogout: (message?: string) => void
  isAuthenticated: () => boolean
  hasPhone: (user?: IUser | undefined) => boolean
  hasRole: (user?: IUser | undefined, role?: string | undefined) => boolean
  isAdmin: (user?: IUser | undefined) => boolean
  isSuperAdmin: (user?: IUser | undefined) => boolean
  isInstitutionAdmin: (user?: IUser | undefined) => boolean
  isBranchAdmin: (user?: IUser | undefined) => boolean
  isPeer: (user?: IUser | undefined, other?: IUser | undefined) => boolean
  isSuperior: (sup?: IUser | undefined, sub?: IUser | undefined) => boolean
  isSubordinate: (sub?: IUser | undefined, sup?: IUser | undefined) => boolean
  assignableRoles: (user?: IUser | undefined) => ISelectOptions[]
  allRoles: () => ISelectOptions[]
  assignableStatuses: (user?: IUser | undefined) => ISelectOptions[]
  changePassword: (
    credentials: {
      email: string
      password: string
    },
    newPassword: string
  ) => void
  getLastEmail: () => string | null
}

/* Export this because we're going to be using it alot */
export const AuthContextStore = React.createContext({} as IAuthContextInterface)

interface IProvider {
  children: ReactChild
  existingToken?: string | null
}

/* Create our global store provider */
const AuthProvider = (props: IProvider) => {
  /*
    State Auth Reducer
  */
  const [auth, dispatchAuth] = useReducer<IReducer>(reducer, {
    ...initialState,
    token: props.existingToken,
  })

  /**
   * Changes a existing password
   *
   * @param credentials - email and passowrd
   * @param newPassword - string
   */
  const changePassword = async (
    credentials: {
      email: string
      password: string
    },
    newPassword: string
  ) => {
    try {
      const result = await authService.login(
        credentials.email,
        credentials.password
      )
      if (result.token) {
        await authService.changePassword(newPassword)
        dispatchAuth({ type: 'change_pass_success' })
        log.info('change password SUCCESS', '[changePassword Provider]')
      }
    } catch (error) {
      log.error('change password FAIL', '[changePassword Provider]')

      dispatchAuth({
        type: 'change_pass_fail',
        payload: authService.prettyErrorMessage(error),
      })
    }
  }

  const getLastEmail = () => {
    return authService.getEmail()
  }

  /**
   * Login to the api via a magic-link
   */
  const handleMagicLink = async (credentials: {
    email: string
    token: string
  }) => {
    try {
      dispatchAuth({ type: 'fetch' })

      const res = await authService.magicLink(
        credentials.email,
        credentials.token
      )

      if (res.mfaCacheToken) {
        authService.saveMFACacheToken(res.mfaCacheToken)
        authService.saveMFAMaskedPhone(res.mfaMaskedPhone)
        window.location.href = '/mfa'
        return
      }

      log.info(res, 'handleMagicLink')

      // set user in Sentry scope
      Sentry.setUser({ email: credentials.email })

      authService.saveAccessToken(res.token)
      authService.saveEmail(credentials.email)
      dispatchAuth({
        type: 'login_success',
        token: res.token,
      })
    } catch (error) {
      log.error(error, 'handleMagicLink')
      dispatchAuth({
        type: 'login_fail',
        payload: authService.prettyErrorMessage(error),
      })
    }
  }

  /**
   * Login to the api
   * @param credentials - email and password
   */
  const handleLogin = async (credentials: {
    email: string
    password: string
  }) => {
    try {
      dispatchAuth({ type: 'fetch' })
      const result = await authService.login(
        credentials.email,
        credentials.password
      )
      log.info(result, 'handleLogin')

      if (result?.type === 'MAGIC_LINK') {
        return dispatchAuth({
          type: 'magic_link_success',
          payload: result.message,
        })
      }

      // set user in Sentry scope
      Sentry.setUser({ email: credentials.email })

      authService.saveAccessToken(result.token)
      dispatchAuth({
        type: 'login_success',
        token: result.token,
      })
    } catch (error) {
      log.error(error, 'handleLogin')
      dispatchAuth({
        type: 'login_fail',
        payload: authService.prettyErrorMessage(error),
      })
    }
  }

  /**
   * Logs the user out of the app. Can receive a message to present on the Login Screen
   * IE: ErrorBoundary
   *
   * @param message - string
   */
  const handleLogout = (message?: string) => {
    LocationHelper.logout()

    Sentry.configureScope(scope => scope.setUser(null))

    log.info('logout success', 'handleLogout')
    authService.removeAccessToken()
    dispatchAuth({ type: 'logout', payload: message })
  }

  /**
   * Returns true or false if the user is authenticated
   */
  const isAuthenticated = () => {
    return !FormatHelper.isEmpty(authService.getAccessToken())
  }

  const hasPhone = (user: IUser | undefined): boolean => {
    if (!user) {
      return true
    }

    return !!user.phone
  }

  const hasRole = (
    user: IUser | undefined,
    roles: string | string[] | undefined
  ) => {
    if (!user || _.isEmpty(roles) || _.isEmpty(user.roles)) return false
    if (_.isString(roles)) roles = [roles]
    return _.some(user.roles, _role =>
      _.some(roles, role => _.isEqual(_role, role))
    )
  }
  const isAdmin = (user: IUser | undefined) => {
    return hasRole(user, ['super-admin', 'institution-admin', 'branch-admin'])
  }
  const isSuperAdmin = (user: IUser | undefined) => {
    return hasRole(user, 'super-admin')
  }
  const isInstitutionAdmin = (user: IUser | undefined) => {
    return hasRole(user, ['super-admin', 'institution-admin'])
  }
  const isBranchAdmin = (user: IUser | undefined) => {
    return hasRole(user, ['super-admin', 'institution-admin', 'branch-admin'])
  }

  const isPeer = (user: IUser | undefined, other: IUser | undefined) => {
    return !isSuperior(user, other) && !isSubordinate(user, other)
  }

  const isSuperior = (sup: IUser | undefined, sub: IUser | undefined) => {
    if (!sup) return false
    if (!sub) return true
    if (isSuperAdmin(sub)) return false
    if (isSuperAdmin(sup)) return true
    if (isInstitutionAdmin(sub)) return false
    if (isInstitutionAdmin(sup)) return true
    if (isBranchAdmin(sub)) return false
    return isBranchAdmin(sup)
  }

  const isSubordinate = (sub: IUser | undefined, sup: IUser | undefined) => {
    if (!sub) return true
    if (!sup) return false
    if (isSuperAdmin(sub)) return false
    if (isSuperAdmin(sup)) return true
    if (isInstitutionAdmin(sub)) return false
    if (isInstitutionAdmin(sup)) return true
    if (isBranchAdmin(sub)) return false
    return isBranchAdmin(sup)
  }

  const branchRoles = [
    {
      value: 'employee',
      label: 'Employee',
    },
    {
      value: 'branch-admin',
      label: 'Branch Admin',
    },
  ]

  const institutionRoles = _.concat(branchRoles, {
    value: 'institution-admin',
    label: 'Institution Admin',
  })

  const superRoles = _.concat(institutionRoles, {
    value: 'super-admin',
    label: 'Super Admin',
  })

  const allRoles = () => {
    return superRoles
  }

  const assignableRoles = (user?: IUser | undefined) => {
    if (isSuperAdmin(user)) return superRoles
    if (isInstitutionAdmin(user)) return institutionRoles
    if (isBranchAdmin(user)) return branchRoles
    return []
  }

  const assignableStatuses = (user?: IUser | undefined) => {
    const statuses = [
      { value: 'ACTIVE', label: 'Active' },
      { value: 'DEACTIVATED', label: 'Disabled' },
      { value: 'SUSPENDED', label: 'Suspended' },
    ]

    if (isAdmin(user)) return statuses
    return []
  }

  return (
    <AuthContextStore.Provider
      value={{
        auth,
        dispatchAuth,
        handleLogin,
        handleMagicLink,
        handleLogout,
        isAuthenticated,
        hasPhone,
        hasRole,
        isAdmin,
        isSuperAdmin,
        isBranchAdmin,
        isPeer,
        isSuperior,
        isSubordinate,
        isInstitutionAdmin,
        allRoles,
        assignableRoles,
        assignableStatuses,
        changePassword,
        getLastEmail,
      }}
    >
      <ErrorBoundary onError={handleLogout}>{props.children}</ErrorBoundary>
    </AuthContextStore.Provider>
  )
}

export default AuthProvider
