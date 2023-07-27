import React from 'react'
import { render } from '@testing-library/react'
import { AccountRequestStatus } from './AccountRequestStatus'

const renderApp = (props: any) => {
  return render(<AccountRequestStatus {...props} />)
}

describe('<AccountRequestStatus />', () => {
  test('should render incomplete with INCOMPLETE', () => {
    const props = {
      accountRequest: {
        status: 'INCOMPLETE',
      },
    }
    const { getByText } = renderApp(props)
    const container = getByText(/Incomplete/)
    expect(container).toBeInTheDocument()
  })

  test('should render Waiting Signatures with PENDING', () => {
    const props = {
      accountRequest: {
        status: 'PENDING',
      },
    }
    const { getByText } = renderApp(props)
    const container = getByText(/Waiting Signatures/)
    expect(container).toBeInTheDocument()
  })

  test('should render Ready to Review with SIGNED', () => {
    const props = {
      accountRequest: {
        status: 'SIGNED',
      },
    }
    const { getByText } = renderApp(props)
    const container = getByText(/Ready to Review/)
    expect(container).toBeInTheDocument()
  })

  test('should render Approved with APPROVED', () => {
    const props = {
      accountRequest: {
        status: 'APPROVED',
      },
    }
    const { getByText } = renderApp(props)
    const container = getByText(/Approved/)
    expect(container).toBeInTheDocument()
  })

  test('should render Declined with DECLINED', () => {
    const props = {
      accountRequest: {
        status: 'DECLINED',
      },
    }
    const { getByText } = renderApp(props)
    const container = getByText(/Declined/)
    expect(container).toBeInTheDocument()
  })
})
