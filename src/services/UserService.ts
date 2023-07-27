import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import { IUserCreate, IUserUpdate } from '../store'

class UserService extends CoreAPI {
  public async findAll(options?: {
    limit?: number
    offset?: number
    sort?: string
  }) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/user-accounts', options)
  }

  public async findOne(id: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/user-accounts/' + id)
  }

  public async update(user: IUserUpdate) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.patch('/user-accounts/' + user.id, user)
  }

  public async create(user: IUserCreate) {
    return await this.postRequest('/user-accounts', user)
  }

  public async count(search: string, branch: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(
      `/user-accounts/count?search=${search}&branch=${branch}`
    )
  }
}

export default new UserService()
