import React from 'react'
import { Badge, Card, Avatar, Typography } from 'antd'
import { CustomerSchema, CustomerOpportunity } from '../../../../store'
import { TableClientActions } from '../../../DataTable/TableActions'
import { ICustomerTableThemeDefinition, ICustomerTable } from '../CustomerTable'

function moneyFormat(n: number = 0) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  })
    .format(n)
    .split('.')
    .shift()
}

type TableOpportunitiesThemeData = any

const { Text } = Typography

export class TableOpportunitiesTheme implements ICustomerTableThemeDefinition {
  public data(item: CustomerSchema) {
    return {
      ...item,
      name: [item.firstName, item.lastName].join(' '),
      since: new Date(item!.creationDate).getFullYear(),
    } as TableOpportunitiesThemeData
  }

  public cols() {
    return {
      client: 'Bulk Action',
      since: 'Client Since',
      d_volume: 'Deposit Volume',
      l_volume: 'Load Volume',
      habitat: 'Renter/Owner',
      p_count: 'Products',
      options: '',
    }
  }

  public rows(data: TableOpportunitiesThemeData) {
    return {
      client: (
        <Card.Meta
          avatar={<Avatar size="large" src={data.avatar} />}
          description={
            data.rating + '\u00A0\u00A0\u00A0\u00A0' + data.generation
          }
          title={data.name}
        />
      ),
      d_volume: (
        <Text className="ni-color-dark">{moneyFormat(data.d_volume)}</Text>
      ),
      habitat: <Text className="ni-color-dark">{data.habitat}</Text>,
      id: data.id,
      l_volume: <Text className="ni-color-dark">{data.l_volume}</Text>,
      options: <TableClientActions />,
      p_count: <Text strong={true}>{data.p_count}</Text>,
      since: <Text className="ni-color-dark">{data.since}</Text>,
      opportunities: (
        <React.Fragment>
          {data.opportunities &&
            data.opportunities.map((row: CustomerOpportunity) => (
              <span key={row.key} className="u-margin-right-md">
                <Badge
                  color={row.color}
                  text={row.description}
                  style={{ color: row.color }}
                />
              </span>
            ))}
        </React.Fragment>
      ),
    }
  }

  public expansion(data: any) {
    return (
      <React.Fragment>
        <Text className="ni-color-dark u-margin-right-xs" strong={true}>
          Cross-sell Opportunities:
        </Text>
        {data.opportunities}
      </React.Fragment>
    )
  }

  // tslint:disable-next-line: no-empty
  public mount(props: ICustomerTable) {
    if (!props.expanded) {
      return // ignore if not expandable table
    }

    props.clients.forEach(obj => {
      const parentRow: HTMLElement | null = document.querySelector(
        `tr.ant-table-row[data-row-key="${obj.id}"]`
      )
      const row: HTMLElement | null = document.querySelector(
        `tr.ant-table-expanded-row[data-row-key="${obj.id}-extra-row"]`
      )
      if (obj.opportunities!.length === 0 && row) {
        row.remove()
      } else if (obj.opportunities!.length > 0 && parentRow) {
        parentRow.className += ' expanded'
        parentRow.setAttribute('data-preceded-expand', 'true')
      }
    })
  }
}
