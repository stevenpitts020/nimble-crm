import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import { ISearchData } from '../store'

class DataService extends CoreAPI {
  public async peopleSearch(query: any) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.postRequest('/data/people/search', query)
  }

  public async personSchema() {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/data/people/schema')
  }

  public async searchCreate(search: ISearchData) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.postRequest('/data/searches', search)
  }

  public async searchUpdate(search: ISearchData) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.postRequest(`/data/searches/${search.id}`, search)
  }

  public async searchList() {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest('/data/searches')
  }

  public async searchGet(id: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(`/data/searches/${id}`)
  }

  public async searchDelete(id: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.deleteRequest(`/data/searches/${id}`)
  }
}

export default new DataService()
