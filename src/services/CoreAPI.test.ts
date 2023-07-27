import nock from 'nock'
import axios from 'axios'
import CoreAPI from './CoreAPI'
import * as mocks from './__mocks__/Institution'
import Config from './Config'

// this makes actual api call
describe('CoreAPI', () => {
  // we need this for nock to mock axios
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')
  const service = new CoreAPI()

  describe('errorMessage', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return message', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/demo')
        .reply(401, mocks.invalidResponse)

      try {
        await service.getRequest('/demo')
      } catch (error) {
        const result = service.errorMessage(error)
        expect(result).toEqual(error.message)
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
        const result = service.errorMessage(error)
        expect(result).toEqual('oops')
      }

      scope.done()
    })
  })

  describe('getRequest', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a response', async () => {
      const domain = 'wearesingular.com'

      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/institutions/${domain}`)
        .reply(200, mocks.successResponse)

      const result = await service.getRequest(`/institutions/${domain}`)

      expect(result.domain).toEqual(mocks.successResponse.domain)
      expect(result.name).toEqual(mocks.successResponse.name)
      scope.done()
    })
  })

  describe('postRequest', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a response', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/demo')
        .reply(200, mocks.successResponse)

      const result = await service.postRequest('/demo', { test: 123 })

      expect(result.domain).toEqual(mocks.successResponse.domain)
      expect(result.name).toEqual(mocks.successResponse.name)
      scope.done()
    })
  })

  describe('putRequest', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a response', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .put('/demo')
        .reply(200, mocks.successResponse)

      const result = await service.putRequest('/demo', { test: 123 })

      expect(result.domain).toEqual(mocks.successResponse.domain)
      expect(result.name).toEqual(mocks.successResponse.name)
      scope.done()
    })
  })
})
