import { extractDomain } from './ExtractDomain'

describe('extractHostname ', () => {
  test('should return domain', () => {
    const domain = extractDomain('test@wearesingular.com')
    expect(domain).toEqual('wearesingular.com')
  })

  test.skip('should return TOP domain in email', () => {
    const domain = extractDomain('test@something.wearesingular.com')
    expect(domain).toEqual('wearesingular.com')
  })

  test('should return null if not found', () => {
    const domain = extractDomain('co.uk')
    expect(domain).toEqual('')
  })

  test('should return empty string if empty', () => {
    const domain = extractDomain('')
    expect(domain).toEqual('')
  })
})
