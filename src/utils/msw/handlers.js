// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import { rest } from 'msw' // msw supports graphql too!
import _ from 'lodash'
import {
  successResponse,
  invalidResponse,
} from '../../services/__mocks__/Institution'
import { successResponse as authSuccessResponse } from '../../services/__mocks__/Auth'
import {
  successCountResponse,
  bsaRiskResultsMock,
  successResponseMultiple,
  successResponseApproved,
  successResponsePending,
} from '../../services/__mocks__/AccountRequest'
import { complianceVerificationItemMock } from '../../services/__mocks__/SignerComplianceVerification'
import { successIdentityVerificationResponse } from '../../services/__mocks__/SignerIdentityVerifications'
import { successResponse as branches } from '../../services/__mocks__/InstitutionBranches'
import Config from '../../services/Config'

const apiURL = Config.coreAPI

const handlers = [
  rest.get(`${apiURL}/institutions/:institutionId`, async (req, res, ctx) => {
    const { institutionId } = req.params
    if (institutionId === 'somedomain.com') {
      return res(ctx.status(404), ctx.json(invalidResponse))
    }
    return res(ctx.json(successResponse))
  }),
  rest.post(`${apiURL}/auth/login`, async (req, res, ctx) => {
    return ctx.json(authSuccessResponse)
  }),
  rest.post(`${apiURL}/auth/magic-link`, async (req, res, ctx) => {
    return ctx.json(_.merge(
      authSuccessResponse,
      {
        type: 'MAGIC_LINK',
        message: 'Login-link sent to [test@wmail.com].'
      }
    ))
  }),
  rest.get(`${apiURL}/account-requests/count`, async (req, res, ctx) => {
    return res(ctx.json(successCountResponse))
  }),
  rest.get(
    `${apiURL}/account-requests/:signerId/bsa-risk-results`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(bsaRiskResultsMock))
    }
  ),
  rest.get(
    `${apiURL}/account-requests?limit=10&offset=0&sort=-createdAt`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(successResponseMultiple))
    }
  ),
  rest.get(
    `${apiURL}/institutions/:institutionId/branches`,
    async (req, res, ctx) => {
      return res(ctx.json(branches))
    }
  ),
  rest.get(`${apiURL}/account-requests/:signerId`, async (req, res, ctx) => {
    const { signerId } = req.params
    if (signerId === '86342423dcf685-f1d6-46ed-810f-96dc298f74e1') {
      return res(ctx.status(200), ctx.json(successResponsePending))
    }
    return res(ctx.status(200), ctx.json(successResponseApproved))
  }),
  rest.get(
    `${apiURL}/signers/:signerId/compliance-verifications`,
    async (req, res, ctx) => {
      return res(ctx.json(complianceVerificationItemMock))
    }
  ),
  rest.get(
    `${apiURL}/signers/:signerId/identity-verifications`,
    async (req, res, ctx) => {
      return res(ctx.json(successIdentityVerificationResponse))
    }
  ),
]

export { handlers }
