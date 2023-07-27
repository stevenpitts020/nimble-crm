import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { InstitutionProvider, InstitutionContext } from './InstitutionProvider'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/Institution'
import Config from '../services/Config'

const DisplayInformation = () => {
  const { institutionState } = React.useContext(InstitutionContext)
  return (
    <p data-testid="institution">
      {institutionState.institution
        ? institutionState.institution.name
        : 'false'}
    </p>
  )
}

const Error = () => {
  const { institutionState } = React.useContext(InstitutionContext)
  return <p data-testid="error">{institutionState.error}</p>
}

const Button = () => {
  const { getInstitutionByDomain } = React.useContext(InstitutionContext)

  const getInstitution = async () => {
    await getInstitutionByDomain('psousa@centralbankonline.com')
  }

  return (
    <button data-testid="button" type="button" onClick={getInstitution}>
      Get Institution
    </button>
  )
}

const ButtonClear = () => {
  const { clearData } = React.useContext(InstitutionContext)

  const onClear = async () => {
    await clearData()
  }

  return (
    <button data-testid="clear" type="button" onClick={onClear}>
      Clear
    </button>
  )
}
function App() {
  return (
    <InstitutionProvider>
      <>
        <Error />
        <ButtonClear />
        <DisplayInformation />
        <Button />
      </>
    </InstitutionProvider>
  )
}

describe('InstitutionProvider', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')
  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('defaults to no institution', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId(/institution/).textContent).toEqual('false')
  })

  it('updates state through getInstitutionByDomain', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/institutions/centralbankonline.com`)
      .reply(200, mocks.successResponse)

    const { getByTestId } = render(<App />)

    expect(getByTestId(/institution/).textContent).toEqual('false')

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/institution/).textContent
      expect(result).toEqual(mocks.successResponse.name)
    })
    scope.done()
  })

  it('updates error through getInstitutionByDomain', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/institutions/centralbankonline.com`)
      .reply(404, mocks.invalidResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/error/).textContent
      expect(result).toEqual(mocks.invalidResponse.message)
    })
    scope.done()
  })

  it('clear data if necessary', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/institutions/centralbankonline.com`)
      .reply(200, mocks.successResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/institution/).textContent
      expect(result).toEqual(mocks.successResponse.name)
    })

    fireEvent.click(getByTestId(/clear/))

    await waitFor(() => {
      const result1 = getByTestId(/error/).textContent
      expect(result1).toEqual('')

      const result2 = getByTestId(/institution/).textContent
      expect(result2).toEqual('false')
    })
    scope.done()
  })
})
