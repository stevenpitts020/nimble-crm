import React from 'react'
import { Typography, DatePicker } from 'antd'
import moment from 'moment'
import { CalendarIcon } from '../../Common/Icon/Icon'

const { RangePicker } = DatePicker
const { Text } = Typography

interface IFilterDateMenu {
  title: string
  options?: object
}

export const FilterDateMenu: React.FC<IFilterDateMenu> = (
  props: IFilterDateMenu
) => {
  return (
    <div className="ni-filter-date-menu u-margin-right-sm">
      <Text type="secondary">Showing data for:</Text>
      <RangePicker
        format="MM/DD/YYYY"
        allowClear={false}
        size={'large'}
        suffixIcon={<CalendarIcon style={{ fontSize: '22px' }} />}
        defaultValue={[moment().startOf('month'), moment()]}
        ranges={{
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment()],
          'Last Month': [
            moment()
              .subtract(1, 'month')
              .startOf('month'),
            moment()
              .startOf('month')
              .subtract(1, 'day'),
          ],
        }}
      />
    </div>
  )
}
