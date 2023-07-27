import nock from 'nock'
import axios from 'axios'
import service from './SignerCreditVerificationService'
import * as mocks from './__mocks__/SignerCreditVerification'
import Config from './Config'

describe('SignerCreditVerificationsService', () => {
  const signerId = '8f862362-d703-4228-b4e7-2681721fee42'
  axios.defaults.adapter = require('axios/lib/adapters/http')

  describe('Signer identity verifications', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a list of verifications', async () => {
      const mockedResponse = mocks.successResponse
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/signers/${signerId}/credit-reports?limit=1`)
        .reply(200, mockedResponse)

      const result = await service.getCreditVerification(signerId)
      expect(result).toEqual(mockedResponse)
      scope.done()
    })
  })
})
