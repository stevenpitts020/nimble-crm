import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import Config from './Config'
import { successResponse } from './__mocks__/Invites'

/* Logic for Getting Profile */
class InvitesService extends CoreAPI {
  /**
   * Resend an invite
   *
   * @param signerId - id of the signer we send an invite to
   */
  public async resendInvite(signerId: string) {
    if (Config.mockAPI) {
      return [successResponse]
    }

    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.postRequest(`/signers/${signerId}/invites`, {})
  }
}

export default new InvitesService()
