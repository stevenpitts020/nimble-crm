import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { AlertProvider, AlertContext } from '../../../store/AlertProvider'
import { AlertMessage } from './AlertMessage'

const AppInner = () => {
  const { showAlert, clearAlert } = React.useContext(AlertContext)

  const handleUpdate = async () => {
    await showAlert({ message: 'robot', type: 'success' })
  }

  const handleClear = async () => {
    await clearAlert()
  }

  return (
    <div data-testid="provider">
      <button data-testid="update" type="button" onClick={handleUpdate}>
        Update
      </button>
      <button data-testid="clear" type="button" onClick={handleClear}>
        Clear
      </button>
    </div>
  )
}

const renderApp = (props: any) => {
  return render(
    <AlertProvider>
      <AppInner />
      <AlertMessage {...props} />
    </AlertProvider>
  )
}

describe('<AlertMessage />', () => {
  test('should render message', async () => {
    const props = { id: null }
    const { getByTestId } = renderApp(props)

    fireEvent.click(getByTestId(/update/))

    await waitFor(() => {
      const result = getByTestId(/alert-message/).textContent
      expect(result).toEqual('robot')
    })
  })

  test('should disapear message', async () => {
    const props = { id: null }
    const { getByTestId, queryByText } = renderApp(props)

    fireEvent.click(getByTestId(/update/))

    await waitFor(() => {
      const result = getByTestId(/alert-message/).textContent
      expect(result).toEqual('robot')
    })

    fireEvent.click(getByTestId(/clear/))

    await waitFor(() => {
      expect(queryByText('span, robot')).not.toBeInTheDocument()
    })
  })
})
