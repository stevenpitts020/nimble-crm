import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { NotFound } from './NotFound'

describe('<NotFound />', () => {
  test('Shows title', async () => {
    const history = createMemoryHistory()

    const { getByText } = render(
      <Router history={history}>
        <NotFound title="error!" />
      </Router>
    )

    expect(getByText(/error/)).toBeInTheDocument()
  })
})
