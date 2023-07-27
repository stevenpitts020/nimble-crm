import React, { useState } from 'react'
import { Table, Typography, Button, Input, Select, Slider } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { IProduct, IBaseRate } from '../../../store'
import { Box } from '../../index'
import { ProductOptionsModal } from '../ProductOptionsModal/ProductOptionsModal'

interface ITableLayout {
  data: IProduct[]
  loading: boolean
  products?: IProduct[]
  baseRate: IBaseRate[]
}

const { Text } = Typography
const { Option, OptGroup } = Select

const marks = {
  0: '0',
  150000: '150,000',
  300000: '300,000',
}

export const ProductTableLayout: React.FC<ITableLayout> = (
  props: ITableLayout
) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [productIndex, setProductIndex] = useState(0)

  const showModal = (index: number) => {
    setProductIndex(index)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const optionsOnClickHandler = (index: number) => () => showModal(index)

  const columns: ColumnProps<IProduct>[] = [
    {
      title: 'Name of Product',
      dataIndex: 'name',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Text>{product.name}</Text>
        </Box>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Text>{product.category}</Text>
        </Box>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Text>{product.sku}</Text>
        </Box>
      ),
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Text>{`${product.summary.slice(0, 15)}...`}</Text>
        </Box>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Select defaultValue="debit" style={{ minWidth: '8rem' }}>
            <OptGroup label="Card">
              <Option value="debit">Debit</Option>
              <Option value="credit">Credit</Option>
            </OptGroup>
            <OptGroup label="Deposit">
              <Option value="checking">Checking</Option>
              <Option value="savings">Savings</Option>
              <Option value="certificate">Certificate</Option>
            </OptGroup>
            <OptGroup label="Loan">
              <Option value="loc">LOC</Option>
              <Option value="term">Term</Option>
              <Option value="residential">Residential</Option>
              <Option value="consumer">Consumer</Option>
            </OptGroup>
          </Select>
        </Box>
      ),
    },
    {
      title: 'Base Rate',
      dataIndex: 'baseRate',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left" style={{ display: 'flex' }}>
          <Select
            defaultValue={props.baseRate[0]?.value}
            style={{ minWidth: '10rem', marginRight: '10px' }}
          >
            {props.baseRate.map(baseRate => (
              <Option
                value={baseRate.value}
                key={baseRate.name}
              >{`${baseRate.name}-${baseRate.value}`}</Option>
            ))}
          </Select>
          <Select defaultValue="positive" style={{ marginRight: '10px' }}>
            <Option value="positive">+</Option>
            <Option value="negative">-</Option>
          </Select>
          <Input
            defaultValue={0}
            addonAfter="bps"
            style={{ minWidth: '6rem' }}
          />
        </Box>
      ),
    },
    {
      title: 'F/V',
      dataIndex: 'fv',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Select defaultValue="fixed">
            <Option value="fixed">Fixed</Option>
            <Option value="variable">Variable</Option>
          </Select>
        </Box>
      ),
    },
    {
      title: 'Update',
      dataIndex: 'fv',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Select defaultValue="daily" style={{ minWidth: '6rem' }}>
            <Option value="daily">Daily</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
            <Option value="quarterly">Quarterly</Option>
            <Option value="annualy">Annually</Option>
          </Select>
        </Box>
      ),
    },
    {
      title: '',
      dataIndex: 'fv',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left" style={{ minWidth: '125px' }}>
          <Slider
            range={true}
            marks={marks}
            defaultValue={[100, 100000]}
            min={0}
            max={300000}
            step={1000}
          />
        </Box>
      ),
    },
    {
      title: 'Min. Credit',
      dataIndex: 'minCredit',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Select defaultValue="250-579">
            <Option value="250-579">250-579</Option>
            <Option value="300-579">300-579</Option>
            <Option value="580-669">580-669</Option>
            <Option value="670-739">670-739</Option>
            <Option value="740-799">740-799</Option>
            <Option value="800-855">800-855</Option>
          </Select>
        </Box>
      ),
    },
    {
      title: 'Term (mo.)',
      dataIndex: 'term',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Select defaultValue="3">
            <Option value="3">3</Option>
            <Option value="6">6</Option>
            <Option value="9">9</Option>
            <Option value="12">12</Option>
            <Option value="24">24</Option>
            <Option value="36">36</Option>
            <Option value="48">48</Option>
            <Option value="60">60</Option>
            <Option value="72">72</Option>
            <Option value="84">84</Option>
            <Option value="96">96</Option>
            <Option value="108">108</Option>
            <Option value="120">120</Option>
            <Option value="132">132</Option>
            <Option value="144">144</Option>
            <Option value="156">156</Option>
            <Option value="168">168</Option>
            <Option value="180">180</Option>
            <Option value="192">192</Option>
            <Option value="204">204</Option>
            <Option value="216">216</Option>
            <Option value="228">228</Option>
            <Option value="240">240</Option>
            <Option value="252">252</Option>
            <Option value="264">264</Option>
            <Option value="276">276</Option>
            <Option value="288">288</Option>
            <Option value="300">300</Option>
            <Option value="312">312</Option>
            <Option value="324">324</Option>
            <Option value="336">336</Option>
            <Option value="348">348</Option>
            <Option value="360">360</Option>
          </Select>
        </Box>
      ),
    },
    {
      title: 'Amortization',
      dataIndex: 'amortization',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <Select defaultValue="300">
            <Option value="300">300</Option>
          </Select>
        </Box>
      ),
    },
    {
      title: '',
      dataIndex: 'options',
      align: 'left',
      render: (text, product, idx) => (
        <Box>
          <Button onClick={optionsOnClickHandler(idx)}>Options</Button>
        </Box>
      ),
    },
  ]

  return (
    <>
      <Table
        className={'row-click'}
        rowKey="id"
        columns={columns}
        dataSource={props.data}
        loading={props.loading}
        scroll={{ x: 1300 }}
      />
      <ProductOptionsModal
        data={props.data[productIndex]?.options}
        visible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  )
}

ProductTableLayout.defaultProps = {
  data: [],
  loading: false,
}
