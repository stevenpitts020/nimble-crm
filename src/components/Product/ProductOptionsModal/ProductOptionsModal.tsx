import React, { useState } from 'react'
import { Table, Modal, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import InlineEdit, { InputType } from 'riec'
import {
  IProductOptionsConfiguration,
  IProductOptionsConfigurationUpdate,
} from '../../../store'
import { Box } from '../../index'
import { institutionService } from '../../../services'

interface IProductOptionsModal {
  data: IProductOptionsConfiguration[]
  visible: boolean
  handleOk(): void
  handleCancel(): void
}

export const ProductOptionsModal: React.FC<IProductOptionsModal> = (
  props: IProductOptionsModal
) => {
  const editable = true

  const onProductOptionChange = async (
    product: IProductOptionsConfigurationUpdate
  ) => {
    await institutionService.updateProductOptions(product)
  }

  const [keys, setKeys] = useState(props.data.map(product => product.key))

  const onKeyChange = (id: string, parentId: string, idx: number) => async (
    key: string
  ) => {
    await onProductOptionChange({ id, parentId, key })
    const items = [...keys]
    items[idx] = key
    setKeys(items)
  }

  const [categories, setCategories] = useState(
    props.data.map(product => product.category)
  )

  const onCategoryChange = (
    id: string,
    parentId: string,
    idx: number
  ) => async (category: string) => {
    const items = [...categories]
    items[idx] = category
    setCategories(items)
  }

  const [titles, setTitles] = useState(props.data.map(product => product.title))

  const onTitleChange = (id: string, parentId: string, idx: number) => async (
    title: string
  ) => {
    const items = [...titles]
    items[idx] = title
    setTitles(items)
  }

  const [values, setValues] = useState(props.data.map(product => product.value))

  const onValueChange = (id: string, parentId: string, idx: number) => async (
    value: string
  ) => {
    const items = [...values]
    items[idx] = value
    setValues(items)
  }

  const columns: ColumnProps<IProductOptionsConfiguration>[] = [
    {
      title: 'Key',
      dataIndex: 'key',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <InlineEdit
            isDisabled={!editable}
            type={InputType.Text}
            value={keys[idx]}
            onChange={onKeyChange(product.id, product.parentId, idx)}
          />
        </Box>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <InlineEdit
            isDisabled={!editable}
            type={InputType.Text}
            value={categories[idx]}
            onChange={onCategoryChange(product.id, product.parentId, idx)}
          />
        </Box>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <InlineEdit
            isDisabled={!editable}
            type={InputType.Text}
            value={titles[idx]}
            onChange={onTitleChange(product.id, product.parentId, idx)}
          />
        </Box>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      align: 'left',
      render: (text, product, idx) => (
        <Box textAlign="left">
          <InlineEdit
            isDisabled={!editable}
            type={InputType.Text}
            value={values[idx]}
            onChange={onValueChange(product.id, product.parentId, idx)}
          />
        </Box>
      ),
    },
  ]

  return (
    <>
      <Modal
        title="Product Option Values"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        width={1000}
        footer={[]}
      >
        <Table
          className={'row-click'}
          rowKey="id"
          columns={columns}
          dataSource={props.data}
          pagination={{ position: [] }}
        />
        <Box
          marginTop="xl"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button type="primary">+ Add Field</Button>
        </Box>
      </Modal>
    </>
  )
}

ProductOptionsModal.defaultProps = {
  data: [],
  visible: false,
}
