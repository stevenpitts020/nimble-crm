import React from 'react'
import { render } from '@testing-library/react'
import { ComplianceListEntryArticle } from './ComplianceListEntryArticle'

const renderApp = (props: any) => {
  return render(<ComplianceListEntryArticle {...props} />)
}

describe('<ComplianceVerificationItem />', () => {
  test('should render item information', () => {
    const props = {
      title: 'In the news',
      date: '12-12-1982',
      children: <p>Hello</p>,
    }
    const { getByText } = renderApp(props)

    expect(getByText(props.title)).toBeInTheDocument()
    expect(getByText(props.date)).toBeInTheDocument()
    expect(getByText('Hello')).toBeInTheDocument()
  })
})
