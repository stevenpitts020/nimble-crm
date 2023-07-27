import nock from 'nock'
import axios from 'axios'
import service from './InstitutionService'
import * as mocks from './__mocks__/Institution'
import Config from './Config'

// this makes actual api call
describe('InstitutionService', () => {
  // we need this for nock to mock axios
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  describe('getInstitution', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a institution', async () => {
      const domain = 'wearesingular.com'

      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/institutions/${domain}`)
        .reply(200, mocks.successResponse)

      const result = await service.getInstitution(domain)

      expect(result.domain).toEqual(mocks.successResponse.domain)
      expect(result.name).toEqual(mocks.successResponse.name)
      scope.done()
    })

    it('should return 404 if not found', async () => {
      const domain = 'test'
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/institutions/${domain}`)
        .reply(404, mocks.invalidResponse)

      try {
        await service.getInstitution(domain)
      } catch (error) {
        expect(error).toHaveProperty('message', error.message)
        expect(error).toHaveProperty('statusCode', error.statusCode)
        expect(error.domain).toEqual(undefined)
      }

      scope.done()
    })

    it('should throw error if domain is empty', async () => {
      const domain = ''

      try {
        await service.getInstitution(domain)
      } catch (error) {
        expect(error).toHaveProperty('message', 'Domain is missing.')
        expect(error.domain).toEqual(undefined)
      }
    })
  })
})
