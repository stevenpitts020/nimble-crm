import AuthService from './AuthService'
import CoreAPI from './CoreAPI'
import { INotificationCreate } from '../store'

class NotificationService extends CoreAPI {
  public async notify(notification: INotificationCreate) {
    this.setAuthenticationHeader(AuthService.getAccessToken()!)
    return await this.postRequest('/notifications', notification)
  }
}

export default new NotificationService()
