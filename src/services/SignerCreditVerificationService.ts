import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import Config from './Config'
import { successResponse } from './__mocks__/SignerCreditVerification'

class SignerIdentityVerificationsService extends CoreAPI {
  /**
   * Get Signer credit verification by Id
   *
   * @param signerId
   */
  public async getCreditVerification(signerId: string) {
    if (Config.mockAPI) {
      return [successResponse]
    }

    this.setAuthenticationHeader(AuthService.getAccessToken()!)

    return await this.getRequest(`/signers/${signerId}/credit-reports?limit=1`)
  }
}

export default new SignerIdentityVerificationsService()
