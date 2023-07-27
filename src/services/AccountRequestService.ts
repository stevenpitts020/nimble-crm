import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import { IAccountRequestPatchData, IAccountRequestUpdate } from '../store'

/* Logic for Getting Profile */
class AccountRequestService extends CoreAPI {
  /**
   * Search for Account Requests
   *
   * @param options - body parameters of request
   */
  public async listAccountRequests(options?: {
    limit?: number
    offset?: number
    sort?: string
    status?: string | null
  }) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    if (!options) options = { status: '!DRAFT' }
    if (!options.status) options.status = '!DRAFT'

    return await this.getRequest('/account-requests', options)
  }

  public async countAccountRequests(filter?: string | null) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/account-requests/count', { status: filter })
  }

  /**
   * Get Account Requests
   *
   * @param options - body parameters of request
   */
  public async getAccountRequest(id: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/account-requests/' + id)
  }

  public async patchAccountRequest(
    id: string,
    params: IAccountRequestPatchData
  ) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.patch('/account-requests/' + id, params)
  }

  /**
   * update Account Requests
   *
   * @param options - body parameters of request
   */
  public async updateAccountRequest(id: string, params: IAccountRequestUpdate) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)

    return await this.putRequest('/account-requests/' + id, params)
  }

  public async getBSARiskResults(id: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(`/account-requests/${id}/bsa-risk-results`)
  }
}

export default new AccountRequestService()
