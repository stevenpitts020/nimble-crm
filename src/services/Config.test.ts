import Config from './Config'

describe('ConfigService', () => {
  it('mockAPI should return a boolean', () => {
    const result = Config.mockAPI

    expect(result).not.toBeUndefined()
    // expect(result).toBeInstanceOf(Boolean)
    expect(typeof result === 'boolean').toBe(true)
  })

  it('env should be test', () => {
    const result = Config.env

    expect(result).not.toBeUndefined()
    expect(result).toEqual('test')
  })
})
