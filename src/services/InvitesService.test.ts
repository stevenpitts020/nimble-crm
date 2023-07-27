import nock from 'nock'
import axios from 'axios'
import service from './InvitesService'
import * as mocks from './__mocks__/Invites'
import Config from './Config'

describe('InvitesService', () => {
  const signerId = '8f862362-d703-4228-b4e7-2681721fee42'
  axios.defaults.adapter = require('axios/lib/adapters/http')

  describe('resend invites', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return ok if signer id is present', async () => {
      const mockedResponse = mocks.successResponse
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post(`/signers/${signerId}/invites`)
        .reply(200, mockedResponse)

      const result = await service.resendInvite(signerId)

      expect(result).toEqual(mockedResponse)
      scope.done()
    })

    it('should return 404 if signer is not found', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post(`/signers/${signerId}/invites`)
        .reply(404, mocks.invalidResponse)

      try {
        await service.resendInvite(signerId)
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
      }
      scope.done()
    })
  })
})
