import CountryCodes from './CountryCodes'

const getMapKeyValue = (obj: any, key: string) => {
  if (obj.hasOwnProperty(key)) {
    return obj[key]
  }
}

/**
 * This file contains basic helper to get country codes or country names
 *
 * Use it to DRY your code. Peace.
 * ex: CountryHelper.nameFromISOCode('PT');
 */
const CountryHelper = {
  nameFromISOCode: (code: string | null) => {
    if (code === null) {
      return null
    }
    return getMapKeyValue(CountryCodes, code) || null
  },
}
export default CountryHelper
