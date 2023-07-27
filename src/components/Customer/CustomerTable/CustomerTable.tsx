import React, { ReactElement } from 'react'
import { CustomerSchema } from '../../../store'
import DataTable from '../../DataTable/DataTable'

// table themes
import { TableAuditTheme } from './themes/TableAuditTheme'
import { TableOpportunitiesTheme } from './themes/TableOpportunitiesTheme'
import { TableProspectsTheme } from './themes/TableProspectsTheme'

export enum CustomerTableTheme {
  OPPORTUNITIES = 'opportunities',
  PROSPECTS = 'prospects',
  AUDIT = 'audit',
}

export interface ICustomerTableThemeDefinition {
  cols: () => { [index: string]: string | ReactElement }
  data: (data: CustomerSchema) => any
  rows: (row: any) => object
  expansion: (data: any) => string | ReactElement
  mount: (data: ICustomerTable) => void
}

interface ICustomerTableThemeList {
  [index: string]: ICustomerTableThemeDefinition
}

export interface ICustomerTable {
  clients: CustomerSchema[]
  theme?: CustomerTableTheme
  selection?: (selectedRowKeys: string[], selectedRows: object[]) => void
  expanded?: boolean
  align?: 'left' | 'right' | 'center' | undefined
}

export default class CustomerTable extends React.Component<ICustomerTable> {
  public static themes = CustomerTableTheme

  public defaultTheme: CustomerTableTheme = CustomerTableTheme.OPPORTUNITIES

  public themeList: ICustomerTableThemeList = {
    audit: new TableAuditTheme(),
    opportunities: new TableOpportunitiesTheme(),
    prospects: new TableProspectsTheme(),
  }

  public componentDidMount() {
    const theme = this.props.theme || this.defaultTheme
    return this.themeList[theme].mount(this.props)
  }

  public render() {
    const theme = this.props.theme || this.defaultTheme
    return (
      <div className="u-overflow-x">
        <DataTable
          data={this.customerRows(theme)}
          cols={this.customerCols(theme)}
          rowSelection={this.customerSelection()}
          align={this.columnAlignment()}
          {...this.expandedRow(theme)}
        />
      </div>
    )
  }

  private customerData(theme: CustomerTableTheme) {
    // appends some data transformation
    return this.props.clients.map(
      this.themeList[theme].data.bind(this.themeList[theme])
    )
  }

  private customerCols(theme: CustomerTableTheme) {
    // chooses right cols for table type
    return this.themeList[theme].cols()
  }

  private customerRows(theme: CustomerTableTheme) {
    // chooses right rows for table type
    return this.customerData(theme).map(
      this.themeList[theme].rows.bind(this.themeList[theme])
    )
  }

  private customerSelection() {
    if (!this.props.selection) {
      return undefined
    }
    return {
      onChange: this.props.selection,
    }
  }

  private expandedRow(theme: CustomerTableTheme) {
    if (this.props.expanded) {
      return {
        expansion: this.themeList[theme].expansion.bind(this.themeList[theme]),
      }
    }
  }

  private columnAlignment() {
    return this.props.align
  }
}
