import { Badge, Menu, Row, Typography } from 'antd'
import React from 'react'
import { Box, PillDropdown, Map } from '..'
import { generateSome } from '../../services/FakerService'
import DataTable from '../DataTable/DataTable'

interface IProductMarketCompetition {
  options?: object
}

// TODO pass this as props? or build from json
const dropdownMenuOptions = (
  <Menu>
    <Menu.Item key="1">Highest Rate</Menu.Item>
    <Menu.Item key="2">Lowest Rate</Menu.Item>
    <Menu.Item key="3">Highest Volume</Menu.Item>
    <Menu.Item key="4">Lowest Volume</Menu.Item>
    <Menu.Item key="5">Highest ROE</Menu.Item>
    <Menu.Item key="6">Lowest ROE</Menu.Item>
  </Menu>
)

const { Text } = Typography

const SectionHead = () => (
  <Row
    justify="space-between"
    align="middle"
    className="ni-dashboard-market-competition--section-title"
  >
    <Box col="flex">
      <Text strong={true} type="secondary" className="uppercase">
        Market Competition
      </Text>
    </Box>
    <Box col="flex">
      <PillDropdown
        options={dropdownMenuOptions}
        title="Highest Rate"
        block={true}
      />
    </Box>
  </Row>
)

export const ProductMarketCompetition: React.FC<IProductMarketCompetition> = () => {
  const ChartColors = ['#EB5757', '#F2994A', '#BB6BD9', '#56CCF2', '#27AE60']

  const data = generateSome(
    [
      'company.companyName',
      'random.number(50)|rate',
      'random.number(20)|volume',
      'random.number(20)|roe',
    ],
    5
  ).map((item: any, index: number) => {
    const color = ChartColors[index % ChartColors.length]
    return {
      Branch: (
        <Text strong={true} ellipsis={true} style={{ width: '135px' }}>
          <Badge color={color} />
          {item.companyName} Bank
        </Text>
      ),
      Volume: `$${item.volume}mm`,
      ROE: `${item.roe}%`,
      Rate: `${item.rate}%`,
    }
  })

  const dataMap = generateSome(['random.uuid|key', 'lat', 'lon'], 5).map(
    (item: any, index: number) => {
      return {
        ...item,
        ...data[index],
        color: ChartColors[index % ChartColors.length],
      }
    }
  )

  return (
    <div className="ni-dashboard-market-competition">
      <Row justify="space-between" align="top">
        <Box col="flex" className="ni-dashboard-market-competition--left">
          <SectionHead />
          <DataTable
            size="middle"
            pagination={false}
            autoCols={true}
            data={data}
          />
        </Box>
        <Box col="flex">
          <Map data={dataMap} />
        </Box>
      </Row>
    </div>
  )
}
