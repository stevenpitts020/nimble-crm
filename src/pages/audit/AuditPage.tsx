import { Button, Card, Tabs, Empty } from 'antd'
import React from 'react'
import { NotificationBadge, SectionHeader } from '../../components'
import CustomerTable, {
  CustomerTableTheme,
} from '../../components/Customer/CustomerTable/CustomerTable'

import { generateSomeClients } from '../../services/FakerService'

const { TabPane } = Tabs

const dataAudit1 = generateSomeClients(30)

interface IAuditPageProps {
  newModalVisible: boolean
  editModalVisible: boolean
}

class AuditPage extends React.Component<IAuditPageProps> {
  public operations() {
    return (
      <div>
        <Button type="primary" shape="round">
          Export to FDIC
        </Button>
      </div>
    )
  }

  public render() {
    return (
      <React.Fragment>
        <SectionHeader title="Audit" rightComponent={<NotificationBadge />} />

        <Tabs
          size="large"
          defaultActiveKey="1"
          tabBarExtraContent={this.operations()}
        >
          <TabPane tab="Pending" key="1">
            <Card bordered={false} size="small">
              <CustomerTable
                selection={(a, b) => {
                  /* tslint:disable-next-line */
                  // Do something here
                }}
                align="center"
                clients={dataAudit1}
                theme={CustomerTableTheme.AUDIT}
              />
            </Card>
          </TabPane>
          <TabPane tab="Approval" key="2">
            <Empty description={<span>No content, yet.</span>} />
          </TabPane>
          <TabPane tab="Churn" key="3">
            <Empty description={<span>No content, yet.</span>} />
          </TabPane>
          <TabPane tab="Denied" key="4">
            <Empty description={<span>No content, yet.</span>} />
          </TabPane>
        </Tabs>
      </React.Fragment>
    )
  }
}

export default AuditPage
