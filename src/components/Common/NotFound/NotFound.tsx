import React from 'react'
import { Result, Button } from 'antd'
import { NavLink } from 'react-router-dom'

interface INotFound {
  title?: string
}

export const NotFound: React.FC<INotFound> = (props: INotFound) => {
  return (
    <div data-testid="not-found">
      <Result
        status="warning"
        title={props.title}
        extra={
          <NavLink to={'/'}>
            <Button type="default" shape="round" key="console">
              Go to Home Page
            </Button>
          </NavLink>
        }
      />
    </div>
  )
}
