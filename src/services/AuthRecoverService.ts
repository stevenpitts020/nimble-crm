import { AxiosError } from 'axios'
import CoreAPI from './CoreAPI'

/* Logic for authentication */
class AuthRecoverService extends CoreAPI {
  /**
   * Login in the api
   * @param email - user email
   * @param password - user password
   */
  public async requestResetPasswordLink(email: string) {
    const userData = await this.postRequest('/auth/recover/' + email, {})
    return userData
  }

  public async changePassword(email: string, password: string, code: string) {
    const userData = await this.putRequest('/auth/recover/' + email, {
      password,
      code,
    })
    return userData
  }

  /**
   * Return a single error message
   *
   * @param error - axios error
   */
  public prettyErrorMessage(error: AxiosError) {
    if (error.response) {
      let message = ''
      switch (error.response.status) {
        case 500:
          message =
            'There was a temporary problem on the Nimble service. Please check back later.'
          break
        default:
          break
      }
      // Request made and server responded
      return message
    } else if (error.request) {
      // The request was made but no response was received
      return 'Cannot connect to the Nimble Service. Please check your connection.'
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message
    }
  }
}

export default new AuthRecoverService()
