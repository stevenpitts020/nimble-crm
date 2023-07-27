import React from 'react'
import { render } from '@testing-library/react'
import { SignerCreditScore } from './SignerCreditScore'

const renderApp = (propsRender: any) => {
  return render(<SignerCreditScore {...propsRender} />)
}
const propsPending = {
  data: [
    [
      {
        id: '2e31d8c0-1226-4651-8a5d-4bd8aa454721',
        completionCode: '1111',
        reference: '111-2222-333',
        score: null,
        reportDate: null,
        report: {
          uri: null,
        },
        signerId: '2e31d8c0-1226-4651-8a5d-4bd8aa454721',
        createdAt: '2020-09-16T11:32:38.558Z',
        updatedAt: '2020-09-16T11:32:38.558Z',
      },
    ],
  ],
}

describe('<SignerCreditScore />', () => {
  const props = {
    data: {
      id: '2e31d8c0-1226-4651-8a5d-4bd8aa454722',
      signerId: '2e31d8c0-1226-4651-8a5d-4bd8aa454722',
      completionCode: '0000',
      reference: '188504_1603905845',
      score: 744,
      reportDate: '10282020',
      report: {
        uri:
          'https://api.nimblefi.com/v1/documents/1052ab85-08da-4bb5-be00-9e94d282d310?token=8mAABig0OH9lja2um.8mAABig0OH9lja2um.8mAABig0OH9lja2um',
      },
      createdAt: '2020-09-16T11:32:38.558Z',
      updatedAt: '2020-09-16T11:32:38.558Z',
    },
  }
  test('should render content', () => {
    const { getByText } = renderApp(props)
    const role = getByText(props.data.score.toString())
    expect(role).toBeInTheDocument()
  })
  test('should show credit score', () => {
    const { getByText } = renderApp(props)
    const creditScore = getByText(props.data.score.toString())
    expect(creditScore).toHaveTextContent('744')
  })
  test('should have class with score range very-poor', () => {
    props.data.score = 479
    const { getByTestId } = renderApp(props)
    expect(getByTestId('CreditScore')).toHaveClass('very-poor')
  })
  test('should have class with score range fair', () => {
    props.data.score = 583
    const { getByTestId } = renderApp(props)
    expect(getByTestId('CreditScore')).toHaveClass('fair')
  })
  test('should have class with score range good', () => {
    props.data.score = 700
    const { getByTestId } = renderApp(props)
    expect(getByTestId('CreditScore')).toHaveClass('good')
  })
  test('should have class with score range very-good', () => {
    props.data.score = 753
    const { getByTestId } = renderApp(props)
    expect(getByTestId('CreditScore')).toHaveClass('very-good')
  })
  test('should have class with score range exceptional', () => {
    props.data.score = 801
    const { getByTestId } = renderApp(props)
    expect(getByTestId('CreditScore')).toHaveClass('exceptional')
  })
  test('should have class processing if the score is null ', () => {
    const { getByTestId } = renderApp(propsPending)
    expect(getByTestId('CreditScore')).toHaveClass('processing')
  })
})
