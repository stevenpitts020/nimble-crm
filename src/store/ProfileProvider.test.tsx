import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { ProfileProvider, ProfileContext } from './ProfileProvider'

import nock from 'nock'
import axios from 'axios'
import * as mocks from '../services/__mocks__/Profile'
import Config from '../services/Config'
import AuthProvider from './AuthProvider'
import Repo from '../services/Repo'

const DisplayInformation = () => {
  const { profileState } = React.useContext(ProfileContext)
  return (
    <p data-testid="profile">
      {profileState.profile ? profileState.profile.email : 'false'}
    </p>
  )
}

const Error = () => {
  const { profileState } = React.useContext(ProfileContext)
  return <p data-testid="error">{profileState.error}</p>
}

const Button = () => {
  const { getProfile } = React.useContext(ProfileContext)

  const handleProfile = async () => {
    await getProfile()
  }

  return (
    <button data-testid="button" type="button" onClick={handleProfile}>
      Get Profile
    </button>
  )
}

const ButtonClear = () => {
  const { clearProfile } = React.useContext(ProfileContext)

  const onClear = async () => {
    await clearProfile()
  }

  return (
    <button data-testid="clear" type="button" onClick={onClear}>
      Clear
    </button>
  )
}

// Simplified Boilerplate app
function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <>
          <Error />
          <ButtonClear />
          <DisplayInformation />
          <Button />
        </>
      </ProfileProvider>
    </AuthProvider>
  )
}

function AuthenticatedApp() {
  return (
    <AuthProvider existingToken="xpto">
      <ProfileProvider>
        <Error />
        <ButtonClear />
        <DisplayInformation />
        <Button />
      </ProfileProvider>
    </AuthProvider>
  )
}
describe('ProfileProvider', () => {
  // tslint:disable-next-line: no-var-requires
  axios.defaults.adapter = require('axios/lib/adapters/http')

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('defaults to empty state if not authenticated', async () => {
    await waitFor(() => {
      const { getByTestId } = render(<App />)
      expect(getByTestId(/profile/).textContent).toEqual('false')
    })
  })

  it('updates state through getProfile on useEffect', async () => {
    Repo.setItem('access_token', 'xpto')

    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/me/')
      .reply(200, mocks.successResponse)

    const { getByTestId } = render(<AuthenticatedApp />)

    await waitFor(() => {
      const result = getByTestId(/profile/).textContent
      expect(result).toEqual(mocks.successResponse.email)
    })
    Repo.removeItem('access_token')
    scope.done()
  })

  it('updates state through getProfile', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/me/')
      .reply(200, mocks.successResponse)

    const { getByTestId } = render(<App />)

    expect(getByTestId(/profile/).textContent).toEqual('false')

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/profile/).textContent
      expect(result).toEqual(mocks.successResponse.email)
    })
    scope.done()
  })

  it('updates error through getProfile', async () => {
    const scope = nock(`${Config.coreAPI}`)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/me/')
      .reply(412, mocks.invalidResponse)

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
      .get('/me/')
      .reply(200, mocks.successResponse)

    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId(/button/))

    await waitFor(() => {
      const result = getByTestId(/profile/).textContent
      expect(result).toEqual(mocks.successResponse.email)
    })

    fireEvent.click(getByTestId(/clear/))

    await waitFor(() => {
      const result1 = getByTestId(/error/).textContent
      expect(result1).toEqual('')

      const result2 = getByTestId(/profile/).textContent
      expect(result2).toEqual('false')
    })
    scope.done()
  })
})
