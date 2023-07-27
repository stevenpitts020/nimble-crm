import _ from 'lodash'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Skeleton } from 'antd'
import { AccountRequestTableLayout } from './AccountRequestTableLayout'
import {
  AccountRequestContext,
  initialSearchOptions,
} from '../../../store/AccountRequestProvider'
import { IAccountRequest, IAccountRequestPatch } from '../../../store'

import { log, accountRequestService } from '../../../services'
import { PER_PAGE } from './constants'
import { EmptyAccountRequest } from './EmptyAccountRequest'
import { TablePaginationConfig } from 'antd/lib/table'
import { ProfilesContext } from '../../../store/ProfilesProvider'

export const AccountRequestTable: React.FC = (props: any) => {
  const history = useHistory()
  const {
    accountState,
    listAccountRequests,
    currentStatusFilter,
    changeStatusFilter,
  } = useContext(AccountRequestContext)

  const { profilesState } = useContext(ProfilesContext)

  const isLoading = accountState.status === 'loading'

  React.useEffect(() => {
    const queryStr = new URLSearchParams(history.location.search)
    const limit = parseInt(queryStr.get('limit') || PER_PAGE.toString(), 10)
    const offset = parseInt(queryStr.get('offset') || '0', 10)
    const status: string | null = queryStr.get('status')

    changeStatusFilter(status)

    listAccountRequests({
      ...initialSearchOptions,
      limit,
      offset,
      status,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search, currentStatusFilter])

  const handleTableChange = (pagination: TablePaginationConfig) => {
    log.info(pagination, 'handleTableChange')

    const limit = pagination.pageSize || PER_PAGE
    const offset = limit * ((pagination.current || 1) - 1)
    const status: string | null = currentStatusFilter
      ? `&status=${currentStatusFilter}`
      : ''

    history.push(
      `${history.location.pathname}?limit=${limit}&offset=${offset}${status}`
    )
  }

  const handleRowOnClick = (
    record: IAccountRequest
  ): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => {
        history.push('/accounts/' + record.id)
      }, // click row
    }
  }

  const patchAccountRequest = (accountRequest: IAccountRequestPatch) => {
    accountRequestService.patchAccountRequest(accountRequest.id, {
      ..._.omit(accountRequest, 'id'),
    })
  }

  if (isLoading) {
    return (
      <Card bordered={false} size="default">
        <Skeleton active={true} />
      </Card>
    )
  }

  return (
    <>
      {accountState.accountRequests.length > 0 && (
        <Card bordered={false} size="small">
          <AccountRequestTableLayout
            data={accountState.accountRequests}
            loading={isLoading}
            pagination={accountState.pagination}
            count={accountState.count}
            onTableChange={handleTableChange}
            onRow={handleRowOnClick}
            onAccountRequestChange={patchAccountRequest}
            referrers={
              profilesState && profilesState.profiles
                ? profilesState.profiles
                : []
            }
          />
        </Card>
      )}

      {accountState.accountRequests.length === 0 && !isLoading && (
        <EmptyAccountRequest />
      )}
    </>
  )
}
