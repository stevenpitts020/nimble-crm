export const successResponse = {
  id: 0,
  email: 'someuser@wearesingular.pt',
  firstName: 'John',
  lastName: 'Goodman',
  gender: 'male',
  profile: {
    birthDate: '2019-12-23T15:32:45.397Z',
    avatar: {
      default: 'string',
    },
  },
  accounts: [
    {
      strategy: 'string',
      remoteId: 'string',
      createdAt: '2019-12-23T15:32:45.397Z',
    },
  ],
  institution: {
    id: 'singular',
    name: 'Singular',
    domain: 'wearesingular.com',
    backgroundImageUri: {
      default:
        'https://nimble-assets-dev.s3.us-east-2.amazonaws.com/background/background.jpg',
    },
    logoUri: {
      default:
        'https://nimble-assets-dev.s3.us-east-2.amazonaws.com/logo/company.jpg',
    },
    templateApprove:
      '{accountNumber} {amount} {routingNumber} {bankName} {name} {product} {employee}',
    templateDecline: '{bankName} {name} {product} {employee}',
  },
  createdAt: '2019-12-23T15:32:45.397Z',
}

export const invalidResponse = {
  statusCode: 401,
  message: 'Invalid token: no JWT token found',
}
