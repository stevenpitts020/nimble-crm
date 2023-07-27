export const successResponse = {
  id: 'singular',
  name: 'Singular',
  domain: 'wearesingular.com',
  backgroundImageUri: {
    default: 'http://wearesingular.com/img/intro-bg.jpg',
  },
  logoUri: {
    default: 'https://wearesingular.com/img/apple-touch-icon.png',
  },
  templateApprove:
    '{accountNumber} {amount} {routingNumber} {bankName} {name} {product} {employee}',
  templateDecline: '{bankName} {name} {product} {employee}',
}

export const invalidResponse = {
  statusCode: 401,
  message: 'Request failed with status code 401',
}
