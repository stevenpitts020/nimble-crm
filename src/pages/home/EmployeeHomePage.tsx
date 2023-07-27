import { Card, Menu, Row, Typography } from 'antd'
import React from 'react'
import {
  AquisitionChart,
  Box,
  IAquisitionChartData,
  PieSlice,
  PillDropdown,
  SectionTitle,
  StatNumber,
  SectionHeader,
  FilterDateMenu,
} from '../../components'
import CustomerCard from '../../components/Customer/CustomerCard/CustomerCard'
import DataTable from '../../components/DataTable/DataTable'
import { TableClientActions } from '../../components/DataTable/TableActions'
import { LineIcon } from '../../components/Common/Icon/Icon'
import Helpers from '../../utils/FormatHelper'
import {
  generateSome,
  generateSomeClients,
  uuid,
} from '../../services/FakerService'

const { Text, Title } = Typography

const SearchMenuOptions = (
  <Menu>
    <Menu.Item key="1">On your Region</Menu.Item>
    <Menu.Item key="2">On your State</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Countrywide</Menu.Item>
  </Menu>
)

const PerformanceMenuOptions = (
  <Menu>
    <Menu.Item key="1">Top Products</Menu.Item>
    <Menu.Item key="2">Highest Volume</Menu.Item>
    <Menu.Item key="3">Lowest Volume</Menu.Item>
    <Menu.Item key="4">Highest Rate</Menu.Item>
    <Menu.Item key="5">Lowest Rate</Menu.Item>
  </Menu>
)

const StatNumbers = () => (
  <div className="ni-stat-numbers">
    <StatNumber value="5" percent="2" direction="up" label="conversions" />
    <StatNumber value="3" percent="2" direction="up" label="profitability" />
    <StatNumber value="2" percent="2" direction="up" label="referrals" />
    <StatNumber value="3" percent="2" direction="down" label="cross-sell" />
    <StatNumber
      value="3"
      percent="2"
      direction="down"
      label="growth in loans"
    />
    <StatNumber
      value="32"
      percent="2"
      direction="up"
      label="growth in deposits"
    />
  </div>
)

const ProductPerformance = () => {
  const data = generateSome(
    [
      'financeProduct',
      'random.number(20)|volume',
      'random.number(20)|rate',
      'random.number(10)|avg',
    ],
    5
  ).map((item: any) => {
    const Product = (
      <Text strong={true} ellipsis={true} style={{ maxWidth: '205px' }}>
        {item.financeProduct}
      </Text>
    )
    return {
      Product,
      Volume: <Text className="ni-color-dark">{item.volume}</Text>,
      Rate: <Text className="ni-color-success">+{item.rate}%</Text>,
      Avg: `+${item.avg}%`,
      id: uuid(),
    }
  })

  return (
    <Card
      bordered={false}
      extra={
        <PillDropdown
          options={PerformanceMenuOptions}
          title="Top Products"
          block={true}
        />
      }
      title={
        <SectionTitle subtitle="Product" break={true}>
          Performance
        </SectionTitle>
      }
    >
      <DataTable pagination={false} size="middle" autoCols={true} data={data} />
    </Card>
  )
}

const DocumentExceptions = () => {
  const data = generateSome(
    [
      'document',
      'name.firstName',
      'name.lastName',
      'rating',
      'date.future|due',
      'date.past|lastcontact',
    ],
    5
  ).map((item: any) => {
    return {
      Document: (
        <Text strong={true} ellipsis={true} style={{ maxWidth: '135px' }}>
          {item.document}
        </Text>
      ),
      Client: (
        <a href="/clients">
          {item.firstName} {item.lastName}
        </a>
      ),
      ' ': `${item.rating}`,
      'Due Date': (
        <Text className="ni-color-dark">{Helpers.dateFormat(item.due)}</Text>
      ),
      'Last Contact': (
        <Text className="ni-color-dark">
          {Helpers.dateFormat(item.lastcontact)}
        </Text>
      ),
      id: uuid(),
      options: (
        <div style={{ float: 'right' }}>
          <TableClientActions />
        </div>
      ),
    }
  })

  const cols = { options: '' } // mute the options column header

  return (
    <Card
      bordered={false}
      title={
        <div className="u-margin-bottom-lg">
          <SectionTitle subtitle="Documentation">Exceptions</SectionTitle>
        </div>
      }
    >
      <DataTable
        pagination={false}
        size="middle"
        autoCols={true}
        data={data}
        cols={cols}
      />
    </Card>
  )
}

// TODO this should be a proper component?
const CustomerAquisitionStatLegend = () => (
  <Row justify="space-between" align="top" className="ni-line-chart-legend">
    <Box textAlign="left">
      <LineIcon className="ni-color-platinum" />
      <Text className="ni-color-dark"> Platinum</Text>
      <Title level={3}>
        +2183 <Text className="ni-color-success">+234</Text>
      </Title>
    </Box>
    <Box textAlign="left">
      <LineIcon className="ni-color-gold" />
      <Text className="ni-color-dark"> Gold</Text>
      <Title level={3}>
        +120 <Text className="ni-color-success">+24</Text>
      </Title>
    </Box>
    <Box textAlign="left">
      <LineIcon className="ni-color-silver" />
      <Text className="ni-color-dark"> Silver</Text>
      <Title level={3}>
        +9000 <Text className="ni-color-danger">-234</Text>
      </Title>
    </Box>
  </Row>
)

// TODO
const CustomerAquisition = () => {
  const months = ' Jan Fev Mar Abr May Jun Jul Aug Set Oct Nov Dec'.split(' ')

  const data = months.map(month => {
    return {
      gold_minus: Math.round((5 + Math.random() * 10) * -1),
      gold_plus: Math.round(10 + Math.random() * 30),
      key: month,
      label: month,
      plat_minus: Math.round((5 + Math.random() * 20) * -1),
      plat_plus: Math.round(15 + Math.random() * 40),
      silver_minus: Math.round((2 + Math.random() * 15) * -1),
      silver_plus: Math.round(2 + Math.random() * 20),
    }
  }) as IAquisitionChartData[]

  return (
    <Card
      bordered={false}
      title={<SectionTitle subtitle="Customer">Aquisition</SectionTitle>}
      extra={<CustomerAquisitionStatLegend />}
    >
      <AquisitionChart data={data} />
    </Card>
  )
}

// TODO create component for this?
const ProspectsPerformanceStats = () => (
  <Row justify="space-around" align="top">
    <Box textAlign="center">
      <Title level={1} className="u-margin-none regular">
        {Math.round(250 + Math.random() * 250)}
      </Title>
      <Text type="secondary" className="uppercase smallest bold">
        Invited
      </Text>
    </Box>
    <Box textAlign="center">
      <Title level={1} className="u-margin-none regular">
        {Math.round(100 + Math.random() * 90)}
      </Title>
      <Text type="secondary" className="uppercase smallest bold">
        Downloaded
      </Text>
    </Box>
    <Box textAlign="center">
      <Title level={1} className="u-margin-none regular">
        {Math.round(50 + Math.random() * 50)}
      </Title>
      <Text type="secondary" className="uppercase smallest bold">
        Converted
      </Text>
    </Box>
  </Row>
)

// TODO
const ProspectsPerformance = () => (
  <Card
    bordered={false}
    title={<SectionTitle subtitle="Prospects">Performance</SectionTitle>}
  >
    <Box textAlign="center" marginBottom="lg">
      <PieSlice value={10 + Math.random() * 20} />
    </Box>
    <Box textAlign="center">
      <ProspectsPerformanceStats />
    </Box>
  </Card>
)

const CustomerCards = () => {
  const dataCards = generateSomeClients(4)

  return (
    <div className="ni-customer-cards">
      {dataCards.map(client => {
        return <CustomerCard key={client.id} client={client} />
      })}
    </div>
  )
}

const HeaderHomepage = () => (
  <Box col="flex" className="ni-section-header--clients">
    <SectionTitle subtitle="Your">Rank</SectionTitle>
    <PillDropdown
      options={SearchMenuOptions}
      title="On your region"
      style={{ marginRight: 'auto', width: '220px' }}
    />
    <FilterDateMenu title="Showing Data for:" />
  </Box>
)

const EmployeeHomePage: React.FC = () => {
  return (
    <React.Fragment>
      <HeaderHomepage />

      <StatNumbers />

      <Box row="main-sidebar">
        <CustomerAquisition />

        <ProspectsPerformance />
      </Box>

      <SectionHeader
        title="Opportunities"
        subtitle="Emerging"
        rightComponent={
          <a href="/opportunities">
            <strong>
              <small>Show More Opportunities</small>
            </strong>
          </a>
        }
      />

      <CustomerCards />

      <Box row="main-sidebar">
        <DocumentExceptions />

        <ProductPerformance />
      </Box>
    </React.Fragment>
  )
}

export default EmployeeHomePage
