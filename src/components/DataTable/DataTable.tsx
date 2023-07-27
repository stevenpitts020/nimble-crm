import React from 'react'
import { Table } from 'antd'

export interface IDataTableCols {
  [index: string]: string | React.ReactNode
}

export interface IDataTable {
  align?: 'left' | 'right' | 'center' | undefined
  autoCols?: boolean
  cols?: IDataTableCols
  data: any[]
  pagination?: object | false // object should be a PaginationConfig
  rowSelection?: object
  size?: 'small' | 'middle'
  expansion?: (data: object) => React.ReactElement | string
}

export default class DataTable extends React.Component<IDataTable> {
  public render() {
    return (
      <Table
        size={this.getTableSize()}
        dataSource={this.getData()}
        columns={this.getColumns()}
        rowSelection={this.rowSelection()}
        pagination={this.getPagination()}
        {...this.getExpansion()}
      />
    )
  }

  /**
   * searches for a special header definition on props.cols and applies it
   * @param col the column key.
   */
  private getColTitle(col: string) {
    if (this.props.cols && this.props.cols.hasOwnProperty(col)) {
      return {
        title: this.props.cols[col],
      }
    }
    return { title: col }
  }

  private getAutoColumns() {
    const first = this.props.data[0] || {}
    return Object.keys(first).map(col => {
      return {
        align: this.props.align,
        dataIndex: col,
        key: col,
        ...this.getColTitle(col),
      }
    })
  }

  private getColumns() {
    if (this.props.autoCols) {
      return this.getAutoColumns()
    }

    return Object.keys(this.props.cols as object).map(key => {
      return {
        align: this.props.align,
        dataIndex: key,
        key,
        title: this!.props!.cols ? this.props.cols[key] : '',
      }
    })
  }

  private getData(): object[] {
    return this.props.data
  }

  private rowSelection() {
    return this.props.rowSelection || undefined
  }

  private getTableSize() {
    return this.props.size
  }

  private getPagination() {
    return this.props.pagination
  }

  private getExpansion() {
    if (!this.props.expansion) {
      return {}
    }

    return {
      expandedRowRender: this.props.expansion,
      defaultExpandedRowKeys: this.props.data.map(d => d.id),
    }
  }
}
