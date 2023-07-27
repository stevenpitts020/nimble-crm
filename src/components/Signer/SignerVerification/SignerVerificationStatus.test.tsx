import React from 'react'
import { render } from '@testing-library/react'
import { validCheck } from './SignerVerificationStatus'
import { LabelWithText } from './LabelWithText'

const mock = {
  faceStatus: 'VALID',
  faceUpdatedAt: '2018-03-16T11:32:03.341Z',
  documentStatus: 'INVALID',
  documentUpdatedAt: '2018-03-16T11:32:03.341Z',
  addressStatus: 'PENDING',
  addressUpdatedAt: '2018-03-16T11:32:03.341Z',
  sanctionsStatus: 'NOMATCH',
  sanctionsUpdatedAt: '2018-03-16T11:32:03.341Z',
  mediaStatus: 'NOMATCH',
  mediaUpdatedAt: '2018-03-16T11:32:03.341Z',
  politicalExposure: 'MATCH',
  politicalExposureUpdatedAt: '2018-03-16T11:32:03.341Z',
}

const renderApp = (props: any) => {
  return render(
    <LabelWithText label={props.label}>
      {validCheck(props.key, props.date)}
    </LabelWithText>
  )
}

describe('<SignerVerificationStatus />', () => {
  test('should render valid validation', () => {
    const props = {
      label: 'Face',
      key: mock.faceStatus,
      date: mock.faceUpdatedAt,
    }

    const { getByText } = renderApp(props)

    expect(getByText(props.label)).toBeInTheDocument()
    expect(getByText('Successful Verification')).toBeInTheDocument()
  })

  test('should render invalid validation', () => {
    const props = {
      label: 'Doc',
      key: mock.documentStatus,
      date: mock.documentUpdatedAt,
    }

    const { getByText } = renderApp(props)

    expect(getByText(props.label)).toBeInTheDocument()
    expect(getByText('03-16-2018')).toBeInTheDocument()
  })

  test('should render pending validation', () => {
    const props = {
      label: 'Address',
      key: mock.addressStatus,
      date: mock.addressUpdatedAt,
    }

    const { getByText } = renderApp(props)

    expect(getByText('Pending')).toBeInTheDocument()
  })

  test('should render match validation', () => {
    const props = {
      label: 'Doc',
      key: mock.politicalExposure,
      date: mock.politicalExposureUpdatedAt,
    }

    const { getByText } = renderApp(props)

    expect(getByText('Possible Matches')).toBeInTheDocument()
  })

  test('should render no match validation', () => {
    const props = {
      label: 'Doc',
      key: mock.mediaStatus,
      date: mock.mediaUpdatedAt,
    }

    const { getByText } = renderApp(props)

    expect(getByText('No matches')).toBeInTheDocument()
  })
})
