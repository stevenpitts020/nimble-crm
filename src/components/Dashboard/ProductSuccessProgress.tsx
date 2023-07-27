import { Button, Dropdown, Menu, Row, Tag, Typography } from 'antd'
import React from 'react'

import { Box, CircularProgress, MiniPieChart, SectionTitle } from '..'
import { ArrowDownIcon, ArrowUpFilledIcon, PlusIcon } from '../Common/Icon/Icon'

interface IProductSuccessProgress {
  options?: object
}

// TODO pass this as props? or build from json
const dropdownMenuOptions = (
  <Menu>
    <Menu.Item key="1">Mortgage Refi</Menu.Item>
    <Menu.Item key="2">Personal Loan</Menu.Item>
    <Menu.Item key="3">Simple Checking</Menu.Item>
  </Menu>
)

const { Text, Title } = Typography

const BigDropdown = () => (
  <Box marginBottom="xl">
    <Dropdown overlay={dropdownMenuOptions} trigger={['click']}>
      <Title level={2} style={{ display: 'inline-block' }}>
        Simple Checking
        <ArrowDownIcon
          className="u-margin-left-lg"
          style={{ fontSize: '16px' }}
        />
      </Title>
    </Dropdown>
  </Box>
)

const SectionHead = () => (
  <Box className="ni-dashboard-product-progress--section-title">
    <Box col="flex">
      <SectionTitle subtitle="Product Success" />
    </Box>
    <Box col="flex">
      <Button type="link" ghost={true} size="small">
        <PlusIcon style={{ fontSize: '20px' }} />
      </Button>
    </Box>
  </Box>
)

const ProfitProgress = () => (
  <Row className="u-margin-bottom-xs">
    <Text strong={true} type="secondary" className="uppercase">
      Profitability
    </Text>
    <br />
    <Text className="h1" strong={true}>
      <Text className="h4">$</Text>12mm
    </Text>
    <br />
    <Row justify="start" align="middle" className="u-margin-bottom-lg">
      <Tag color="#5BE182">
        <ArrowUpFilledIcon /> 5%
      </Tag>
      <Text type="secondary">Growth</Text>
    </Row>
  </Row>
)

const ProfitabilityCol = () => (
  <Row justify="start" align="top">
    <Box col="flex" marginRight="md">
      <CircularProgress percent={80} size="small" width={110} />
    </Box>
    <Box col="flex">
      <ProfitProgress />
    </Box>
  </Row>
)

interface IchartProgressRow {
  percent: number
  product: string
}

// TODO Replace with actual donut
const ChartProgressRow = (props: IchartProgressRow) => (
  <Row className="ni-mini-chart-progress--row">
    <MiniPieChart value={props.percent} />
    <Text>
      <Text className="h3 bold">{props.percent}%</Text>&nbsp;
      <Text type="secondary">also enrolled</Text>&nbsp;{props.product}
    </Text>
  </Row>
)

const MiniChartsCol = () => (
  <React.Fragment>
    <ChartProgressRow percent={35} product="2Yr Deposit" />
    <ChartProgressRow percent={25} product="Heloc" />
    <ChartProgressRow percent={15} product="5Yr Deposit" />
  </React.Fragment>
)

export const ProductSuccessProgress: React.FC<IProductSuccessProgress> = () => {
  return (
    <div className="ni-dashboard-product-progress">
      <SectionHead />
      <BigDropdown />

      <Row justify="space-between" align="top">
        <Box col="flex" marginRight="xl">
          <ProfitabilityCol />
        </Box>
        <Box col="flex">
          <MiniChartsCol />
        </Box>
      </Row>
    </div>
  )
}
