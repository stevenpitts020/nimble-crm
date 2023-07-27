import nock from 'nock'
import axios from 'axios'
import service from './AuthRecoverService'
import Config from './Config'
import * as mocks from './__mocks__/Auth'

describe('AuthRecoverService', () => {
  describe('requestResetPasswordLink', () => {
    // we need this for nock to mock axios
    // tslint:disable-next-line: no-var-requires
    axios.defaults.adapter = require('axios/lib/adapters/http')
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should post correctly', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post(/auth/)
        .reply(204, mocks.recoverPassSuccess)

      const result = await service.requestResetPasswordLink(
        'test@centralbankonline.com'
      )

      expect(result.message).toEqual('')
      scope.done()
    })

    it('should return 404 if missing', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post(/auth/)
        .reply(404, mocks.recoverPassNotFound)

      try {
        await service.requestResetPasswordLink('missing@centralbankonline.com')
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
      }

      scope.done()
    })
  })
})
