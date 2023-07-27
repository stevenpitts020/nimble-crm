import React, { useContext, useState } from 'react'
import { Table, Typography } from 'antd'
import { ColumnProps } from 'antd/es/table'
import Helpers from '../../../utils/FormatHelper'
import {
  IAccountRequest,
  IAccountRequestPatch,
  ISelectOptions,
  IUser,
} from '../../../store'
import { Box, ModalWindow } from '../../index'
import { ComplianceStatus } from './ComplianceStatus'
import { ISearchOptions } from '../../../store'
import { PER_PAGE } from './constants'
import { AccountRequestStatus } from './AccountRequestStatus'
import { TablePaginationConfig } from 'antd/lib/table'
import Select, { SingleValue } from 'react-select'
import Toggle from 'react-toggle'
import _ from 'lodash'
import { AuthContextStore } from '../../../store/AuthProvider'
import { ProfileContext } from '../../../store/ProfileProvider'
import parseHtml from 'html-react-parser'

interface ITableLayout {
  data: IAccountRequest[]
  loading?: boolean
  pagination?: ISearchOptions
  count: number
  referrers?: IUser[]
  onTableChange?: (pagination: TablePaginationConfig) => void
  onRow?: (record: IAccountRequest) => React.HTMLAttributes<HTMLElement>
  onAccountRequestChange: (accountRequest: IAccountRequestPatch) => void
}

const { Text, Title } = Typography

const SHOW_DETAILS_FOR_STATUSES = ['APPROVED', 'DECLINED']

export const AccountRequestTableLayout: React.FC<ITableLayout> = (
  props: ITableLayout
) => {
  const { isInstitutionAdmin } = useContext(AuthContextStore)
  const { profileState } = useContext(ProfileContext)
  const [presentStatusDetails, setPresentStatusDetails] = useState<boolean>(
    false
  )
  const [statusDetailsTitle, setStatusDetailsTitle] = useState<string>('')
  const [statusDetailsBody, setStatusDetailsBody] = useState<string>('')

  const statusDetailsAvailable = (accountRequest: IAccountRequest) =>
    SHOW_DETAILS_FOR_STATUSES.includes(accountRequest.status)

  const hideStatusDetails = () => {
    setStatusDetailsTitle('')
    setStatusDetailsBody('')
    setPresentStatusDetails(false)
  }

  const showStatusDetails = (acctReq: IAccountRequest) => {
    if (!SHOW_DETAILS_FOR_STATUSES.includes(acctReq.status)) return
    if (!acctReq.statusEmailBody && !acctReq.statusEmailSubject) return

    setStatusDetailsTitle(acctReq.statusEmailSubject || '')

    setStatusDetailsBody(
      _.join(
        _.reduce(
          [
            { pattern: / {2,2}/g, replacement: _.repeat('&nbsp;', 2) },
            { pattern: / {3,3}/g, replacement: _.repeat('&nbsp;', 3) },
            { pattern: / {4,4}/g, replacement: _.repeat('&nbsp;', 4) },
            { pattern: / {5,5}/g, replacement: _.repeat('&nbsp;', 5) },
            { pattern: / {6,6}/g, replacement: _.repeat('&nbsp;', 6) },
            { pattern: / {7,7}/g, replacement: _.repeat('&nbsp;', 7) },
            { pattern: / {8,8}/g, replacement: _.repeat('&nbsp;', 8) },
            { pattern: / {9,9}/g, replacement: _.repeat('&nbsp;', 9) },
            { pattern: / {10,10}/g, replacement: _.repeat('&nbsp;', 10) },
            { pattern: / {11,}/g, replacement: _.repeat('&nbsp;', 10) }, // reduce 11+ literal spaces to 10 nbsp
            { pattern: /\t/g, replacement: _.repeat('&nbsp;', 4) }, // replace tabs with 4 nbsp
            { pattern: /\n/g, replacement: '<br>' }, // replace new lines with br
          ],
          (html, args) => _.replace(html, args.pattern, args.replacement), // perform the replacement
          acctReq.statusEmailBody || '' // the raw body
        ),
        '' // no join separator, just concat
      )
    )

    setPresentStatusDetails(true)
  }

  const onReferredByChange = (id: string) => (
    option: SingleValue<ISelectOptions>
  ) => {
    props.onAccountRequestChange({ id, referredById: option?.value || '!' })
  }

  const onDeleteChange = (id: string) => (event: any) => {
    if (!_.isNil(event?.target?.checked)) {
      props.onAccountRequestChange({
        id,
        deleted: !!event.target.checked,
      })
    }
  }

  const columns: ColumnProps<IAccountRequest>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      onCell: props.onRow,
      render: (text, record) => (
        <Box textAlign="left">
          <Title level={5} data-testid={`status-${record.status}`}>
            {Helpers.firstSignerFullName(record.signers)}
          </Title>
        </Box>
      ),
    },
    {
      title: 'Request Date',
      dataIndex: 'since',
      align: 'center',
      onCell: props.onRow,
      render: (text, record) => (
        <Text className="ni-color-dark">
          {Helpers.dateTimeFormatExtended(record.createdAt)}
        </Text>
      ),
    },
    {
      title: 'Referred By',
      dataIndex: 'referred-by',
      align: 'left',
      render: (text, accountRequest) => (
        <Select
          name="referred-by"
          className="referred-by"
          data-testid={`referred-by-${accountRequest.id}`}
          isMulti={false}
          isClearable={true}
          options={props.referrers?.map(ref => {
            return { value: ref.id, label: `${ref.firstName} ${ref.lastName}` }
          })}
          defaultValue={
            accountRequest.referredBy
              ? {
                  value: accountRequest?.referredBy?.id,
                  label: `${accountRequest?.referredBy?.firstName} ${accountRequest?.referredBy?.lastName}`,
                }
              : undefined
          }
          onChange={onReferredByChange(accountRequest.id)}
        />
      ),
    },
    {
      title: 'Products',
      dataIndex: 'products',
      align: 'center',
      onCell: props.onRow,
      render: (text, record) => {
        const [productConfig] = record.productConfigurations
        const productName = productConfig?.product?.name || '-'
        return <Text>{productName}</Text>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (text, record) => (
        <AccountRequestStatus
          accountRequest={record}
          isStatusClickable={statusDetailsAvailable}
          onStatusClick={showStatusDetails}
        />
      ),
    },
    {
      title: 'Compliance Checks',
      dataIndex: 'identityVerified',
      align: 'center',
      ellipsis: true,
      onCell: props.onRow,
      render: (text, record) => <ComplianceStatus accountRequest={record} />,
    },
  ]

  if (isInstitutionAdmin(profileState?.profile))
    columns.push({
      title: 'Delete',
      dataIndex: 'delete',
      align: 'right',
      render: (text, record) => (
        <Toggle
          id="account-request-delete"
          defaultChecked={false}
          onChange={onDeleteChange(record.id)}
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
          showTotal: (total, range) => (
            <span
              data-testid="pagination-total"
              data-pagination-total={range[1]}
            >
              Showing {range[0]} - {range[1]}
              {total < (props.pagination?.limit || PER_PAGE)
                ? ''
                : ` of ${total}`}{' '}
              items
            </span>
          ),
        }}
        onChange={props.onTableChange}
      />
      <ModalWindow
        closable={true}
        visible={presentStatusDetails}
        afterClose={hideStatusDetails}
        onCancel={hideStatusDetails}
        introductionTitle={
          statusDetailsTitle.length <= 150 ? statusDetailsTitle : ''
        }
        introductionText={
          statusDetailsTitle.length > 150 ? statusDetailsTitle : ''
        }
      >
        <Box className="status-details-wrapper">
          {parseHtml(statusDetailsBody)}
        </Box>
      </ModalWindow>
    </>
  )
}

AccountRequestTableLayout.defaultProps = {
  loading: false,
  data: [],
}
