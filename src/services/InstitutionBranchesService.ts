import { IInstitutionBranchUpdate } from '../store'
import AuthService from './AuthService'
import CoreAPI from './CoreAPI'

class InstitutionBranchesService extends CoreAPI {
  /**
   * Get Institution Branches by Id
   *
   * @param institutionId
   */
  public async getInstitutionBranches(institutionId: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)

    return await this.getRequest(`/institutions/${institutionId}/branches`)
  }

  public async findAll(options?: {
    limit?: number
    offset?: number
    sort?: string
  }) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/branches', options)
  }

  public async count(search: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(`/branches/count?search=${search}`)
  }

  public async update(institutionBranch: IInstitutionBranchUpdate) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.patch(
      '/branches/' + institutionBranch.id,
      institutionBranch
    )
  }
}

export default new InstitutionBranchesService()
