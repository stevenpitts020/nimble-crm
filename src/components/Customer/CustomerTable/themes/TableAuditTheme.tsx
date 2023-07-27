import React from 'react'
import { Avatar, Card, Typography } from 'antd'
import { CustomerSchema } from '../../../../store'
import { TableClientActions } from '../../../DataTable/TableActions'
import { TableComplianceActions } from '../../../DataTable/TableComplianceActions'
import { ICustomerTableThemeDefinition, ICustomerTable } from '../CustomerTable'
import moment from 'moment'

import Helpers from '../../../../utils/FormatHelper'

type TableAuditThemeData = any

const { Text } = Typography

export class TableAuditTheme implements ICustomerTableThemeDefinition {
  public data(item: CustomerSchema) {
    return {
      ...item,
      address: [
        item.streetAddress,
        item.secondaryAddress,
        ',',
        item.city,
        item.state,
        item.postalCode,
      ].join(' '),
      name: [item.firstName, item.lastName].join(' '),
    } as TableAuditThemeData
  }

  public cols() {
    return {
      client: 'Bulk Action',
      birthday: 'DOB',
      ssn: 'SSN',
      address: 'Address',
      contact: 'Contact',
      compliance: 'Compliance Checks',
    }
  }

  public rows(data: TableAuditThemeData) {
    return {
      address: (
        <Text
          className="ni-color-dark break-text"
          style={{ maxWidth: '180px' }}
        >
          {data.address}
        </Text>
      ),
      birthday: (
        <Text className="ni-color-dark">
          {Helpers.dateFormat(
            moment(data.creationDate)
              .subtract(20 + Math.round(Math.random() * 55), 'year')
              .toDate()
          )}
        </Text>
      ),
      client: (
        <Card.Meta
          avatar={<Avatar size="large" src={data.avatar} />}
          description={
            data.rating + '\u00A0\u00A0\u00A0\u00A0' + data.generation
          }
          title={data.name}
        />
      ),
      compliance: <TableComplianceActions />,
      contact: <TableClientActions />,
      id: data.id,
      ssn: <Text className="ni-color-dark">{data.ssn}</Text>,
    }
  }

  public expansion(data: object) {
    return <div />
  }

  // tslint:disable-next-line: no-empty
  public mount(props: ICustomerTable) {}
}
