import CountryHelper from './CountryHelper'

describe('CountryHelper', () => {
  test('should return text', () => {
    const code = 'PT'
    const result = CountryHelper.nameFromISOCode(code)
    expect(result).toEqual('Portugal')
  })

  test('should return text', () => {
    const code = 'PTT'
    const result = CountryHelper.nameFromISOCode(code)
    expect(result).toEqual(null)
  })
})
