import nock from 'nock'
import axios from 'axios'
import service from './ProfileService'
import * as mocks from './__mocks__/Profile'
import Config from './Config'
import Repo from './Repo'

// this makes actual api call
describe('ProfileService', () => {
  // we need this for nock to mock axios
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  describe('login', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should be able get my profile', async () => {
      Repo.setItem('access_token', 'test')

      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/me/')
        .reply(200, mocks.successResponse)

      const result = await service.getMe()

      expect(result.email).toEqual(mocks.successResponse.email)
      expect(result.id).toEqual(mocks.successResponse.id)
      scope.done()
    })

    it('should not get profile without token', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/me/')
        .reply(401, mocks.invalidResponse)

      try {
        await service.getMe()
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
        expect(error.token).toEqual(undefined)
      }

      scope.done()
    })
  })
})
