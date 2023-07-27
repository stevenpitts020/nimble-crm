import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
class SignerIdentityVerificationsService extends CoreAPI {
  /**
   * Get Signer identity verification by Id
   *
   * @param signerId
   */
  public async getIdentityVerification(signerId: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)

    return await this.getRequest(`/signers/${signerId}/identity-verifications`)
  }
}

export default new SignerIdentityVerificationsService()
