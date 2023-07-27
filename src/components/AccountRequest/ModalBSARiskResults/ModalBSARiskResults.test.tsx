import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { ModalBSARiskResults } from './ModalBSARiskResults'
import { bsaRiskResultsMock } from '../../../services/__mocks__/AccountRequest'

import nock from 'nock'
import axios from 'axios'
import Config from '../../../services/Config'

const renderApp = (props: any) => {
  return render(<ModalBSARiskResults {...props} />)
}

// this needs to load provider and mock response in order to pass
describe('<ModalBSARiskResults />', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('should render basic content', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/account-requests/thisid-123/bsa-risk-results')
      .reply(200, bsaRiskResultsMock)

    renderApp({
      accountRequestId: 'thisid-123',
      bsa: { score: 3, risk: 'Serious' },
    })

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Bsa Risk/))
      expect(screen.getByTestId('header-fullname').textContent).toEqual(
        'Serious'
      )

      const docDoc = screen.getByText(/PT/)
      expect(docDoc).toBeInTheDocument()
    })
    scope.done()
  })
})
