import CoreAPI from './CoreAPI'
import {
  IInstitutionUpdate,
  IProductOptionsConfigurationUpdate,
} from '../store/index'
import AuthService from './AuthService'

/* Logic for Institution */
class InstitutionService extends CoreAPI {
  /* get institution by domain */
  public async getInstitution(domain: string) {
    if (domain === null || domain === '') {
      throw new Error('Domain is missing.')
    }

    return await this.getRequest(`/institutions/${domain}`)
  }

  public async findAll(options?: {
    limit?: number
    offset?: number
    sort?: string
  }) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/institutions', options)
  }

  public async count(search: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(`/institutions/count?search=${search}`)
  }

  public async update(institution: IInstitutionUpdate) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.patch('/institutions/' + institution.id, institution)
  }

  public async getProducts(id: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(`/institutions/${id}/products`)
  }

  public async updateProductOptions(
    product: IProductOptionsConfigurationUpdate
  ) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.patch(
      `/institutions/${product.parentId}/products/${product.id}`,
      product
    )
  }
}

export default new InstitutionService()
