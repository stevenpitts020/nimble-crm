import AuthService from './AuthService'
import CoreAPI from './CoreAPI'

class FileAnalysisService extends CoreAPI {
  public async financialStatement(fileId: string) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.getRequest(
      `/files/${fileId}/analysis?processor=table/financial-statement`
    )
  }
}

export default new FileAnalysisService()
