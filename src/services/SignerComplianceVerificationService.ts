import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import Config from './Config'
import { successResponse } from './__mocks__/SignerComplianceVerification'

class SignerComplianceVerificationService extends CoreAPI {
  /* get my profile */
  public async getSignerComplianceVerification(id: string) {
    if (Config.mockAPI) {
      return successResponse
    }
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(`/signers/${id}/compliance-verifications`)
  }
}

export default new SignerComplianceVerificationService()
