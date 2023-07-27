import React from 'react'
import { render, cleanup } from '@testing-library/react'
import PricingPage from './PricingPage'

jest.mock('../../services/FakerService', () => ({
  generateSome: () => [
    {
      'Simple Checking': 'some account',
      'Hedge Rate': 10,
      Fixed: false,
      Rate: 2,
      Offering: 10,
      Amount: 4,
      Term: '7 months',
      Expiration: 'May',
      'Cross-Sell': true,
      id: '1',
    },
  ],
}))

const renderBox = (props: any) => {
  return render(<PricingPage {...props} />)
}

describe.skip('<Pricing Page />', () => {
  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = renderBox({})
    expect(asFragment()).toMatchSnapshot()
  })
})
