import { Card } from 'antd'
import React from 'react'
import {
  FilterDropdownMenu,
  NotificationBadge,
  SearchInput,
  Box,
  SectionTitle,
} from '../../components'
// TODO Note: fails to import from '../../components' for some reason
import CustomerTable, {
  CustomerTableTheme,
} from '../../components/Customer/CustomerTable/CustomerTable'
import { generateSomeClients } from '../../services/FakerService'

const dataCards = generateSomeClients(8)

const ClientsPage: React.FC = () => {
  const onSelect = () => undefined

  return (
    <React.Fragment>
      <Box col="flex" className="ni-section-header--clients">
        <SectionTitle>Clients</SectionTitle>
        <FilterDropdownMenu title="Filters" />
        <SearchInput
          style={{ marginLeft: 'auto', marginRight: 'auto', width: '250px' }}
        />
        <NotificationBadge />
      </Box>

      <Card bordered={false} size="small">
        <CustomerTable
          clients={dataCards}
          theme={CustomerTableTheme.OPPORTUNITIES}
          selection={onSelect}
          expanded={true}
        />
      </Card>
    </React.Fragment>
  )
}

export default ClientsPage
