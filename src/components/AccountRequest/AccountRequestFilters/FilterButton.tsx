import React from 'react'
import { useHistory } from 'react-router-dom'
import FormatHelper from '../../../utils/FormatHelper'

interface IFilterButton {
  name: string
  currentStatusFilter: string | null
  changeStatusFilter: (filter: string | null) => void
}
export const FilterButton: React.FC<IFilterButton> = ({
  name,
  currentStatusFilter,
  changeStatusFilter,
}) => {
  const active = name === currentStatusFilter
  const history = useHistory()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (active) {
      // if the button is on, second click will turn it off
      changeStatusFilter(null)
      history.push(`${history.location.pathname}`)
    } else {
      changeStatusFilter(name)
      history.push(`${history.location.pathname}?status=${name}`)
    }
  }

  return (
    <button
      className={active ? 'filter-button active' : 'filter-button'}
      onClick={handleClick}
    >
      {FormatHelper.getAccountRequestStatus(name)}
    </button>
  )
}
