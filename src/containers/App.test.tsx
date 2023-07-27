import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

const renderApp = (props: any) => {
  return render(<App {...props} />)
}

describe('<App />', () => {
  test('renders main-app', () => {
    const { getByTestId } = renderApp({})
    const container = getByTestId(/main-app/)

    expect(container).toBeInTheDocument()
  })
})
