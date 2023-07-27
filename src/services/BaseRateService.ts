import CoreAPI from './CoreAPI'

/* Logic to retive base rate */
class BaseRateService extends CoreAPI {
  public async getBaseRate() {
    return await this.getExternal(
      'https://3zuurgu591.execute-api.us-east-2.amazonaws.com/Public'
    )
  }
}

export default new BaseRateService()
