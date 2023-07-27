import axios, { AxiosError } from 'axios'
import CoreAPI from './CoreAPI'
import Config from './Config'
import Repo from './Repo'

/* Logic for authentication */
class AuthService extends CoreAPI {
  public async verifyCode(code: string) {
    const mfaCacheToken = this.getMFACacheToken()

    return await this.postRequest('/auth/verify-code', { mfaCacheToken, code })
  }

  /**
   * Login in the api
   * @param email - user email
   * @param password - user password
   */
  public async login(email: string, password: string) {
    return Config.mockAPI
      ? { token: 'mock-token' }
      : await this.postRequest(
          `/auth/${Config.allowPassword && password ? 'login' : 'magic-link'}`, // path
          { email, password, host: window?.location?.host } // credentials
        )
  }

  /**
   * Login via the api's one-time-token email endpoint
   * @param email - user email
   * @param token - a one-time-token provided via magic-link or similar mechanism
   */
  public async magicLink(email: string, token: string) {
    return Config.mockAPI
      ? { token: 'mock-token' }
      : await this.postRequest(`/auth/login/${email}`, {
          token,
          mfaCacheToken: this.getMFACacheToken(),
        })
  }

  public async setPhone(phone: string) {
    return await this.putRequest('/me', {
      phone,
    })
  }

  public async changePassword(password: string) {
    if (Config.mockAPI) {
      return {
        token: 'mock-token',
      }
    }
    const userData = await this.putRequest('/me', {
      password,
    })
    return userData
  }

  /* return the access token in storage */
  public getAccessToken(): string | null {
    return Repo.getItem('access_token')
  }

  /**
   * save access token in store
   * @param token - auth token to store
   */
  public saveAccessToken(token: string): void {
    // TODO save expires at?
    return Repo.setItem('access_token', token)
  }

  /* remove token from store */
  public removeAccessToken(): void {
    // Remove the HTTP header that include the JWT token
    delete axios.defaults.headers.common.Authorization
    // Delete the token from our session
    return Repo.removeItem('access_token')
  }

  public getMFACacheToken(): string | null {
    return Repo.getItem('mfa_cache_token')
  }

  public getMFAMaskedPhone(): string | null {
    return Repo.getItem('mfa_masked_phone')
  }

  public saveMFACacheToken(mfaCacheToken: string): void {
    return Repo.setItem('mfa_cache_token', mfaCacheToken)
  }

  public saveMFAMaskedPhone(mfaMaskedPhone: string): void {
    return Repo.setItem('mfa_masked_phone', mfaMaskedPhone)
  }

  public saveEmail(email: string): void {
    return Repo.setItem('email', email)
  }

  public getEmail(): string | null {
    return Repo.getItem('email')
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
        case 401:
          message = 'Invalid or expired login token/password. Try again.'
          break
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

export default new AuthService()
