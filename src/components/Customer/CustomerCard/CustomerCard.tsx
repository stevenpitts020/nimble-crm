import { Avatar, Card, Col, Row, Typography } from 'antd'
import React from 'react'
import {
  ArrowRightIcon,
  EmailIcon,
  PhoneIcon,
  SmartPhoneIcon,
} from '../../Common/Icon/Icon'
import { CustomerOpportunity } from '../../../store'
const { Meta } = Card
const { Text } = Typography

interface ICustomerCardInfo {
  firstName: string
  lastName: string
  opportunity?: CustomerOpportunity
  color?: string
}

// TODO pass these as props
// color-light-orange
// color-light-pink
// color-light-purple
const CustomerCardInfo = (props: ICustomerCardInfo) => (
  <Row
    justify="space-between"
    align="bottom"
    className="ni-customer-card--info"
  >
    <Col className="ni-customer-card--info--description">
      <Text type="secondary">Select</Text>
      <Text
        strong={true}
        className={props.opportunity!.class.replace('-bg', '')}
      >
        {props.opportunity!.name}
      </Text>
      <Text className={'small ' + props.opportunity!.class.replace('-bg', '')}>
        {props.opportunity!.description}
      </Text>
      <div
        className={
          'ni-customer-card--info--description--effect ' +
          props.opportunity!.class
        }
      />
    </Col>
    <Col className="ni-customer-card--info--arrow">
      <ArrowRightIcon />
    </Col>
  </Row>
)

export default class CustomerCard extends React.Component<any> {
  public render() {
    const client = this.props.client
    return (
      <Card
        bordered={false}
        hoverable={true}
        className="ni-customer-card"
        actions={[
          <PhoneIcon key="setting" />,
          <EmailIcon key="edit" />,
          <SmartPhoneIcon key="ellipsis" />,
        ]}
      >
        <Meta
          className="ni-customer-card--meta"
          avatar={<Avatar size="large" src={client.avatar} />}
          description={client.rating}
          title={[client.firstName, client.lastName].join(' ')}
        />

        <CustomerCardInfo
          firstName={client.firstName}
          lastName={client.lastName}
          opportunity={client.opportunity}
        />
      </Card>
    )
  }
}
