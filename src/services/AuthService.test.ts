import nock from 'nock'
import axios from 'axios'
import service from './AuthService'
import Config from './Config'
import * as mocks from './__mocks__/Auth'
import Repo from './Repo'

// we need this for nock to mock axios
// tslint:disable-next-line: no-var-requires
axios.defaults.adapter = require('axios/lib/adapters/http')

// this makes actual api call
describe('AuthService', () => {
  describe('login', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should be able to authenticate with valid login', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/magic-link')
        .reply(200, mocks.successResponse)

      const result = await service.login('teste@we.pt', 'teste')

      expect(result.token).toEqual(mocks.successResponse.token)
      scope.done()
    })

    it('should not authenticate with invalid data', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/magic-link')
        .reply(401, mocks.invalidResponse)

      try {
        await service.login('teste@we.pt', 'teste')
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
        expect(error.token).toEqual(undefined)
      }

      scope.done()
    })

    it('should not authenticate if there is a error', async () => {
      const scope = nock(Config.coreAPI)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/magic-link')
        .reply(500, mocks.errorResponse)

      try {
        await service.login('teste@we.pt', '')
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
        expect(error.token).toEqual(undefined)
      }

      scope.done()
    })
  })

  describe('getAccessToken', () => {
    it('should retrieve from storage', () => {
      Repo.setItem('access_token', 'dog')

      const result = service.getAccessToken()
      expect(result).toEqual('dog')
    })

    it('should return null if no token', () => {
      Repo.removeItem('access_token')

      const result = service.getAccessToken()
      expect(result).toEqual(null)
    })
  })

  describe('saveAccessToken', () => {
    it('should save token in storage', () => {
      service.saveAccessToken('dog')

      const result = service.getAccessToken()
      expect(result).toEqual('dog')
    })
  })

  describe('removeAccessToken', () => {
    it('should remove token in storage', () => {
      service.saveAccessToken('dog')
      service.removeAccessToken()

      const result = service.getAccessToken()
      expect(result).toEqual(null)
    })
  })

  describe('errorMessage', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return 401 message', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/demo')
        .reply(401, mocks.invalidResponse)

      try {
        await service.getRequest('/demo')
      } catch (error) {
        const result = service.prettyErrorMessage(error)
        expect(result).toEqual(
          'Invalid or expired login token/password. Try again.'
        )
      }

      scope.done()
    })

    it('should return 500 message', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/demo')
        .reply(500, mocks.invalidResponse)

      try {
        await service.getRequest('/demo')
      } catch (error) {
        const result = service.prettyErrorMessage(error)
        expect(result).toEqual(
          'There was a temporary problem on the Nimble service. Please check back later.'
        )
      }

      scope.done()
    })

    it('should return message if error', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/demo')
        .reply(200, {})

      try {
        await service.getRequest('/demo')
        throw new Error('oops')
      } catch (error) {
        const result = service.prettyErrorMessage(error)
        expect(result).toEqual('oops')
      }

      scope.done()
    })
  })
})
