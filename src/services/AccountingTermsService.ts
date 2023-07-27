import AuthService from './AuthService'
import CoreAPI from './CoreAPI'

class AccountingTermsService extends CoreAPI {
  public async categories() {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/accounting-terms')
  }

  public async term(term: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(`/accounting-terms/${term}`)
  }
}

export default new AccountingTermsService()
