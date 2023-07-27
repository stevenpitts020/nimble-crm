import moment from 'moment'
import { SignerSchema } from '../store'

/**
 * This file contains basic format helpers to be reused in views or components
 *
 * Use it to DRY your code. Peace.
 * ex: Helpers.dateFormat(20);
 */
const FormatHelper = {
  /** formats number to currency */
  currency: (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  },

  age: (date: string) => {
    const now = moment()
    const year = moment(date, 'YYYY')
    return now.diff(year, 'years')
  },
  /** Ex: 2020 */
  dateYear: (date: string) => {
    return moment(date).format(`YYYY`)
  },
  /** Ex: 01/28/2020 */
  dateFormat: (date: Date | string, divider = '/') => {
    return moment(date).format(`MM${divider}DD${divider}YYYY`)
  },

  /** Ex: 01/28/2020 02:34 AM */
  dateTimeFormat: (date: string, divider = '/') => {
    return moment(date).format(`MM${divider}DD${divider}YYYY hh:mm a`)
  },

  /** Ex: Jan 04, 2019 */
  dateFormatExtended: (date: Date | string) => {
    return moment(date).format(`MMM DD, YYYY`)
  },

  /** Ex: Jan 04, 2020 02:34 AM */
  dateTimeFormatExtended: (
    date: string | Date | number | undefined,
    divider = '/'
  ) => {
    return date ? moment(date).format(`MMM DD, YYYY HH:mm A`) : ''
  },

  /** Ex: 3h 24min */
  durationFormat: (time: string) => {
    const date = moment.duration(time, 's')
    const hrs = date.hours()
    const mins = date.minutes()

    let ret = ''
    if (hrs > 0) {
      ret += `${hrs}h `
    }
    ret += `${mins}min`
    return ret
  },

  /** Ex: x days ago */
  fromNow: (date: Date) => {
    const momentDate = moment(date)
    const windowDate = moment().subtract(7, 'days')
    if (momentDate.isAfter(windowDate)) {
      return momentDate.fromNow()
    }
    return FormatHelper.dateFormat(date)
  },

  /** John Doe Smith | Pending */
  signerFullName: (signer?: SignerSchema) => {
    if (signer == null || FormatHelper.isEmpty(signer)) {
      return ''
    }

    const names = []
    if (signer.firstName) {
      names.push(signer.firstName)
    }
    if (signer.middleName) {
      names.push(signer.middleName)
    }
    if (signer.lastName) {
      names.push(signer.lastName)
    }

    return names.join(' ').trim() || 'Pending'
  },

  firstSignerFullName: (signers?: SignerSchema[]) => {
    if (signers == null || FormatHelper.isEmpty(signers)) {
      return ''
    }
    const signer: SignerSchema = signers.sort((a, b) => {
      return moment(a.invitedAt).isBefore(b.invitedAt) ? -1 : 1
    })[0]

    const names = []
    if (signer.firstName) {
      names.push(signer.firstName)
    }
    if (signer.middleName) {
      names.push(signer.middleName)
    }
    if (signer.lastName) {
      names.push(signer.lastName)
    }
    return names.join(' ').trim()
  },

  identificationResults: (jsonResults: any) => {
    const results = { matchDocument: false, matchFace: false }

    if (FormatHelper.isEmpty(jsonResults)) {
      return results
    }

    if (jsonResults.face === 1) {
      results.matchFace = true
    }
    if (jsonResults.document?.document === 1) {
      results.matchDocument = true
    }
    return results
  },

  isEmpty(value: any) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  },

  snakeToCamelCase(str: string): string {
    return str.replace(/([-_]\w)/g, g => ' ' + g[1].toUpperCase())
  },

  snakeToPascalCase(str: string): string {
    const camelCase = this.snakeToCamelCase(str)
    const pascalCase = camelCase[0].toUpperCase() + camelCase.substr(1)
    return pascalCase
  },

  complyAdvantageResults: (signer: SignerSchema) => {
    if (signer && signer.sanctionVerifiedAt) {
      return {
        checkSanction: signer.checkSanction,
        sanctionVerifiedAt: signer.sanctionVerifiedAt,
        checkPoliticalExposure: signer.checkPoliticalExposure,
        politicalExposureVerifiedAt: signer.politicalExposureVerifiedAt,
        checkAdverseMedia: signer.checkAdverseMedia,
        adverseMediaVerifiedAt: signer.adverseMediaVerifiedAt,
        checkAntiMoneyLaundering: signer.checkAntiMoneyLaundering,
        antiMoneyLaunderingVerifiedAt: signer.antiMoneyLaunderingVerifiedAt,
      }
    }
    return {
      checkSanction: null,
      sanctionVerifiedAt: null,
      checkPoliticalExposure: null,
      politicalExposureVerifiedAt: null,
      checkAdverseMedia: null,
      adverseMediaVerifiedAt: null,
      checkAntiMoneyLaundering: null,
      antiMoneyLaunderingVerifiedAt: null,
    }
  },

  getContractFields: (signer: SignerSchema, accountRequestStatus: string) => {
    return {
      signerStatus: signer.status,
      accountRequestStatus,
    }
  },

  getAccountRequestStatus: (status: string | null): string => {
    switch (status) {
      case null:
        return ''
      case 'INCOMPLETE':
        return 'Incomplete'
      case 'PENDING':
        return 'Waiting Signatures'
      case 'SIGNED':
        return 'Ready to Review'
      case 'APPROVED':
        return 'Approved'
      case 'DECLINED':
        return 'Declined'
      default:
        return ''
    }
  },

  getDocumentTypeName: (type: string | null): string => {
    switch (type) {
      case null:
        return ''
      case 'USDL':
        return `Driver's License`
      case 'PASSPORT':
        return 'Passport'
      default:
        return ''
    }
  },
  getCountryName: (abbr: string | null) => {
    if (abbr == null) {
      return null
    }
    const countries: {
      [key: string]: string
    } = {
      ABW: 'Aruba',
      AFG: 'Afghanistan',
      AGO: 'Angola',
      AIA: 'Anguilla',
      ALA: 'Åland Islands',
      ALB: 'Albania',
      AND: 'Andorra',
      ANT: 'Netherlands Antilles',
      ARE: 'United Arab Emirates',
      ARG: 'Argentina',
      ARM: 'Armenia',
      ASM: 'American Samoa',
      ATA: 'Antárctica',
      ATF: 'French Southern Territories',
      ATG: 'Antigua and Barbuda',
      AUS: 'Australia',
      AUT: 'Austria',
      AZE: 'Azerbaijan',
      BDI: 'Burundi',
      BEL: 'Belgium',
      BEN: 'Benin',
      BFA: 'Burkina Faso',
      BGD: 'Bangladesh',
      BGR: 'Bulgaria',
      BHR: 'Bahrain',
      BHS: 'Bahamas',
      BIH: 'Bosnia and Herzegovina',
      BLM: 'Saint Barthélemy',
      BLR: 'Belarus',
      BLZ: 'Belize',
      BMU: 'Bermuda',
      BOL: 'Bolivia',
      BRA: 'Brazil',
      BRB: 'Barbados',
      BRN: 'Brunei Darussalam',
      BTN: 'Bhutan',
      BVT: 'Bouvet Island',
      BWA: 'Botswana',
      CAF: 'Central African Republic',
      CAN: 'Canada',
      CCK: 'Cocos (Keeling) Islands',
      CHE: 'Switzerland',
      CHL: 'Chile',
      CHN: 'China',
      CIV: `Côte d'Ivoire`,
      CMR: 'Cameroon',
      COD: 'Congo, the Democratic Republic of the',
      COG: 'Republic of the Congo|Congo',
      COK: 'Cook Islands',
      COL: 'Colombia',
      COM: 'Comoros',
      CPV: 'Cape Verde',
      CRI: 'Costa Rica',
      CUB: 'Cuba',
      CUW: 'Curaçao',
      CXR: 'Christmas Island',
      CYM: 'Cayman Islands',
      CYP: 'Cyprus',
      CZE: 'Czechia',
      DEU: 'Germany',
      DJI: 'Djibouti',
      DMA: 'Dominica',
      DNK: 'Denmark',
      DOM: 'Dominican Republic',
      DZA: 'Algeria',
      ECU: 'Ecuador',
      EGY: 'Egypt',
      ERI: 'Eritrea',
      ESH: 'Western Sahara',
      ESP: 'Spain',
      EST: 'Estonia',
      ETH: 'Ethiopia',
      FIN: 'Finland',
      FJI: 'Fiji',
      FLK: 'Falkland Islands (Malvinas)',
      FRA: 'France',
      FRO: 'Faroe Islands',
      FSM: 'Micronesia, Federated States of',
      GAB: 'Gabon',
      GBR: 'United Kingdom',
      GEO: 'Georgia',
      GGY: 'Guernsey',
      GHA: 'Ghana',
      GIB: 'Gibraltar',
      GIN: 'Guinea',
      GLP: 'Guadeloupe',
      GMB: 'Gambia',
      GNB: 'Guinea-Bissau',
      GNQ: 'Equatorial Guinea',
      GRC: 'Greece',
      GRD: 'Grenada',
      GRL: 'Greenland',
      GTM: 'Guatemala',
      GUF: 'French Guiana',
      GUM: 'Guam',
      GUY: 'Guyana',
      HKG: 'Hong Kong',
      HMD: 'Heard Island and McDonald Islands',
      HND: 'Honduras',
      HRV: 'Croatia',
      HTI: 'Haiti',
      HUN: 'Hungary',
      IDN: 'Indonesia',
      IMN: 'Isle of Man',
      IND: 'India',
      IOT: 'British Indian Ocean Territory',
      IRL: 'Ireland',
      IRN: 'Iran, Islamic Republic of',
      IRQ: 'Iraq',
      ISL: 'Iceland',
      ISR: 'Israel',
      ITA: 'Italy',
      JAM: 'Jamaica',
      JEY: 'Jersey',
      JOR: 'Jordan',
      JPN: 'Japan',
      KAZ: 'Kazakhstan',
      KEN: 'Kenya',
      KGZ: 'Kyrgyzstan',
      KHM: 'Cambodia',
      KIR: 'Kiribati',
      KNA: 'Saint Kitts and Nevis',
      KOR: 'Korea, Republic of',
      KWT: 'Kuwait',
      LAO: `Lao People's Democratic Republic`,
      LBN: 'Lebanon',
      LBR: 'Liberia',
      LBY: 'Libyan Arab Jamahiriya',
      LCA: 'Saint Lucia',
      LIE: 'Liechtenstein',
      LKA: 'Sri Lanka',
      LSO: 'Lesotho',
      LTU: 'Lithuania',
      LUX: 'Luxembourg',
      LVA: 'Latvia',
      MAC: 'Macao',
      MAF: 'Saint Martin (French part)',
      MAR: 'Morocco',
      MCO: 'Monaco',
      MDA: 'Moldova, Republic of',
      MDG: 'Madagascar',
      MDV: 'Maldives',
      MEX: 'Mexico',
      MHL: 'Marshall Islands',
      MKD: 'North Macedonia',
      MLI: 'Mali',
      MLT: 'Malta',
      MMR: 'Myanmar',
      MNE: 'Montenegro',
      MNG: 'Mongolia',
      MNP: 'Northern Mariana Islands',
      MOZ: 'Mozambique',
      MRT: 'Mauritania',
      MSR: 'Montserrat',
      MTQ: 'Martinique',
      MUS: 'Mauritius',
      MWI: 'Malawi',
      MYS: 'Malaysia',
      MYT: 'Mayotte',
      NAM: 'Namibia',
      NCL: 'New Caledonia',
      NER: 'Niger',
      NFK: 'Norfolk Island',
      NGA: 'Nigeria',
      NIC: 'Nicaragua',
      NIU: 'Niue',
      NLD: 'Netherlands',
      NOR: 'Norway',
      NPL: 'Nepal',
      NRU: 'Nauru',
      NZL: 'New Zealand',
      OMN: 'Oman',
      PAK: 'Pakistan',
      PAN: 'Panama',
      PCN: 'Pitcairn',
      PER: 'Peru',
      PHL: 'Philippines',
      PLW: 'Palau',
      PNG: 'Papua New Guinea',
      POL: 'Poland',
      PRI: 'Puerto Rico',
      PRK: `Korea, Democratic People's Republic of`,
      PRT: 'Portugal',
      PRY: 'Paraguay',
      PSE: 'Palestinian Territory, Occupied',
      PSL: 'Sealand',
      PYF: 'French Polynesia',
      QAT: 'Qatar',
      REU: 'Réunion',
      ROU: 'Romania',
      RUS: 'Russia',
      RWA: 'Rwanda',
      SAU: 'Saudi Arabia',
      SDN: 'Sudan',
      SEN: 'Senegal',
      SGP: 'Singapore',
      SGS: 'South Georgia and the South Sandwich Islands',
      SHN: 'Saint Helena',
      SJM: 'Svalbard and Jan Mayen',
      SLB: 'Solomon Islands',
      SLE: 'Sierra Leone',
      SLV: 'El Salvador',
      SMR: 'San Marino',
      SOM: 'Somalia',
      SPM: 'Saint Pierre and Miquelon',
      SRB: 'Serbia',
      STP: 'Sao Tome and Principe',
      SUR: 'Suriname',
      SVK: 'Slovakia',
      SVN: 'Slovenia',
      SWE: 'Sweden',
      SWZ: 'Swaziland',
      SYC: 'Seychelles',
      SYR: 'Syrian Arab Republic',
      TCA: 'Turks and Caicos Islands',
      TCD: 'Chad',
      TGO: 'Togo',
      THA: 'Thailand',
      TJK: 'Tajikistan',
      TKL: 'Tokelau',
      TKM: 'Turkmenistan',
      TLS: 'Timor-Leste',
      TON: 'Tonga',
      TTO: 'Trinidad and Tobago',
      TUN: 'Tunisia',
      TUR: 'Turkey',
      TUV: 'Tuvalu',
      TWN: 'Taiwan, Province of China',
      TZA: 'Tanzania, United Republic of',
      UGA: 'Uganda',
      UKR: 'Ukrainev',
      UMI: 'United States Minor Outlying Islands',
      URY: 'Uruguay',
      USA: 'United States',
      UZB: 'Uzbekistan',
      VAT: 'Holy See (Vatican City State)',
      VCT: 'Saint Vincent and the Grenadines',
      VEN: 'Venezuela',
      VGB: 'Virgin Islands, British',
      VIR: 'Virgin Islands, U.S.',
      VNM: 'Viet Nam',
      VUT: 'Vanuatu',
      WLF: 'Wallis and Futuna',
      WSM: 'Samoa',
      YEM: 'Yemen',
      ZAF: 'South Africa',
      ZMB: 'Zambia',
      ZWE: 'Zimbabwe',
    }
    return countries[abbr.toUpperCase()] || null
  },
  getStateName: (abbr: string | null) => {
    if (abbr == null) {
      return null
    }
    const states: {
      [key: string]: string
    } = {
      AL: 'Alabama',
      AK: 'Alaska',
      AS: 'American Samoa',
      AZ: 'Arizona',
      AR: 'Arkansas',
      CA: 'California',
      CO: 'Colorado',
      CT: 'Connecticut',
      DE: 'Delaware',
      DC: 'District Of Columbia',
      FM: 'Federated States Of Micronesia',
      FL: 'Florida',
      GA: 'Georgia',
      GU: 'Guam',
      HI: 'Hawaii',
      ID: 'Idaho',
      IL: 'Illinois',
      IN: 'Indiana',
      IA: 'Iowa',
      KS: 'Kansas',
      KY: 'Kentucky',
      LA: 'Louisiana',
      ME: 'Maine',
      MH: 'Marshall Islands',
      MD: 'Maryland',
      MA: 'Massachusetts',
      MI: 'Michigan',
      MN: 'Minnesota',
      MS: 'Mississippi',
      MO: 'Missouri',
      MT: 'Montana',
      NE: 'Nebraska',
      NV: 'Nevada',
      NH: 'New Hampshire',
      NJ: 'New Jersey',
      NM: 'New Mexico',
      NY: 'New York',
      NC: 'North Carolina',
      ND: 'North Dakota',
      MP: 'Northern Mariana Islands',
      OH: 'Ohio',
      OK: 'Oklahoma',
      OR: 'Oregon',
      PW: 'Palau',
      PA: 'Pennsylvania',
      PR: 'Puerto Rico',
      RI: 'Rhode Island',
      SC: 'South Carolina',
      SD: 'South Dakota',
      TN: 'Tennessee',
      TX: 'Texas',
      UT: 'Utah',
      VT: 'Vermont',
      VI: 'Virgin Islands',
      VA: 'Virginia',
      WA: 'Washington',
      WV: 'West Virginia',
      WI: 'Wisconsin',
      WY: 'Wyoming',
    }
    return states[abbr.toUpperCase()] || null
  },
  getIssuerName: (type: string | null, abbr: string | null): string | null => {
    switch (type) {
      case null:
        return ''
      case 'USDL':
        return FormatHelper.getStateName(abbr)
      case 'PASSPORT':
        return FormatHelper.getCountryName(abbr)
      default:
        return ''
    }
  },
  getScoreRangeName: (value: number | null | undefined) => {
    if (value === null || value === undefined) {
      return 'processing'
    }

    let rangeName
    const ranges = [
      {
        min: 0,
        max: 579,
        name: 'very-poor',
      },
      {
        min: 580,
        max: 669,
        name: 'fair',
      },
      {
        min: 670,
        max: 739,
        name: 'good',
      },
      {
        min: 740,
        max: 799,
        name: 'very-good',
      },
      {
        min: 800,
        max: 850,
        name: 'exceptional',
      },
    ]

    ranges.find(range => {
      if (value >= range.min && value <= range.max) {
        rangeName = range.name
      }
      return null
    })
    return rangeName !== undefined ? rangeName : ''
  },
}
export default FormatHelper
