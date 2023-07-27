import { Typography } from 'antd'
import React from 'react'
import { LogoutButton } from '../LogoutButton/LogoutButton'

const { Text } = Typography

interface IUserGreeting {
  label?: string
  name?: string
}

export const UserGreeting: React.FC<IUserGreeting> = (props: IUserGreeting) => {
  return (
    <div className="ni-user-greeting">
      <Text className="ni-user-greeting--say">{props.label}</Text>
      <Text strong={true} className="ni-user-greeting--name">
        {props.name}
      </Text>
      <LogoutButton />
    </div>
  )
}

UserGreeting.defaultProps = {
  name: 'Loading',
  label: 'Hi,',
}
