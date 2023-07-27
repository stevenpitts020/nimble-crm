import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import Config from './Config'
import { successResponse } from './__mocks__/SignerCreditVerification'

class SignerEmailVerificationService extends CoreAPI {
  /**
   * Send Signer Email Verification by Id
   *
   * @param signerId
   */
  public async sendEmailVerification(signerId: string) {
    if (Config.mockAPI) {
      return [successResponse]
    }

    this.setAuthenticationHeader(AuthService.getAccessToken()!)

    return await this.postRequest(
      `/signers/${signerId}/email-verifications`,
      {}
    )
  }
}

export default new SignerEmailVerificationService()
