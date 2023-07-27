import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import Config from './Config'
import { successResponse } from './__mocks__/Profile'

/* Logic for Getting Profile */
class ProfileService extends CoreAPI {
  /* get my profile */
  public async getMe() {
    if (Config.mockAPI) {
      return successResponse
    }
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/me/')
  }

  /* get a list of referrer profiles */
  public async referrers(options?: {
    limit?: number
    offset?: number
    sort?: string
  }) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/referrers/', options)
  }
}

export default new ProfileService()
