import nock from 'nock'
import axios from 'axios'
import service from './AccountRequestService'
import * as mocks from './__mocks__/AccountRequest'
import Config from './Config'

// this makes actual api call
describe('AccountRequestService', () => {
  // we need this for nock to mock axios
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  describe('listAccountRequests', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a list', async () => {
      const params = '?status=!DRAFT'
      const mockedResponse = [mocks.successResponseApproved]
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/account-requests${params}`)
        .reply(200, mockedResponse)

      const result = await service.listAccountRequests()

      expect(result.length).toEqual(mockedResponse.length)
      expect(result[0].id).toEqual(mockedResponse[0].id)
      scope.done()
    })

    it('should pass params', async () => {
      const params = '?sort=createdAt&offset=1&limit=2&status=!DRAFT'
      const mockedResponse = [mocks.successResponseApproved]
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/account-requests${params}`)
        .reply(200, mockedResponse)

      const result = await service.listAccountRequests({
        sort: 'createdAt',
        offset: 1,
        limit: 2,
      })

      expect(result.length).toEqual(mockedResponse.length)
      expect(result[0].id).toEqual(mockedResponse[0].id)
      scope.done()
    })

    it('should return 404 if not found', async () => {
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/account-requests?status=!DRAFT`)
        .reply(400, mocks.invalidResponse)

      try {
        await service.listAccountRequests()
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
      }

      scope.done()
    })
  })

  describe('countAccountRequests', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a count', async () => {
      const mockedResponse = mocks.successCountResponse
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/account-requests/count`)
        .reply(200, mockedResponse)

      const result = await service.countAccountRequests()

      expect(result.count).toEqual(mockedResponse.count)
      scope.done()
    })
  })

  describe('getAccountRequest', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a request', async () => {
      const params = 'xpto'
      const mockedResponse = mocks.successResponseApproved
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/account-requests/${params}`)
        .reply(200, mockedResponse)

      const result = await service.getAccountRequest(params)

      expect(result.id).toEqual(mockedResponse.id)
      scope.done()
    })

    it('should return 404 if not found', async () => {
      const params = 'xpto'
      const mockedResponse = mocks.invalidResponse
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/account-requests/${params}`)
        .reply(400, mockedResponse)

      try {
        await service.getAccountRequest(params)
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
      }

      scope.done()
    })
  })

  describe('updateAccountRequest', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return 200 if ok', async () => {
      const params = {
        status: 'ACCEPTED',
        statusEmailSubject: 'hi',
        statusEmailBody: 'I am Dave',
      }
      const mockedResponse = mocks.successResponseApproved
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .put(`/account-requests/xpto`, params)
        .reply(200, mockedResponse)

      const result = await service.updateAccountRequest('xpto', params)

      expect(result).toEqual(mockedResponse)
      scope.done()
    })

    it('should return 401 if invalid', async () => {
      const params = {
        status: 'OHOHO',
        statusEmailSubject: 'hi',
        statusEmailBody: 'I am Dave',
      }
      const mockedResponse = mocks.invalidResponse
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .put(`/account-requests/xpto`, params)
        .reply(401, mockedResponse)

      try {
        await service.updateAccountRequest('xpto', params)
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
      }
      scope.done()
    })
  })
})
