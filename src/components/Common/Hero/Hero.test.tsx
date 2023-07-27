import React from 'react'
import { render } from '@testing-library/react'
import { Hero } from './Hero'

describe('<Hero />', () => {
  test('Shows Hero with title', async () => {
    const { getByText } = render(<Hero title="This list is empty" />)

    expect(getByText(/This list is empty/i)).toBeInTheDocument()
  })
  test('Shows Hero with subtitle', async () => {
    const { getByText } = render(<Hero subTitle="This list is empty" />)

    expect(getByText(/This list is empty/i)).toBeInTheDocument()
  })
  test('Shows Hero with children', async () => {
    const { getByText } = render(<Hero>Hello</Hero>)

    expect(getByText(/Hello/i)).toBeInTheDocument()
  })
})
