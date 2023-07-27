import nock from 'nock'
import axios from 'axios'
import service from './InstitutionBranchesService'
import * as mocks from './__mocks__/InstitutionBranches'
import Config from './Config'

describe('InstitutionBranchesService', () => {
  const institutionId = '8f862362-d703-4228-b4e7-2681721fee42'
  axios.defaults.adapter = require('axios/lib/adapters/http')

  describe('Institution Branches', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should return a list of branches', async () => {
      const mockedResponse = mocks.successResponse
      const scope = nock(`${Config.coreAPI}`)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/institutions/${institutionId}/branches`)
        .reply(200, mockedResponse)

      const result = await service.getInstitutionBranches(institutionId)
      expect(result).toEqual(mockedResponse)
      scope.done()
    })
  })
})
