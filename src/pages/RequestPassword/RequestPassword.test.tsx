import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import RequestPassword from './RequestPassword'
import { RequestPasswordProvider } from '../../store/RequestPasswordProvider'

const renderApp = (props: any) => {
  const history = createMemoryHistory()

  return render(
    <Router history={history}>
      <RequestPasswordProvider>
        <RequestPassword {...props} />
      </RequestPasswordProvider>
    </Router>
  )
}

describe('<RequestPassword />', () => {
  test('should render ok', async () => {
    const props = {}
    const { getByText } = renderApp(props)

    await waitFor(() => {
      const container = getByText('Did you forget your password?')
      expect(container).toBeInTheDocument()
    })
  })
})
