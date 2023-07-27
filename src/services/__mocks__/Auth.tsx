export const successResponse = {
  type: 'MAGIC_LINK',
  message: 'Login-link sent to [test@wmail.com].',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsImVtYWlsIjoiZGVtb3VzZXJAbmltYmxlZmkuY29tIiwiYXQiOjE1NzcxMDkwMjg1NDR9.tirQRQKltyi0ysCvfY9tn702ZYM7WBzDuRdq-13G5fLE95KJ7EkPIq95yAm6ty-9hbei6IKainh_1QZJVVypvw',
}
export const invalidResponse = {
  statusCode: 401,
  message: 'No authorization!',
}
export const errorResponse = {
  statusCode: 400,
  message:
    'The minimal required parameters for this endpoint were not met. "password" is not allowed to be empty',
}

export const recoverPassSuccess = {
  statusCode: 204,
  message: '',
}

export const recoverPassNotFound = {
  statusCode: 404,
  message: 'Could not find an user with that email.',
}

export const recoverPassIsExpired = {
  statusCode: 404,
  message: 'Could not change your password. please request a new code.',
}

export const passwordChangedSuccess = {
  id: 6,
  email: 'vlad@wearesingular.com',
  firstName: 'Vladislav',
  lastName: 'Sorokin',
  gender: 'male',
  createdAt: '2020-04-17T15:34:25.165Z',
  institution: {
    id: 'centralbankonline',
    name: 'Central Bank',
    domain: 'centralbankonline.com',
    logoUri: {
      default:
        'https://nimble-assets-dev.s3.us-east-2.amazonaws.com/logo/76ea47f7-0335-4f21-b8a4-6f6ec01ee767.png',
    },
    backgroundImageUri: {
      default:
        'https://nimble-assets-dev.s3.us-east-2.amazonaws.com/background/46245139-d5fb-4767-8a26-049bb8437a54.png',
    },
  },
  accounts: [
    {
      strategy: 'local',
      remoteId: null,
      createdAt: '2020-04-17T15:34:25.178Z',
    },
  ],
}
