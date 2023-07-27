import React, { useContext } from 'react'
import { Layout, Menu, Spin } from 'antd'
import { NavLink } from 'react-router-dom'
import { CityIcon, HomeIcon } from '../../Common/Icon/Icon'
import { UserGreeting } from '../UserGreeting/UserGreeting'

/* Our Context */
import { ProfileContext } from '../../../store/ProfileProvider'

interface INavMenuItemProps {
  link: string
  title: string
  icon?: any
}

const { Sider } = Layout

// TODO create a proper component
const NavMenuItem = (props: INavMenuItemProps) => (
  <React.Fragment>
    {props.icon}
    <span className="nav-text">{props.title}</span>
    <NavLink to={props.link} className="nav-text" />
  </React.Fragment>
)

// TODO create proper component with props, get basic routes
const NavMenu = (props: any) => (
  <Menu defaultSelectedKeys={['1']}>
    <Menu.Item key="1">
      <NavMenuItem link="/" title="Home" icon={<HomeIcon />} />
    </Menu.Item>
  </Menu>
)

export const Sidebar: React.FC = () => {
  const { profileState } = useContext(ProfileContext)

  if (profileState.status === 'loading') {
    return <Spin />
  }

  return (
    <Sider
      breakpoint="xl"
      collapsedWidth="0"
      width="240px"
      className="ni-sidebar"
      theme="light"
    >
      <CityIcon className="logo" />
      {profileState.profile && (
        <UserGreeting name={profileState.profile.firstName} />
      )}
      <NavMenu />
    </Sider>
  )
}
