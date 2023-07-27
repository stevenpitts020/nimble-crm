import React, { useContext } from 'react'
import { Typography } from 'antd'
import { FilterButton } from './FilterButton'
import { AccountRequestContext } from '../../../store/AccountRequestProvider'
const { Text } = Typography

export const AccountRequestFilters: React.FC = () => {
  const { statusFilters, currentStatusFilter, changeStatusFilter } = useContext(
    AccountRequestContext
  )
  return (
    <div className="ni-filters-tab">
      <Text type="secondary">Filters</Text>
      {statusFilters.map((filter, index) => (
        <FilterButton
          name={filter}
          key={filter}
          currentStatusFilter={currentStatusFilter}
          changeStatusFilter={changeStatusFilter}
        />
      ))}
    </div>
  )
}
