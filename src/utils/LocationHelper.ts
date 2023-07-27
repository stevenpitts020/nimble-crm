/**
 * This file contains basic location helpers to be reused in views or components
 *
 * Use it to DRY your code. Peace.
 * ex: Helpers.locationTitle('/login');
 */
import _ from 'lodash'
import Repo from '../services/Repo'

const DEEP_LINK: string = 'deep-link'
const DEEP_LINK_LOGOUT_FLAG: string = `${DEEP_LINK}-logout-flag`

const uuidV4Pattern =
  '[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'

export interface Link {
  pathname?: string
  search?: string
  hash?: string
}

const LocationHelper = {
  /** get location title */
  getLocationTitle: (location: string | null) => {
    if (location == null) {
      return 'Nimble Page Not Found'
    }

    let title
    switch (true) {
      case new RegExp(`/accounts/${uuidV4Pattern}`, 'i').test(location):
        title = 'Nimble Account Request Detail'
        break
      case /\/labs/.test(location):
        title = 'Nimble Labs@Beta'
        break
      case /\/accounts/.test(location):
        title = 'Nimble Account Requests'
        break
      case /\/users/.test(location):
        title = 'Nimble User Management'
        break
      case /\/institutions/.test(location):
        title = 'Nimble Institution Management'
        break
      case /\/institution-settings/.test(location):
        title = 'Nimble Institution Settings'
        break
      case /\/institution-templates/.test(location):
        title = 'Nimble Institution Templates'
        break
      case /\/branches/.test(location):
        title = 'Nimble Branch Management'
        break
      case /\/login/.test(location):
        title = 'Nimble Login'
        break
      case /\/auth\/change-password/.test(location):
        title = 'Nimble Change Password'
        break
      case /\/auth\/request-password/.test(location):
        title = 'Nimble Request Password'
        break
      case /\/auth\/(.*)\/recover-password/.test(location):
        title = 'Nimble Recover Password'
        break
      case /\/auth\/(.*)\/set-password/.test(location):
        title = 'Nimble Set Password'
        break
      case /\/auth\/error\/(.*)/.test(location):
        title = 'Nimble Authentication Error'
        break
      case /\/phone/.test(location):
        title = 'Nimble Enter Phone Number'
        break
      case /\/products/.test(location):
        title = 'Nimble Product Management'
        break
      default:
        title = 'Nimble Page Not Found'
        break
    }

    return title
  },

  logout: () => {
    Repo.removeItem(DEEP_LINK)
    Repo.setItem(DEEP_LINK_LOGOUT_FLAG, true)
  },

  setLink: (location?: Link): Link | null => {
    if (_.isNil(location)) return Repo.removeItem(DEEP_LINK)
    if (Repo.removeItem(DEEP_LINK_LOGOUT_FLAG))
      return Repo.removeItem(DEEP_LINK)

    const pathname = _.get(location, 'pathname')
    // do not set paths which are public, login, logout
    if (
      !pathname ||
      pathname === '' ||
      pathname === '/' ||
      pathname.includes('login') ||
      pathname.includes('logout')
    ) {
      return Repo.removeItem(DEEP_LINK)
    }

    return Repo.setItem(DEEP_LINK, {
      pathname,
      hash: _.get(location, 'hash'),
      search: _.get(location, 'search'),
    } as Link)
  },

  /* eslint-disable eqeqeq */
  /* tslint:disable:triple-equals */
  linkEquals: (l?: Link, r?: Link): boolean => {
    if (l === r || (_.isNil(l) && _.isNil(r))) return true // same or both `nil`
    if (_.isNil(l) || _.isNil(r)) return false // one `nil`
    if (l.pathname != r.pathname) return false
    if (l.search != r.search) return false
    return l.hash == r.hash
  },

  getLink: (location?: Link): Link | null => {
    const _link = Repo.removeItem(DEEP_LINK)
    return _link && (!location || !LocationHelper.linkEquals(location, _link))
      ? _link
      : null
  },
}

export default LocationHelper
