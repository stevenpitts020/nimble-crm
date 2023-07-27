import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import { ArrowDownIcon } from '../Icon/Icon'

interface IDropdownProps {
  title?: string
  options?: React.ReactElement
  block?: boolean
  style?: React.CSSProperties
}

// TODO pass this as props? or build from json
const dropdownMenuOptions = (
  <Menu>
    <Menu.Item key="1">1rd menu item</Menu.Item>
    <Menu.Item key="2">2rd menu item</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
)

// TODO pass proper data
export const PillDropdown: React.FC<IDropdownProps> = (
  props: IDropdownProps
) => {
  return (
    <div className="ni-pill-dropdown" style={props.style}>
      <Dropdown
        overlay={props.options ? props.options : dropdownMenuOptions}
        trigger={['click']}
      >
        <Button type="dashed" shape="round" block={props.block}>
          {props.title}
          <ArrowDownIcon className="u-margin-left-lg" />
        </Button>
      </Dropdown>
    </div>
  )
}
