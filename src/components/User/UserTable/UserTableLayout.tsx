import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { Table, Typography } from 'antd'
import Helpers from '../../../utils/FormatHelper'
import { ColumnProps } from 'antd/es/table'
import {
  IPaginationOptions,
  ISelectOptions,
  IUser,
  IUserUpdate,
} from '../../../store'
import { Box } from '../../index'
import { PER_PAGE } from './constants'
import { TablePaginationConfig } from 'antd/lib/table'
import InlineEdit, { InputType } from 'riec'
import Select, { MultiValue, SingleValue } from 'react-select'
import { AuthContextStore } from '../../../store/AuthProvider'
import { ProfileContext } from '../../../store/ProfileProvider'
import { useInstitutionBranches } from '../../../hooks/useInstitutionBranches'
import Toggle from 'react-toggle'

interface ITableLayout {
  data: IUser[]
  loading?: boolean
  count: number
  pagination?: IPaginationOptions
  users?: IUser[]
  onUserChange: (user: IUserUpdate) => void
  onTableChange?: (pagination: TablePaginationConfig) => void
}

const { Text } = Typography

export const UserTableLayout: React.FC<ITableLayout> = (
  props: ITableLayout
) => {
  const editable = true

  const columns: ColumnProps<IUser>[] = []

  const { profileState } = useContext(ProfileContext)

  const me = profileState.profile
  const org = me?.institution!
  const branch = me?.branch!

  const { data, status } = useInstitutionBranches(
    profileState.profile?.institution?.id!
  )

  // FIXME: we allow institutions which do not match `me` for super-admin
  // to maintain this we must track ever user's list of branches as we
  // do for first and last names
  const branchOptions =
    status === 'error'
      ? [{ value: branch.id, label: branch.name }]
      : data?.map(datum => {
          return {
            value: datum?.id,
            label: datum?.name,
          }
        })

  const {
    isSuperAdmin,
    isInstitutionAdmin,
    allRoles,
    assignableRoles,
    isSubordinate,
  } = useContext(AuthContextStore)

  const [lastNames, setLastNames] = useState(
    props.data.map(user => user.lastName)
  )

  const onLastNameChange = (id: string, idx: number) => async (
    lastName: string
  ) => {
    await props.onUserChange({ id, lastName })
    const items = [...lastNames]
    items[idx] = lastName
    setLastNames(items)
  }

  const [firstNames, setFirstNames] = useState(
    props.data.map(user => user.firstName)
  )

  const onFirstNameChange = (id: string, idx: number) => async (
    firstName: string
  ) => {
    await props.onUserChange({ id, firstName })
    const items = [...firstNames]
    items[idx] = firstName
    setFirstNames(items)
  }

  const [emails, setEmails] = useState(props.data.map(user => user.email))
  const [phones, setPhones] = useState(
    props.data.map(user => user?.phone || '<not configured>')
  )

  const onEmailChange = (id: string, idx: number) => async (email: string) => {
    await props.onUserChange({ id, email })
    const items = [...emails]
    items[idx] = email
    setEmails(items)
  }

  const onPhoneChange = (id: string, idx: number) => async (phone: string) => {
    await props.onUserChange({ id, phone })
    const items = [...phones]
    items[idx] = phone
    setPhones(items)
  }

  const onRolesChange = (id: string) => (
    options: MultiValue<ISelectOptions>
  ) => {
    props.onUserChange({ id, roles: options?.map(selected => selected.value) })
  }

  const onBranchChange = (id: string) => (
    option: SingleValue<ISelectOptions>
  ) => {
    if (option) props.onUserChange({ id, branchId: option.value })
  }

  const onStatusChange = (id: string) => (event: any) => {
    if (!_.isNil(event?.target?.checked))
      props.onUserChange({
        id,
        status: event.target.checked ? 'ACTIVE' : 'DEACTIVATED',
      })
  }

  columns.push({
    title: 'Name',
    dataIndex: 'name',
    render: (text, user, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          value={lastNames[idx]}
          onChange={onLastNameChange(user.id, idx)}
        />
        ,&nbsp;
        <InlineEdit
          isDisabled={!editable}
          value={firstNames[idx]}
          onChange={onFirstNameChange(user.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Email',
    dataIndex: 'email',
    align: 'left',
    render: (text, user, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Email}
          value={emails[idx]}
          onChange={onEmailChange(user.id, idx)}
        />
      </Box>
    ),
  })

  columns.push({
    title: 'Phone',
    dataIndex: 'phone',
    align: 'left',
    render: (text, user, idx) => (
      <Box textAlign="left">
        <InlineEdit
          isDisabled={!editable}
          type={InputType.Text}
          value={phones[idx]}
          onChange={onPhoneChange(user.id, idx)}
        />
      </Box>
    ),
  })

  if (isSuperAdmin(me))
    columns.push({
      title: 'Institution',
      dataIndex: 'institution',
      align: 'left',
      render: (text, user) => (
        <Text className="ni-color-dark">{user?.institution?.name}</Text>
      ),
    })

  if (isInstitutionAdmin(me))
    columns.push({
      title: 'Branch',
      dataIndex: 'branch',
      align: 'left',
      render: (text, user) => (
        <Select
          name="branch"
          className="user-branch"
          isMulti={false}
          isDisabled={user?.institution?.id !== org.id}
          options={user?.institution?.id === org.id ? branchOptions : undefined}
          defaultValue={
            user.branch
              ? {
                  value: user?.branch?.id,
                  label: user?.branch?.name,
                }
              : undefined
          }
          onChange={onBranchChange(user.id)}
        />
      ),
    })

  columns.push({
    title: 'Roles',
    dataIndex: 'roles',
    align: 'center',
    render: (text, user) => (
      <Select
        name="roles"
        className="multi-select user-roles"
        isMulti={true}
        isDisabled={isSubordinate(me, user)}
        options={assignableRoles(me)}
        defaultValue={user.roles?.map(
          role =>
            _.find(allRoles(), { value: role }) || {
              value: role,
              label: role,
            }
        )}
        onChange={onRolesChange(user.id)}
      />
    ),
  })

  columns.push({
    title: 'Last Login',
    dataIndex: 'last-login',
    align: 'left',
    render: (text, user) => (
      <Text className="ni-color-dark">
        {Helpers.dateTimeFormatExtended(user.lastLoginAt)}
      </Text>
    ),
  })

  columns.push({
    title: 'Enabled',
    dataIndex: 'status',
    align: 'left',
    render: (text, user) => (
      <Toggle
        id="user-status"
        defaultChecked={user.status === 'ACTIVE'}
        onChange={onStatusChange(user.id)}
      />
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

UserTableLayout.defaultProps = {
  loading: false,
  data: [],
}
