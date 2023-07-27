import React, { useState } from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import {
  IPaginationOptions,
  IInstitutionBranchUpdate,
  IInstitutionBranch,
} from '../../../store'
import { Box } from '../../index'
import { PER_PAGE } from './constants'
import { TablePaginationConfig } from 'antd/lib/table'
import InlineEdit, { InputType } from 'riec'
import { InstitutionLogo } from '../../InstitutionLogo/InstitutionLogo'

interface ITableLayout {
  data: IInstitutionBranch[]
  loading?: boolean
  count: number
  pagination?: IPaginationOptions
  institutionBranches?: IInstitutionBranch[]
  onInstitutionBranchChange: (
    institutionBranch: IInstitutionBranchUpdate
  ) => void
  onTableChange?: (pagination: TablePaginationConfig) => void
}

export const InstitutionBranchTableLayout: React.FC<ITableLayout> = (
  props: ITableLayout
) => {
  const editable = true

  const columns: ColumnProps<IInstitutionBranch>[] = []

  const [names, setNames] = useState(
    props.data.map(institutionBranch => institutionBranch.name)
  )

  const onNameChange = (id: string, idx: number) => async (name: string) => {
    await props.onInstitutionBranchChange({ id, name })
    const items = [...names]
    items[idx] = name
    setNames(items)
  }

  const [externalIds, setExternalIds] = useState(
    props.data.map(institutionBranch => institutionBranch.externalId)
  )

  const onExternalIdChange = (id: string, idx: number) => async (
    externalId: string
  ) => {
    await props.onInstitutionBranchChange({ id, externalId })
    const items = [...externalIds]
    items[idx] = externalId
    setExternalIds(items)
  }

  const [routingNumbers, setRoutingNumber] = useState(
    props.data.map(
      institutionBranch => institutionBranch.routingNumber || '---'
    )
  )

  const onRoutingNumberChange = (id: string, idx: number) => async (
    routingNumber: string
  ) => {
    await props.onInstitutionBranchChange({ id, routingNumber })
    const items = [...routingNumbers]
    items[idx] = routingNumber
    setRoutingNumber(items)
  }

  const [streets, setStreets] = useState(
    props.data.map(institutionBranch => institutionBranch.street || '---')
  )

  const onStreetChange = (id: string, idx: number) => async (
    street: string
  ) => {
    await props.onInstitutionBranchChange({ id, street })
    const items = [...streets]
    items[idx] = street
    setStreets(items)
  }

  const [streets2, setStreets2] = useState(
    props.data.map(institutionBranch => institutionBranch.street2 || '---')
  )

  const onStreet2Change = (id: string, idx: number) => async (
    street2: string
  ) => {
    await props.onInstitutionBranchChange({ id, street2 })
    const items = [...streets2]
    items[idx] = street2
    setStreets2(items)
  }

  const [cities, setCities] = useState(
    props.data.map(institutionBranch => institutionBranch.city || '---')
  )

  const onCitiesChange = (id: string, idx: number) => async (city: string) => {
    await props.onInstitutionBranchChange({ id, city })
    const items = [...cities]
    items[idx] = city
    setCities(items)
  }

  const [states, setStates] = useState(
    props.data.map(institutionBranch => institutionBranch.state || '---')
  )

  const onStateChange = (id: string, idx: number) => async (state: string) => {
    await props.onInstitutionBranchChange({ id, state })
    const items = [...states]
    items[idx] = state
    setStates(items)
  }

  const [zips, setZips] = useState(
    props.data.map(institutionBranch => institutionBranch.zip || '---')
  )

  const onZipChange = (id: string, idx: number) => async (zip: string) => {
    await props.onInstitutionBranchChange({ id, zip })
    const items = [...zips]
    items[idx] = zip
    setZips(items)
  }

  const [actives, setActives] = useState(
    props.data.map(
      institutionBranch => (institutionBranch.active ? 'yes' : 'no') as string
    )
  )

  const onActiveChange = (id: string, idx: number) => async (
    active: string
  ) => {
    if (active !== 'yes' && active !== 'no') {
      return
    }
    await props.onInstitutionBranchChange({
      id,
      active: active === 'yes',
    })
    const items = [...actives]
    items[idx] = active
    setActives(items)
  }

  columns.push({
    title: '',
    dataIndex: 'logo',
    align: 'left',
    render: (text, institutionBranch) => (
      <Box>
        {institutionBranch?.institution?.logoUri?.default && (
          <InstitutionLogo
            src={institutionBranch.institution.logoUri?.default as string}
            alt={institutionBranch.institution.name}
            width={'100'}
          />
        )}
      </Box>
    ),
  })

  columns.push({
    title: 'Branch Name',
    dataIndex: 'name',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={names[idx]}
          onChange={onNameChange(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'ID',
    dataIndex: 'externalId',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={externalIds[idx]}
          onChange={onExternalIdChange(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Routing #',
    dataIndex: 'routingNumber',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={routingNumbers[idx]}
          onChange={onRoutingNumberChange(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Street',
    dataIndex: 'street',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={streets[idx]}
          onChange={onStreetChange(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Street2',
    dataIndex: 'street2',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={streets2[idx]}
          onChange={onStreet2Change(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'City',
    dataIndex: 'city',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={cities[idx]}
          onChange={onCitiesChange(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'State',
    dataIndex: 'state',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={states[idx]}
          onChange={onStateChange(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Zip',
    dataIndex: 'zip',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={zips[idx]}
          onChange={onZipChange(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Active',
    dataIndex: 'active',
    align: 'left',
    render: (text, institutionBranch, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={actives[idx]}
          onChange={onActiveChange(institutionBranch.id, idx)}
        />
      </Box>
    ),
  })

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
      />
    </>
  )
}

InstitutionBranchTableLayout.defaultProps = {
  loading: false,
  data: [],
}
