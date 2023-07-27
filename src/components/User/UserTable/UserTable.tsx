import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Col, Row, Skeleton, Select } from 'antd'
import { UserTableLayout } from './UserTableLayout'
import {
  UserListContext,
  initialSearchOptions,
} from '../../../store/UserListProvider'
import { log, userService } from '../../../services'
import { PER_PAGE } from './constants'
import { TablePaginationConfig } from 'antd/lib/table'
import { IUserUpdate } from '../../../store'
import Search from 'antd/lib/input/Search'
import { ProfileContext } from '../../../store/ProfileProvider'
import { useInstitutionBranches } from '../../../hooks/useInstitutionBranches'
import { DefaultOptionType } from 'antd/lib/select'

const { Option } = Select

interface IUserTableProps {
  notifyDataChanged: () => void
  watchDataChanged: boolean
}

export const UserTable: React.FC<IUserTableProps> = (
  props: IUserTableProps
) => {
  const history = useHistory()
  const { state, list } = useContext(UserListContext)

  const isLoading = state.status === 'loading'
  const { profileState } = useContext(ProfileContext)

  const me = profileState.profile
  const meBranch = me?.branch!

  const { data, status } = useInstitutionBranches(
    profileState.profile?.institution?.id!
  )

  const branchOptions =
    status === 'error'
      ? [{ value: meBranch.id, label: meBranch.name }]
      : data?.map(datum => {
          return {
            value: datum?.id,
            label: datum?.name,
          }
        })

  const branchOptionsElm = branchOptions?.map(b => (
    <Option value={b.value} key={b.value}>
      {b.label}
    </Option>
  ))

  React.useEffect(() => {
    const queryStr = new URLSearchParams(history.location.search)
    const limit = parseInt(queryStr.get('limit') || PER_PAGE.toString(), 10)
    const offset = parseInt(queryStr.get('offset') || '0', 10)
    const search = queryStr.get('search') || ''
    const branch = queryStr.get('branch') || ''

    list({
      ...initialSearchOptions,
      limit,
      offset,
      search,
      branch,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search, props.watchDataChanged])

  const handleTableChange = (pagination: TablePaginationConfig) => {
    log.info(pagination, 'handleTableChange')

    const limit = pagination.pageSize || PER_PAGE
    const offset = limit * ((pagination.current || 1) - 1)

    history.push(
      `${
        history.location.pathname
      }?limit=${limit}&offset=${offset}&search=${state.pagination.search ||
        ''}&branch=${state.pagination.branch}`
    )
  }

  const onUserChange = async (user: IUserUpdate) => {
    await userService.update(user)
  }

  const handleSearchChange = (newSearch: string) => {
    history.push(
      `${history.location.pathname}?search=${newSearch || ''}&branch=${state
        .pagination.branch || ''}`
    )
  }

  const onBranchSelect = (branchId: string) => {
    history.push(
      `${history.location.pathname}?search=${state.pagination.search ||
        ''}&branch=${branchId}`
    )
  }

  const onBranchSelectClear = () => {
    onBranchSelect('')
  }

  if (isLoading) {
    return (
      <Card bordered={false} size="default">
        <Skeleton active={true} />
      </Card>
    )
  }

  const filterOption = (
    input: string,
    option: DefaultOptionType | undefined
  ): boolean => {
    return (
      (option?.props.children || '')
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
    )
  }

  return (
    <>
      <Row style={{ paddingBottom: '8px' }}>
        <Col span={6}>
          <Search
            defaultValue={state.pagination.search}
            placeholder="Search by name"
            enterButton="Search"
            size="large"
            allowClear={true}
            bordered={true}
            onSearch={handleSearchChange}
          />
        </Col>
        <Col span={6} offset={12}>
          <Select
            size="large"
            style={{ width: '100%' }}
            allowClear={true}
            placeholder="Filter by branch"
            onSelect={onBranchSelect}
            onClear={onBranchSelectClear}
            defaultValue={
              state.pagination.branch !== ''
                ? state.pagination.branch
                : undefined
            }
            showSearch={true}
            filterOption={filterOption}
          >
            q {branchOptionsElm}
          </Select>
        </Col>
      </Row>
      <Card bordered={false} size="small">
        <UserTableLayout
          data={state.users}
          loading={isLoading}
          count={state.count}
          pagination={state.pagination}
          onUserChange={onUserChange}
          onTableChange={handleTableChange}
        />
      </Card>
    </>
  )
}
