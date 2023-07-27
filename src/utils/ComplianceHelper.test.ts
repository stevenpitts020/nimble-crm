import { realWorldCaseMock } from '../services/__mocks__/SignerComplianceVerification'
import ComplianceHelper from './ComplianceHelper'

describe('ComplianceHelper', () => {
  describe('groupItemsBySourceAndDate', () => {
    const item = realWorldCaseMock[0].results[0]

    test('should group by date', () => {
      const listEntries = item.sanctions

      const result = ComplianceHelper.groupItemsBySourceAndDate(listEntries)

      expect(Object.keys(result.active).length).toEqual(4)
      expect(Object.keys(result.active)[0]).toEqual(
        'Malta Financial Services Authority (MFSA) National Sanctions'
      )

      expect(Object.keys(result.inactive).length).toEqual(6)
      expect(Object.keys(result.inactive)[0]).toEqual(
        'France Tresor Direction Generale Liste Unique de Gels'
      )
    })
  })

  describe('itemSizeBySourceAndDate', () => {
    const item = realWorldCaseMock[0].results[0]

    test('should return correct sanctions size', () => {
      const listEntries = item.sanctions

      const result = ComplianceHelper.groupItemsBySourceAndDate(listEntries)

      const size = ComplianceHelper.itemSizeBySourceAndDate(result)
      expect(size).toEqual(10)
    })

    test('should return correct warnings size', () => {
      const listEntries = item.warnings

      const result = ComplianceHelper.groupItemsBySourceAndDate(listEntries)

      const size = ComplianceHelper.itemSizeBySourceAndDate(result)
      expect(size).toEqual(0)
    })

    test('should return correct political exposure size', () => {
      const listEntries = item.politicalExposure

      const result = ComplianceHelper.groupItemsBySourceAndDate(listEntries)

      const size = ComplianceHelper.itemSizeBySourceAndDate(result)
      expect(size).toEqual(1)
    })

    test('should return correct size when empty', () => {
      const result = { active: {}, inactive: {} }
      const size = ComplianceHelper.itemSizeBySourceAndDate(result)
      expect(size).toEqual(0)
    })
  })
})
