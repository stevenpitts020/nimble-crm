import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import NotFoundPage from './NotFoundPage'

const renderApp = (props: any) => {
  const history = createMemoryHistory()

  return render(
    <Router history={history}>
      <NotFoundPage {...props} />
    </Router>
  )
}

describe('<NotFoundPage />', () => {
  describe('with default props', () => {
    test('should render ok', () => {
      const props = { title: 'not found' }
      const { getByTestId } = renderApp(props)
      const container = getByTestId('not-found-page')
      expect(container).toBeInTheDocument()
    })
  })
})
