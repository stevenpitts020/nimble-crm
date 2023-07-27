import { Tabs, Badge, Card, Menu, Typography } from 'antd'
import React from 'react'
import {
  Box,
  FilterDateMenu,
  ILineChartData,
  IPieChartData,
  LineChart,
  NotificationBadge,
  PieChart,
  PillDropdown,
  SearchBar,
  SectionHeader,
  SectionTitle,
  StatCard,
} from '../../components'
import DataTable from '../../components/DataTable/DataTable'
import { generateSome, uuid } from '../../services/FakerService'

import { ProductMarketCompetition } from '../../components/Dashboard/ProductMarketCompetion'
import { ProductSuccessProgress } from '../../components/Dashboard/ProductSuccessProgress'

const { Text, Title } = Typography
const { TabPane } = Tabs

const ProfitMenuOptions = (
  <Menu>
    <Menu.Item key="1">High Profit</Menu.Item>
    <Menu.Item key="2">Low Profit</Menu.Item>
    <Menu.Item key="3">High Cross-Sell Ratio</Menu.Item>
    <Menu.Item key="4">Low Cross-Sell Ratio</Menu.Item>
  </Menu>
)

const EmployeeMenuOptions = (
  <Menu>
    <Menu.Item key="1">High Profit</Menu.Item>
    <Menu.Item key="2">Low Profit</Menu.Item>
    <Menu.Item key="3">High Cross-Sell Ratio</Menu.Item>
    <Menu.Item key="4">Low Cross-Sell Ratio</Menu.Item>
  </Menu>
)

const StatCards = () => (
  <div className="ni-stat-cards">
    <StatCard
      value="542"
      label="pipeline"
      subtitle="Likelihood 10%"
      color="green"
    />
    <StatCard value="300" label="not enganged" color="orange" />
    <StatCard value="542" label="in progress" color="blue" />
    <StatCard value="576" label="conversions" />
  </div>
)

const EmployeePerformance = () => {
  const data = generateSome(
    [
      'name.firstName',
      'name.lastName',
      'name.jobTitle',
      'random.number(20)|profit',
    ],
    5
  ).map((item: any, index: number) => {
    return {
      Employee: (
        <Text
          strong={true}
          ellipsis={true}
          className="break-text"
          style={{ maxWidth: '130px' }}
        >
          <b>#{index + 1}</b>
          &nbsp;
          {item.firstName} {item.lastName}
        </Text>
      ),
      ' ': (
        <Text
          ellipsis={true}
          type="secondary"
          className="break-text"
          style={{ maxWidth: '110px' }}
        >
          {item.jobTitle}
        </Text>
      ),
      Profitability: <div style={{ float: 'right' }}>{item.profit}</div>,
    }
  })

  return (
    <Card
      bordered={false}
      title={
        <SectionTitle break={true} subtitle="Employee">
          Performance
        </SectionTitle>
      }
      extra={
        <PillDropdown
          options={EmployeeMenuOptions}
          title="High Profit"
          block={true}
        />
      }
    >
      <DataTable pagination={false} size="middle" autoCols={true} data={data} />
    </Card>
  )
}

const ProductPerformance = () => {
  const ChartColors = ['#2E9DDC', '#56CCF2', '#C2CAE8', '#53599A', '#7D70BA']

  const data = generateSome(
    [
      'finance.accountName',
      'random.number(20)|profit',
      'random.number(20)|volume',
    ],
    5
  ).map((item: any, index: any) => {
    return {
      Product: (
        <Text strong={true} ellipsis={true} style={{ maxWidth: '200px' }}>
          <Badge color={ChartColors[index % ChartColors.length]} />
          {item.accountName}
        </Text>
      ),
      Profit: `${item.profit}%`,
      Volume: <div style={{ float: 'right' }}>${item.volume}mm</div>,
      id: uuid(),
    }
  })

  const piedata = generateSome(
    ['product|category', 'random.number(200)|value'],
    5
  ) as IPieChartData[]

  return (
    <Card
      bordered={false}
      title={
        <SectionTitle break={true} subtitle="Product">
          Performance
        </SectionTitle>
      }
      extra={
        <PillDropdown
          options={ProfitMenuOptions}
          title="High Profit"
          block={true}
        />
      }
    >
      <div className="u-align-center u-margin-bottom-xl">
        <PieChart data={piedata} />
      </div>
      <DataTable pagination={false} size="middle" autoCols={true} data={data} />
    </Card>
  )
}

const ProductSuccess = () => {
  return (
    <Card bordered={false} size="small">
      <ProductSuccessProgress />
      <hr />
      <ProductMarketCompetition />
    </Card>
  )
}

// TODO
const MarketProfit = () => {
  const months = ' Jun Jul Aug Set Oct Nov Dec'.split(' ')

  const dataMargin = months.map(month => {
    return {
      key: month,
      label: month + ' 2019',
      value: (25 + Math.random() * 30).toFixed(2),
    }
  }) as ILineChartData[]

  const dataRatio = months.map(month => {
    return {
      key: month,
      label: month + ' 2019',
      value: (1 + Math.random() * 5).toFixed(2),
    }
  }) as ILineChartData[]

  const markerProfitTitle = (
    <SectionTitle subtitle="Market">Profitability</SectionTitle>
  )
  const tab1Title = (
    <Box className="ni-chart-tabs--tab-inside">
      <Text className="ni-color-dark">Profit Margin</Text>
      <Title level={3}>
        $ 901k
        <Text className="ni-chart-tabs--tab-inside--profit ni-color-success">
          + 5%
        </Text>
      </Title>
    </Box>
  )
  const tab2Title = (
    <Box className="ni-chart-tabs--tab-inside">
      <Text className="ni-color-dark">Efficiency Ratio</Text>
      <Title level={3}>
        3x
        <Text className="ni-chart-tabs--tab-inside--profit ni-color-danger">
          - 5%
        </Text>
      </Title>
    </Box>
  )

  return (
    <Card bordered={false} size="small">
      <Tabs
        className="ni-chart-tabs"
        tabPosition="top"
        type="card"
        defaultActiveKey="x"
        tabBarExtraContent={markerProfitTitle}
      >
        <TabPane tab={tab1Title} key="x">
          <LineChart data={dataMargin} />
        </TabPane>
        <TabPane tab={tab2Title} key="z">
          <LineChart
            data={dataRatio}
            tooltipText={`[bold font-size: 20px;]{valueY.value}x[/]\n[font-size: 12px; #999]{label}[/]`}
          />
        </TabPane>
      </Tabs>
    </Card>
  )
}

const TopRightHeader = () => (
  <Box marginLeft="auto" row="flex-center" style={{ minWidth: '330px' }}>
    <FilterDateMenu title="Showing Data for:" />

    <NotificationBadge />
  </Box>
)

const ExecutiveHomePage: React.FC = () => {
  return (
    <React.Fragment>
      <SectionHeader>
        <SearchBar />
        <TopRightHeader />
      </SectionHeader>
      <StatCards />

      <Box row="main-sidebar">
        <Box col="main">
          <MarketProfit />
          <ProductSuccess />
        </Box>
        <Box col="sidebar">
          <ProductPerformance />
          <EmployeePerformance />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default ExecutiveHomePage
