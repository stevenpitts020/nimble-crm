import React from 'react'
import { Tabs, Empty } from 'antd'
import {
  FilterDropdownMenu,
  NotificationBadge,
  SectionHeader,
} from '../../components'
import CustomerCard from '../../components/Customer/CustomerCard/CustomerCard'
import { generateSomeClients } from '../../services/FakerService'

const { TabPane } = Tabs

const CustomerCards = (props: { type: 'deposit' | 'mortgage' | 'loans' }) => {
  const max: number = 8
  let dataCards = []
  switch (props.type) {
    case 'deposit':
      dataCards = generateSomeClients(100)
        .filter(client => client.opportunity!.name === 'Simple Checking')
        .slice(0, max)
      break
    case 'mortgage':
      dataCards = generateSomeClients(100)
        .filter(client => client.opportunity!.name === 'Mortgage Refi')
        .slice(0, max)
      break
    case 'loans':
      dataCards = generateSomeClients(100)
        .filter(client => client.opportunity!.name === 'Personal Loan')
        .slice(0, max)
      break
    default:
      dataCards = generateSomeClients(16)
  }

  return (
    <div className="ni-customer-cards">
      {dataCards.map(client => {
        return <CustomerCard key={client.id} client={client} />
      })}
    </div>
  )
}

const OpportunitiesPage: React.FC = (props: any) => {
  return (
    <React.Fragment>
      <SectionHeader
        title="Emerging Opportunities"
        rightComponent={<NotificationBadge />}
      >
        <FilterDropdownMenu title="Filters" />
      </SectionHeader>

      <Tabs size="large" defaultActiveKey="1">
        <TabPane tab="Mortgage" key="1">
          <CustomerCards type="mortgage" />
        </TabPane>
        <TabPane tab="Consumer" key="2">
          <CustomerCards type="loans" />
        </TabPane>
        <TabPane tab="Insurance" key="3">
          <Empty description={<span>No content, yet.</span>} />
        </TabPane>
        <TabPane tab="Deposit" key="4">
          <CustomerCards type="deposit" />
        </TabPane>
        <TabPane tab="Exceptions" key="5">
          <Empty description={<span>No content, yet.</span>} />
        </TabPane>
      </Tabs>
    </React.Fragment>
  )
}

export default OpportunitiesPage
