import React from 'react'
import { Badge, Empty, Button, Card, Tabs, Typography } from 'antd'
import { NotificationBadge, SectionTitle, Box } from '../../components'
import DataTable from '../../components/DataTable/DataTable'
import { generateSome } from '../../services/FakerService'

const { TabPane } = Tabs
const { Text, Title } = Typography

const CheckingNames = ['Simple Checking', 'Nimble Checking']
const CheckingData = generateSome(
  [
    'random.number(1)|name',
    'performance',
    'random.number(10)|hedgeRate',
    'random.number(5)|bsp',
    'random.number(10)|rate',
    'random.number(99)|offering',
    'random.number(5)|amount',
    'until|term',
    'date.month|expiration',
    'random.number(50)|fees',
    'recurrence',
  ],
  2
).map((row: any, index: number) => {
  return {
    ' ': (
      <div className="u-align-left">
        <Text strong={true} className="h5">
          {CheckingNames[row.name]}
        </Text>
        <div>
          <Text strong={true} className="h5 ni-color-light-teal">
            #{3 + index * 11}
          </Text>{' '}
          <Text type="secondary">{row.performance}</Text>
        </div>
      </div>
    ),
    'Hedge Rate': (
      <div className="u-align-left">
        <Text className="ni-color-gray" strong={true}>
          WSJ Prime
        </Text>
        <div>{(row.hedgeRate / Math.PI).toFixed(2)}</div>
      </div>
    ),
    BSP: <Text className="ni-color-gray">-{row.bsp * 100}</Text>,
    Rate: (row.rate / Math.PI).toFixed(2),
    Offering: (
      <Text className="ni-color-gray" strong={true}>
        {(row.offering / 100).toFixed(2)}
      </Text>
    ),
    Amount: (
      <Text className="ni-color-gray">{`$${row.amount * 10}k - $${row.amount *
        20}k`}</Text>
    ),
    Term: `${row.term}`,
    Expiration: `${row.expiration}`,
    Fees: (row.fees / Math.PI).toFixed(2) + '%',
    Recurrence: `${row.recurrence}`,
    'Cross-sell':
      index === 1 ? <Badge color={'red'} /> : <Badge color={'green'} />,
    key: index,
  }
})

const SavingsNames = ['Nimble Savings']
const SavingsDescription = [1, 3, 5, 10]
const SavingsData = generateSome(
  [
    'random.number(1)|name',
    'performance',
    'random.number(10)|hedgeRate',
    'random.number(100)|bsp',
    'random.number(1)|rate',
    'random.number(99)|offering',
    'random.number(5)|amount',
    'until|term',
    'date.month|expiration',
    'random.number(50)|fees',
    'recurrence',
  ],
  4
).map((row: any, index: number) => {
  return {
    ' ': (
      <div className="u-align-left">
        <Text strong={true} className="h5">
          {SavingsNames[index] || '\u00A0'}{' '}
        </Text>
        <div>
          <Text strong={true} className="h5 ni-color-light-teal">
            {' '}
            #{3 + index * 11}
          </Text>{' '}
          <Text type="secondary">{row.performance}</Text>
        </div>
      </div>
    ),
    'Hedge Rate': (
      <div className="u-align-left">
        <Text className="ni-color-gray" strong={true}>
          {SavingsDescription[index]} year treasury
        </Text>
        <div>{(row.hedgeRate / Math.PI).toFixed(2)}</div>
      </div>
    ),
    '+/-': <Text className="ni-color-gray">{row.bsp / 100}</Text>,
    Fixed: parseInt(row.rate, 10) === 1 ? 'Yes' : 'No',
    Offering: (
      <Text className="ni-color-gray" strong={true}>
        {(row.offering / 100).toFixed(2)}
      </Text>
    ),
    Amount: (
      <Text className="ni-color-gray">
        {`$${row.amount * 10}k - $${row.amount * 20}k`}
      </Text>
    ),
    Term: `${row.term}`,
    Expiration: `${row.expiration}`,
    Fees: (row.fees / Math.PI).toFixed(2) + '%',
    Recurrence: `${row.recurrence}`,
    'Cross-sell':
      index === 1 ? <Badge color={'red'} /> : <Badge color={'green'} />,
    key: index,
  }
})

const DepositNames = [
  'Fixed-Rate Certificates of Deposit',
  'CD Plus Certificates of Deposit',
]
const DepositDescription = ['WSJ Prime', 'LIBOR']
const DepositData = generateSome(
  [
    'random.number(1)|name',
    'performance',
    'random.number(10)|hedgeRate',
    'random.number(100)|bsp',
    'random.number(1)|rate',
    'random.number(99)|offering',
    'random.number(5)|amount',
    'until|term',
    'date.month|expiration',
    'random.number(50)|fees',
    'recurrence',
  ],
  2
).map((row: any, index: number) => {
  return {
    ' ': (
      <div className="u-align-left">
        <Text strong={true} className="h5">
          {DepositNames[index] || '\u00A0'}
        </Text>
        <div>
          <Text strong={true} className="h5 ni-color-light-teal">
            #{3 + index * 11}
          </Text>{' '}
          <Text type="secondary">{row.performance}</Text>
        </div>
      </div>
    ),
    'Hedge Rate': (
      <div className="u-align-left">
        <Text className="ni-color-gray" strong={true}>
          {DepositDescription[index]}
        </Text>
        <div>{(row.hedgeRate / Math.PI).toFixed(2)}</div>
      </div>
    ),
    '+/-': <Text className="ni-color-gray">{row.bsp / 100}</Text>,
    Fixed: parseInt(row.rate, 10) === 1 ? 'Yes' : 'No',
    Offering: (
      <Text className="ni-color-gray" strong={true}>
        {(row.offering / 100).toFixed(2)}
      </Text>
    ),
    Amount: '',
    Term: '',
    Expiration: '',
    Fees: (row.fees / Math.PI).toFixed(2) + '%',
    Recurrence: `${row.recurrence}`,
    'Cross-sell':
      index === 1 ? <Badge color={'red'} /> : <Badge color={'green'} />,
    key: index,
  }
})

const PricingPage = () => {
  return (
    <React.Fragment>
      <Box col="flex" className="ni-section-header--clients">
        <SectionTitle>Pricing</SectionTitle>

        <NotificationBadge />
      </Box>

      <Tabs
        defaultActiveKey="1"
        size="large"
        tabBarExtraContent={
          <div>
            <Button type="primary" shape="round" ghost={true}>
              Import Products
            </Button>
            &nbsp;
            <Button type="primary" shape="round">
              New Product
            </Button>
          </div>
        }
      >
        <TabPane tab="Deposits" key="1">
          <Title
            level={4}
            type="secondary"
            className="ni-section-break"
            style={{ marginTop: '0px' }}
          >
            Checking
          </Title>
          <Card bordered={false} size="small" className="ni-table-prospects">
            <DataTable
              align="center"
              autoCols={true}
              data={CheckingData}
              pagination={false}
            />
          </Card>

          <Title level={4} type="secondary" className="ni-section-break">
            Savings
          </Title>

          <Card bordered={false} size="small" className="ni-table-prospects">
            <DataTable
              align="center"
              autoCols={true}
              data={SavingsData}
              pagination={false}
            />
          </Card>

          <Title level={4} type="secondary" className="ni-section-break">
            Certified Deposits
          </Title>

          <Card bordered={false} size="small" className="ni-table-prospects">
            <DataTable
              align="center"
              autoCols={true}
              data={DepositData}
              pagination={false}
            />
          </Card>
        </TabPane>
        <TabPane tab="Consumer" key="2">
          <Empty description={<span>No content, yet.</span>} />
        </TabPane>
        <TabPane tab="Mortage" key="3">
          <Empty description={<span>No content, yet.</span>} />
        </TabPane>
        <TabPane tab="HELOC" key="4">
          <Empty description={<span>No content, yet.</span>} />
        </TabPane>
      </Tabs>
    </React.Fragment>
  )
}

export default PricingPage
