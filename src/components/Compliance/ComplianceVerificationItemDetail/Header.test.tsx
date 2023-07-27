import React from 'react'
import { render } from '@testing-library/react'
import { Header } from './Header'

const renderApp = (props: any) => {
  return render(<Header {...props} />)
}

describe('<Header />', () => {
  test('should render title', () => {
    const props = {
      title: 'hello',
    }
    const { getByText } = renderApp(props)

    expect(getByText('hello')).toBeInTheDocument()
  })
})
