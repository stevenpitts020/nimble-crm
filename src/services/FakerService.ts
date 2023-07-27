import { CustomerSchema } from '../store'

function randomNumber(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

export function uuid() {
  return (
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36)
  )
}

function rating() {
  const r = Math.round(Math.random() * 2)
  switch (r) {
    case 0:
      return 'Platinum'
    case 1:
      return 'Gold'
    case 2:
      return 'Silver'
  }
}

function elapsed() {
  const r = Math.round(Math.random() * 12)
  return r + ' Months ago'
}

function until() {
  const r = Math.round(Math.random() * 12)
  return r + ' Months'
}

function percent() {
  const r = Math.round(Math.random() * 100)
  return r + ' %'
}

function habitat() {
  return Math.random() > 0.5 ? 'Renter' : 'Owner'
}

function status() {
  const r = Math.round(Math.random() * 2)
  switch (r) {
    case 0:
      return 'Invited'
    case 1:
      return 'Downloaded'
    case 2:
      return `In Progress ${percent()}`
  }
}

function accountStatus() {
  const r = Math.round(Math.random() * 2)
  switch (r) {
    case 0:
      return 'PENDING'
    case 1:
      return 'APPROVED'
    case 2:
      return `DECLINED`
  }
}

function financeProduct() {
  const r = Math.round(Math.random() * 4)
  switch (r) {
    case 0:
      return 'Home Equity'
    case 1:
      return 'Line of Credit'
    case 2:
      return '30yr Mortgage'
    case 3:
      return '2yr Certificate of Deposit'
    case 4:
      return '5y Certificate of Deposit'
  }
}

function document() {
  const r = Math.round(Math.random() * 1)
  switch (r) {
    case 0:
      return 'Tax Return'
    case 1:
      return 'UCC Search'
  }
}

function recurrence() {
  const r = Math.round(Math.random() * 1)
  switch (r) {
    case 0:
      return 'Yearly'
    case 1:
      return 'Monthly'
  }
}

const opportunityType = [
  {
    name: 'Mortgage Refi',
    description: 'House on the Market',
    color: '#D3356A',
    class: 'ni-bg-color-light-pink',
  },
  {
    name: 'Mortgage Refi',
    description: 'Better Offer',
    color: '#D3356A',
    class: 'ni-bg-color-light-pink',
  },
  {
    name: 'Mortgage Refi',
    description: 'Deposit Reduction',
    color: '#D3356A',
    class: 'ni-bg-color-light-pink',
  },
  {
    name: 'Personal Loan',
    description: 'Bought new House',
    color: '#FC7342',
    class: 'ni-bg-color-light-orange',
  },
  {
    name: 'Personal Loan',
    description: 'Bought new Car',
    color: '#FC7342',
    class: 'ni-bg-color-light-orange',
  },
  {
    name: 'Simple Checking',
    description: 'New Job',
    color: '#8643DE',
    class: 'ni-bg-color-light-purple',
  },
  {
    name: 'Simple Checking',
    description: 'Car Sold',
    color: '#8643DE',
    class: 'ni-bg-color-light-purple',
  },
  {
    name: 'Simple Checking',
    description: 'Savings 1y',
    color: '#8643DE',
    class: 'ni-bg-color-light-purple',
  },
]

function productOpportunity() {
  const rand = Math.ceil(Math.random() * opportunityType.length) - 1
  return opportunityType[rand]
}

function opportunity() {
  const opp = productOpportunity()

  return {
    key: uuid(),
    ...opp,
    percent: percent(),
  }
}

function firstName() {
  const perf = ['Joe', 'John', 'Markus', 'Joel', 'Peter']

  return perf[randomNumber(perf.length - 1)]
}

function lastName() {
  const perf = ['Goodman', 'John', 'Silverman', 'Gold', 'Wick']

  return perf[randomNumber(perf.length - 1)]
}

function performance() {
  const perf = [
    'Above Average',
    'Competitive',
    'Not Competitive',
    'Below Average',
    'Very Competitive',
  ]

  return perf[randomNumber(perf.length - 1)]
}

function generation() {
  const gen = ['Baby Boomers', 'Millennial', 'iGen']

  return gen[randomNumber(gen.length - 1)]
}

export const generateSome = (cols: string[], len: number = 10): unknown[] => {
  return new Array(len).fill({}).map((): object => {
    const values = cols.map(i => {
      switch (i.split('|').shift()) {
        case 'generation':
          return generation()
        case 'performance':
          return performance()
        case 'until':
          return until()
        case 'product':
          return productOpportunity().name
        case 'opportunity':
          return opportunity()
        case 'opportunities':
          return Math.random() > 0.5
            ? []
            : new Array(1 + Math.round(Math.random() * 2))
                .fill(0)
                .map(opportunity)
        case 'status':
          return status()
        case 'habitat':
          return habitat()
        case 'percent':
          return percent()
        case 'name.firstName':
        case 'firstName':
          return firstName()
        case 'name.lastName':
        case 'lastName':
          return lastName()
        case 'finance.accountName':
          return firstName() + ' ' + lastName()
        case 'elapsed':
          return elapsed()
        case 'rating':
          return rating()
        case 'document':
        case 'name.jobTitle':
          return document()
        case 'accountStatus':
          return accountStatus()
        case 'recurrence':
          return recurrence()
        case 'random.number':
        case 'random.number(20)':
        case 'random.number(50)':
          return randomNumber(20)
        case 'random.number(10)':
          return randomNumber(10)
        case 'financeProduct':
          return financeProduct()
        case 'random.uuid|id':
          return uuid()
        case 'date.past|creationDate':
          return randomDate(new Date(2012, 0, 1), new Date()).toISOString()
        case 'lat':
          return 38 + Math.random() * 5
        case 'lon':
          return -76 - Math.random() * 3
        default:
          if (i.startsWith('date.past')) {
            return randomDate(new Date(2012, 0, 1), new Date()).toISOString()
          }
          if (i.startsWith('date.future')) {
            return randomDate(new Date(2000, 0, 1), new Date()).toISOString()
          }
          return `{{${i.split('|').shift()}}}`
      }
    })
    const keys = cols.map(
      i =>
        i
          .split('.')!
          .pop()!
          .split('|')!
          .pop()!
    )

    return keys.reduce(
      (obj: object, key: string | undefined, index: number) => {
        if (typeof key === 'undefined') {
          return obj
        }
        return { ...obj, [key]: values[index] }
      },
      {
        id: uuid(),
      }
    )
  })
}

export const generateSomeClients = (len: number = 10): CustomerSchema[] => {
  return generateSome(
    [
      'random.uuid|id',
      'firstName',
      'lastName',
      'generation',
      'image.avatar',
      'internet.email',
      'address.streetAddress',
      'address.secondaryAddress',
      'address.city',
      'address.state',
      'random.number|postalCode',
      'company.companyName',
      'date.past|creationDate',
      'rating',
      'status',
      'accountStatus',
      'opportunity',
      'opportunities',
      'phone.phoneNumberFormat|ssn',
      'random.number|d_volume',
      'random.number|l_volume',
      'random.number(10)|p_count',
      'habitat',
    ],
    len
  ) as CustomerSchema[]
}
