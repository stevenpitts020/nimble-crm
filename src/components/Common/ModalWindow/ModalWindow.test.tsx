import React from 'react'
import { render } from '@testing-library/react'
import { ModalWindow } from './ModalWindow'

const renderApp = (props: any) => {
  return render(<ModalWindow {...props} />)
}

describe('<ModalWindow />', () => {
  test('should render title and text', () => {
    const props = {
      visible: true,
      introductionTitle: 'Test 123',
      introductionText: 'Hello world',
    }
    const { getByText } = renderApp(props)

    const title = getByText(props.introductionTitle)
    expect(title).toBeInTheDocument()

    const intro = getByText(props.introductionText)
    expect(intro).toBeInTheDocument()
  })

  test('should render children', () => {
    const props = {
      visible: true,
      introductionTitle: 'Test 123',
      introductionText: 'Hello world',
      children: <div>Oi</div>,
    }
    const { getByText } = renderApp(props)

    const intro = getByText('Oi')
    expect(intro).toBeInTheDocument()
  })

  test('should be invisible', () => {
    const props = {
      visible: false,
      introductionTitle: 'Test 123',
      introductionText: 'Hello world',
    }
    const { queryByText } = renderApp(props)

    const intro = queryByText(props.introductionText)
    expect(intro).toBeNull() // it doesn't exist
  })
})
