import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import { SettingsIcon } from '../../Common/Icon/Icon'

interface IFilterDropdownMenu {
  title: string
  options?: React.ReactElement
}

// TODO pass this as props? or build from json
const dropdownMenuOptions = (
  <Menu>
    <Menu.Item key="1">1rd menu item</Menu.Item>
    <Menu.Item key="2">2rd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
)

export const FilterDropdownMenu: React.FC<IFilterDropdownMenu> = (
  props: IFilterDropdownMenu
) => {
  return (
    <div className="ni-filter-dropdown-menu">
      <Dropdown
        overlay={props.options ? props.options : dropdownMenuOptions}
        trigger={['click']}
      >
        <Button size="small" type="dashed" ghost={true}>
          <SettingsIcon style={{ fontSize: '22px' }} />
          {props.title}
        </Button>
      </Dropdown>
    </div>
  )
}
