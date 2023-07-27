import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import { IDocumentRequest } from "../store";

class WorkflowService extends CoreAPI {
  public async start(name: string, event: any) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.postRequest(`/workflows/${name}`, event)
  }

  public async startDocumentRequest(req: IDocumentRequest) {
    return await this.start('document-request', req)
  }

  public async run(runId: string) {
    return await this.getRequest(`/workflow-runs/${runId}`)
  }
}

export default new WorkflowService()
