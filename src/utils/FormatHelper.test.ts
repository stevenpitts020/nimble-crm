import FormatHelper from './FormatHelper'
import { successResponseApproved } from '../services/__mocks__/AccountRequest'

describe('FormatHelper', () => {
  describe('currency', () => {
    test('should return formatted currency', () => {
      const result = FormatHelper.currency(300000)
      expect(result).toEqual('$300,000.00')
    })
  })

  describe('dateTimeFormat', () => {
    test('should return formatted date', () => {
      const datetime = '2019-12-23T15:32:45.397Z'
      const result = FormatHelper.dateTimeFormat(datetime)

      expect(result).toEqual('12/23/2019 03:32 pm')
    })

    test('should return formatted date with divider', () => {
      const datetime = '2019-12-23T15:32:45.397Z'
      const result = FormatHelper.dateTimeFormat(datetime, '-')

      expect(result).toEqual('12-23-2019 03:32 pm')
    })
  })

  describe('dateFormat', () => {
    test('should return formatted date', () => {
      const result = FormatHelper.dateFormat(new Date('1982-12-10'))

      expect(result).toEqual('12/10/1982')
    })

    test('should return formatted date with divider', () => {
      const result = FormatHelper.dateFormat(new Date('1982-12-10'), '-')

      expect(result).toEqual('12-10-1982')
    })
  })

  describe('dateFormatExtended', () => {
    test('should return formatted date', () => {
      const result = FormatHelper.dateFormatExtended(new Date('1982-12-10'))

      expect(result).toEqual('Dec 10, 1982')
    })
  })

  describe('durationFormat', () => {
    test('should return formatted duration', () => {
      const result = FormatHelper.durationFormat('12:55')

      expect(result).toEqual('12h 55min')
    })

    test('should return only minutes', () => {
      const result = FormatHelper.durationFormat('15')

      expect(result).toEqual('0min')
    })
  })

  describe('fromNow', () => {
    test('should return formatted date', () => {
      const result = FormatHelper.fromNow(new Date('1982-12-10'))

      expect(result).toEqual('12/10/1982')
    })

    test('should return from now if < 7 days', () => {
      const result = FormatHelper.fromNow(new Date())

      expect(result).toEqual('a few seconds ago')
    })
  })

  describe('signerFullName', () => {
    test('should return Pending if all null', () => {
      const result = FormatHelper.signerFullName({
        firstName: null,
        middleName: null,
        lastName: null,
      })

      expect(result).toEqual('Pending')
    })

    test('should return first name', () => {
      const result = FormatHelper.signerFullName({
        firstName: 'John',
        middleName: null,
        lastName: null,
      })

      expect(result).toEqual('John')
    })

    test('should return first and last name', () => {
      const result = FormatHelper.signerFullName({
        firstName: 'John',
        middleName: null,
        lastName: 'Cena',
      })

      expect(result).toEqual('John Cena')
    })

    test('should return full name', () => {
      const signer = successResponseApproved.signers[0]

      const result = FormatHelper.signerFullName(signer)

      expect(result).toEqual('Han James Solo')
    })

    test('should return the name of the second signer', () => {
      const signer = successResponseApproved.signers[1]

      const result = FormatHelper.signerFullName(signer)

      expect(result).toEqual('Mark James Brown')
    })

    test('should return empty if undefined', () => {
      const result = FormatHelper.signerFullName(undefined)

      expect(result).toEqual('')
    })
  })

  describe('firstSignerFullName', () => {
    test('should return first name', () => {
      const result = FormatHelper.firstSignerFullName([
        {
          firstName: null,
          middleName: null,
          lastName: null,
          invitedAt: '2019-12-23T15:32:46.397Z',
        },
        {
          firstName: 'John',
          middleName: null,
          lastName: null,
          invitedAt: '2019-12-23T15:32:45.397Z',
        },
      ])

      expect(result).toEqual('John')
    })

    test('should return first and last name', () => {
      const result = FormatHelper.firstSignerFullName([
        {
          firstName: null,
          middleName: null,
          lastName: null,
          invitedAt: '2019-12-23T15:32:46.397Z',
        },
        {
          firstName: 'John',
          middleName: null,
          lastName: 'Cena',
          invitedAt: '2019-12-23T15:32:45.397Z',
        },
      ])

      expect(result).toEqual('John Cena')
    })

    test('should return full name', () => {
      const signers = successResponseApproved.signers

      const result = FormatHelper.firstSignerFullName(signers)

      expect(result).toEqual('Han James Solo')
    })

    test('should return first invited if empty', () => {
      const signers = successResponseApproved.signers

      const result = FormatHelper.firstSignerFullName(signers)

      expect(result).toEqual('Han James Solo')
    })

    test('should return empty if undefined', () => {
      const result = FormatHelper.firstSignerFullName(undefined)

      expect(result).toEqual('')
    })
  })

  describe('identificationResults', () => {
    test('should return false if empty', () => {
      const result = FormatHelper.identificationResults({})

      expect(result).toEqual({ matchDocument: false, matchFace: false })
    })

    test('should return false if undefined', () => {
      const result = FormatHelper.identificationResults(undefined)

      expect(result).toEqual({ matchDocument: false, matchFace: false })
    })

    test('should return false if null', () => {
      const result = FormatHelper.identificationResults(null)

      expect(result).toEqual({ matchDocument: false, matchFace: false })
    })

    test('should return formated results', () => {
      const signer = successResponseApproved.signers[1]

      const result = FormatHelper.identificationResults(
        signer.identityVerificationResult
      )

      expect(result).toEqual({ matchDocument: false, matchFace: false })
    })

    test('should return formated results if match', () => {
      const signer = successResponseApproved.signers[0]

      const result = FormatHelper.identificationResults(
        signer.identityVerificationResult
      )

      expect(result).toEqual({ matchDocument: false, matchFace: false })
    })
  })

  describe('isEmpty', () => {
    test('should return true if null', () => {
      const result = FormatHelper.isEmpty(null)

      expect(result).toEqual(true)
    })
    test('should return true if {}', () => {
      const result = FormatHelper.isEmpty({})

      expect(result).toEqual(true)
    })
    test('should return true if new Set()', () => {
      const result = FormatHelper.isEmpty(new Set())

      expect(result).toEqual(true)
    })
    test('should return true if Object.create(null)', () => {
      const result = FormatHelper.isEmpty(Object.create(null))

      expect(result).toEqual(true)
    })
    test('should return true if "" ', () => {
      const result = FormatHelper.isEmpty('')

      expect(result).toEqual(true)
    })
    test('should return false if empty block ', () => {
      // tslint:disable-next-line: no-empty
      const result = FormatHelper.isEmpty(() => {})

      expect(result).toEqual(false)
    })
    test('should return false if using a string', () => {
      // tslint:disable-next-line: no-empty
      const result = FormatHelper.isEmpty('hello')

      expect(result).toEqual(false)
    })
    test('should return false if using an array', () => {
      // tslint:disable-next-line: no-empty
      const result = FormatHelper.isEmpty([1, 2, 3])

      expect(result).toEqual(false)
    })
    test('should return false if 0', () => {
      const result = FormatHelper.isEmpty(0)

      expect(result).toEqual(false)
    })
  })

  describe('getStateName', () => {
    test('should return null if null arg', () => {
      const result = FormatHelper.getStateName(null)

      expect(result).toEqual(null)
    })
    test('should return full state name', () => {
      const result = FormatHelper.getStateName('FL')

      expect(result).toEqual('Florida')
    })
    test('should return full state name with lowercase arg', () => {
      const result = FormatHelper.getStateName('fl')

      expect(result).toEqual('Florida')
    })
    test('should return null if it cant find', () => {
      const result = FormatHelper.getStateName('WHAT')

      expect(result).toEqual(null)
    })
  })

  describe('comply advantage checks', () => {
    test('should return checks if they are present in signer object name', () => {
      const signer = successResponseApproved.signers[0]

      const result = FormatHelper.complyAdvantageResults(signer)

      expect(result.checkSanction).toEqual(signer.checkSanction)
      expect(result.sanctionVerifiedAt).toEqual(signer.sanctionVerifiedAt)
      expect(result.checkPoliticalExposure).toEqual(
        signer.checkPoliticalExposure
      )
      expect(result.politicalExposureVerifiedAt).toEqual(
        signer.politicalExposureVerifiedAt
      )
      expect(result.checkAdverseMedia).toEqual(signer.checkAdverseMedia)
      expect(result.adverseMediaVerifiedAt).toEqual(
        signer.adverseMediaVerifiedAt
      )
      expect(result.checkAntiMoneyLaundering).toEqual(
        signer.checkAntiMoneyLaundering
      )
      expect(result.antiMoneyLaunderingVerifiedAt).toEqual(
        signer.antiMoneyLaunderingVerifiedAt
      )
    })

    test('should return null if there is no comply fields in signer ', () => {
      const signer = successResponseApproved.signers[2]
      const result = FormatHelper.complyAdvantageResults(signer)
      expect(result.checkSanction).toBeNull()
      expect(result.sanctionVerifiedAt).toBeNull()
      expect(result.checkPoliticalExposure).toBeNull()
      expect(result.politicalExposureVerifiedAt).toBeNull()
      expect(result.checkAdverseMedia).toBeNull()
      expect(result.adverseMediaVerifiedAt).toBeNull()
      expect(result.checkAntiMoneyLaundering).toBeNull()
      expect(result.antiMoneyLaunderingVerifiedAt).toBeNull()
    })

    test('should return null if all comply fields are null in signer', () => {
      const signer = successResponseApproved.signers[3]
      const result = FormatHelper.complyAdvantageResults(signer)
      expect(result.checkSanction).toBeNull()
      expect(result.sanctionVerifiedAt).toBeNull()
      expect(result.checkPoliticalExposure).toBeNull()
      expect(result.politicalExposureVerifiedAt).toBeNull()
      expect(result.checkAdverseMedia).toBeNull()
      expect(result.adverseMediaVerifiedAt).toBeNull()
      expect(result.checkAntiMoneyLaundering).toBeNull()
      expect(result.antiMoneyLaunderingVerifiedAt).toBeNull()
    })
  })
  describe('getScoreRangeName', () => {
    test('should return a range name exceptional', () => {
      const val = 800
      const result = FormatHelper.getScoreRangeName(val)
      expect(result).toEqual('exceptional')
    })
    test('should return a range name very-good', () => {
      const val = 740
      const result = FormatHelper.getScoreRangeName(val)
      expect(result).toEqual('very-good')
    })
    test('should return a range name good', () => {
      const val = 739
      const result = FormatHelper.getScoreRangeName(val)
      expect(result).toEqual('good')
    })
    test('should return a range name fair', () => {
      const val = 581
      const result = FormatHelper.getScoreRangeName(val)
      expect(result).toEqual('fair')
    })
    test('should return a range name very-poor', () => {
      const val = 0
      const result = FormatHelper.getScoreRangeName(val)
      expect(result).toEqual('very-poor')
    })
    test('should return processing if not a valid number', () => {
      const val = undefined
      const result = FormatHelper.getScoreRangeName(val)
      expect(result).toEqual('processing')
    })
    test('should return empty if out of range positive', () => {
      const val = 9000
      const result = FormatHelper.getScoreRangeName(val)
      expect(result).toEqual('')
    })
    test('should return empty if out of range negative', () => {
      const val = -2
      const result = FormatHelper.getScoreRangeName(val)
      expect(result).toEqual('')
    })
  })
})
