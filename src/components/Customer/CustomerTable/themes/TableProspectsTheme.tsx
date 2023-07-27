import React from 'react'
import { Button, Typography } from 'antd'
import { CustomerSchema } from '../../../../store'
import { ICustomerTableThemeDefinition, ICustomerTable } from '../CustomerTable'
import Helpers from '../../../../utils/FormatHelper'
import { Box } from '../../..'

type TableProspectsThemeData = any

const { Text } = Typography

export class TableProspectsTheme implements ICustomerTableThemeDefinition {
  public data(item: CustomerSchema) {
    return {
      ...item,
      rowKey: item.firstName,
      name: [item.firstName, item.lastName].join(' '),
      since: Helpers.dateFormat(new Date(item!.creationDate)),
    } as TableProspectsThemeData
  }

  public cols() {
    return {
      name: 'Name',
      status: 'Completeness',
      since: 'Request Date',
      products: 'Products',
      compliance: 'Compliance Checks',
      options: '',
    }
  }

  public rows(data: TableProspectsThemeData) {
    return {
      name: (
        <Box textAlign="left">
          <Text strong={true}>{data.name}</Text>
          <br />
          <Text className="ni-color-silver">Secondary</Text>{' '}
          <Text className="ni-color-silver" strong={true}>
            {data.opportunity.name}
          </Text>
        </Box>
      ),
      since: <Text className="ni-color-dark">{data.since}</Text>,
      products: <Text>Simple Checking</Text>,
      options: this.optionByStatus(data.status),
    }
  }

  public expansion(data: object) {
    return <div />
  }

  // tslint:disable-next-line: no-empty
  public mount(props: ICustomerTable) {}

  private optionByStatus(status: string) {
    return (
      <Button shape="round" size="small" type="link" ghost={true}>
        View
      </Button>
    )
  }
}
