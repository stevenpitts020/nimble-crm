import React from 'react'
import { AutoComplete, Input } from 'antd'
import { SearchIcon } from '../Icon/Icon'

interface ISearchInput {
  title?: string
  options?: object
  block?: boolean
  style?: React.CSSProperties
  size?: 'large' | 'middle' | 'small'
}

// TODO pass proper data
export const SearchInput: React.FC<ISearchInput> = (props: ISearchInput) => {
  // TODO pass this as props? or build from json
  const boxClassName = (mainProps: ISearchInput) => {
    const className = ['ni-search-input']
    return className.join(' ')
  }

  return (
    <AutoComplete
      className={boxClassName(props)}
      dropdownClassName="ni-search-input--dropdown"
      dropdownMatchSelectWidth={false}
      style={props.style ? props.style : { width: '100%' }}
      placeholder="Search here"
    >
      <Input
        size={props.size}
        className="ni-search-input--textfield"
        suffix={<SearchIcon className="ni-search-input--textfield--icon" />}
      />
    </AutoComplete>
  )
}
