import nock from 'nock'
import axios from 'axios'
import service from './SignerIdentityVerificationsService'
import * as mocks from './__mocks__/SignerIdentityVerifications'
import Config from './Config'

describe('SignerIdentityVerificationsService', () => {
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
      const mockedResponse = mocks.successIdentityVerificationResponse
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/signers/${signerId}/identity-verifications`)
        .reply(200, mockedResponse)

      const result = await service.getIdentityVerification(signerId)
      expect(result).toEqual(mockedResponse)
      scope.done()
    })
  })
})
