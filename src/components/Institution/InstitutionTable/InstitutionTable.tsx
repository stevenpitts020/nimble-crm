import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Col, Row, Skeleton } from 'antd'
import { InstitutionTableLayout } from './InstitutionTableLayout'
import {
  InstitutionListContext,
  initialSearchOptions,
} from '../../../store/InstitutionListProvider'
import { log, institutionService } from '../../../services'
import { PER_PAGE } from './constants'
import { TablePaginationConfig } from 'antd/lib/table'
import { IInstitutionUpdate } from '../../../store'
import Search from 'antd/lib/input/Search'

interface IInstitutionTableProps {
  notifyDataChanged: () => void
  watchDataChanged: boolean
}

export const InstitutionTable: React.FC<IInstitutionTableProps> = (
  props: IInstitutionTableProps
) => {
  const history = useHistory()
  const { state, list } = useContext(InstitutionListContext)

  const isLoading = state.status === 'loading'

  React.useEffect(() => {
    const queryStr = new URLSearchParams(history.location.search)
    const limit = parseInt(queryStr.get('limit') || PER_PAGE.toString(), 10)
    const offset = parseInt(queryStr.get('offset') || '0', 10)
    const search = queryStr.get('search') || ''

    list({
      ...initialSearchOptions,
      limit,
      offset,
      search,
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
      }?limit=${limit}&offset=${offset}&search=${state.pagination.search || ''}`
    )
  }

  const onInstitutionChange = async (instituion: IInstitutionUpdate) => {
    await institutionService.update(instituion)
  }

  const handleSearchChange = (newSearch: string) => {
    history.push(
      `${history.location.pathname}?search=${newSearch || ''}&branch=${state
        .pagination.branch || ''}`
    )
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
      <Row style={{ paddingBottom: '8px' }}>
        <Col span={6}>
          <Search
            defaultValue={state.pagination.search}
            placeholder="Search by organization name"
            enterButton="Search"
            size="large"
            allowClear={true}
            bordered={true}
            onSearch={handleSearchChange}
          />
        </Col>
      </Row>
      <Card bordered={false} size="small">
        <InstitutionTableLayout
          data={state.institutions}
          loading={isLoading}
          count={state.count}
          pagination={state.pagination}
          onInstitutionChange={onInstitutionChange}
          onTableChange={handleTableChange}
        />
      </Card>
    </>
  )
}
