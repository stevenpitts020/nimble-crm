import React from 'react'
import { Menu, Dropdown, Button } from 'antd'
import { ArrowDownIcon } from '../../Common/Icon/Icon'
import { SearchInput } from '../../Common/SearchInput/SearchInput'

interface ISearchbarProps {
  title?: string
  options?: React.ReactElement
  block?: boolean
}

// TODO pass this as props? or build from json
const dropdownMenuOptions = (
  <Menu>
    <Menu.Item key="1">State</Menu.Item>
    <Menu.Item key="2">Region</Menu.Item>
    <Menu.Item key="3">Market</Menu.Item>
    <Menu.Item key="4">Employee</Menu.Item>
  </Menu>
)

// TODO pass proper data
export const SearchBar: React.FC<ISearchbarProps> = (
  props: ISearchbarProps
) => {
  return (
    <div className="ni-search-bar">
      <Dropdown
        overlay={props.options ? props.options : dropdownMenuOptions}
        trigger={['click']}
      >
        <Button type="link">
          Region <ArrowDownIcon className="u-margin-left-lg" />
        </Button>
      </Dropdown>
      <SearchInput />
    </div>
  )
}
