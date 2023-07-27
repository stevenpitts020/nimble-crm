import React from 'react'
import { NotFound } from '../../components'

const NotFoundPage: React.FC = (props: any) => {
  return (
    <div data-testid="not-found-page">
      <NotFound title="We couldn't find that page. Let's try again or go back to home." />
    </div>
  )
}

export default NotFoundPage
