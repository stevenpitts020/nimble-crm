import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Typography } from 'antd'
import { ColumnProps } from 'antd/es/table'
import {
  IPaginationOptions,
  IInstitution,
  IInstitutionUpdate,
} from '../../../store'
import { Box } from '../../index'
import { PER_PAGE } from './constants'
import { TablePaginationConfig } from 'antd/lib/table'
import InlineEdit, { InputType } from 'riec'
import { InstitutionLogo } from '../../InstitutionLogo/InstitutionLogo'

interface ITableLayout {
  data: IInstitution[]
  loading?: boolean
  count: number
  pagination?: IPaginationOptions
  institutions?: IInstitution[]
  onInstitutionChange: (institution: IInstitutionUpdate) => void
  onTableChange?: (pagination: TablePaginationConfig) => void
}

const { Text } = Typography

export const InstitutionTableLayout: React.FC<ITableLayout> = (
  props: ITableLayout
) => {
  const editable = true

  const columns: ColumnProps<IInstitution>[] = []

  const history = useHistory()

  const [names, setNames] = useState(
    props.data.map(institution => institution.name)
  )

  const onNameChange = (id: string, idx: number) => async (name: string) => {
    await props.onInstitutionChange({ id, name })
    const items = [...names]
    items[idx] = name
    setNames(items)
  }

  const [domains, setDomains] = useState(
    props.data.map(institution => institution.domain)
  )

  const onDomainChange = (id: string, idx: number) => async (
    domain: string
  ) => {
    await props.onInstitutionChange({ id, domain })
    const items = [...domains]
    items[idx] = domain
    setDomains(items)
  }

  const [routingNumbers, setRoutingNumbers] = useState(
    props.data.map(institution => institution.routingNumber)
  )

  const onRoutingNumberChange = (id: string, idx: number) => async (
    routingNumber: string
  ) => {
    await props.onInstitutionChange({ id, routingNumber })
    const items = [...routingNumbers]
    items[idx] = routingNumber
    setRoutingNumbers(items)
  }

  columns.push({
    title: '',
    dataIndex: 'logo',
    align: 'left',
    render: (text, institution) => (
      <Box>
        {institution.logoUri.default && (
          <InstitutionLogo
            src={institution.logoUri.default}
            alt={institution.name}
            width={'100'}
          />
        )}
      </Box>
    ),
  })

  columns.push({
    title: 'Organization',
    dataIndex: 'name',
    align: 'left',
    render: (text, institution, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={names[idx]}
          onChange={onNameChange(institution.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Domain',
    dataIndex: 'domain',
    align: 'left',
    render: (text, institution, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={domains[idx]}
          onChange={onDomainChange(institution.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Routing #',
    dataIndex: 'routingNumber',
    align: 'left',
    render: (text, institution, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={routingNumbers[idx]}
          onChange={onRoutingNumberChange(institution.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: '# Branches',
    dataIndex: 'routingNumber',
    align: 'left',
    render: (text, institution, idx) => (
      <Box textAlign="left">
        <Text>{institution.branchesCount}</Text>
      </Box>
    ),
  })

  function onRow(record: IInstitution) {
    return {
      onClick: () => history.push(`/institutions/${record.domain}/settings`),
    }
  }

  return (
    <>
      <Table
        className={'row-click'}
        rowKey="id"
        columns={columns}
        dataSource={props.data}
        loading={props.loading}
        pagination={{
          current:
            Math.floor(
              (props.pagination?.offset || 0) /
                (props.pagination?.limit || PER_PAGE)
            ) + 1,
          pageSize: props.pagination?.limit || PER_PAGE,
          total: props.count,
        }}
        onChange={props.onTableChange}
        onRow={onRow}
      />
    </>
  )
}

InstitutionTableLayout.defaultProps = {
  loading: false,
  data: [],
}
