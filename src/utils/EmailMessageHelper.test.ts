import EmailMessageHelper from './EmailMessageHelper'

describe('EmailMessageHelper', () => {
  describe('buildAproveEmailMessage', () => {
    const mockTemplate =
      '{accountNumber}, {amount}, {routingNumber}, {bankName}, {domain}, {name}, {product}, {employee}'

    test('should return text', () => {
      const props = {
        bankName: 'Central Bank',
        bankSlug: 'centralbank.com',
        employeeName: 'Mark',
        routingNumber: 'xxx',
        amount: 2000,
        accountNumber: '000',
        fullName: 'Steve',
        productName: 'Simple Checking',
        template: mockTemplate,
      }
      const result = EmailMessageHelper.buildAproveEmailMessage(props)

      expect(result).toMatchSnapshot()
    })
  })

  describe('buildDeclineEmailMessage', () => {
    const declineTemplate =
      '{bankName}, {domain}, {name}, {product}, {employee}'
    test('should return text', () => {
      const props = {
        bankName: 'Central Bank',
        employeeName: 'Mark',
        bankSlug: 'centralbank.com',
        accountNumber: '000',
        fullName: 'Steve',
        productName: 'Simple Checking',
        template: declineTemplate,
      }
      const result = EmailMessageHelper.buildDeclineEmailMessage(props)
      expect(result).toMatchSnapshot()
    })
  })
})
