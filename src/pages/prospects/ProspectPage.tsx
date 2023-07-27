import React from 'react'
import { Modal, Button, Card, Col, Row, Typography } from 'antd'
import {
  Box,
  CircularProgress,
  FilterDropdownMenu,
  NotificationBadge,
  SectionHeader,
  StatList,
  NewProspectForm,
} from '../../components'
import CustomerTable from '../../components/Customer/CustomerTable/CustomerTable'
import { UserPlusIcon } from '../../components/Common/Icon/Icon'
import { generateSomeClients } from '../../services/FakerService'
import moment from 'moment'

const { Title } = Typography
const { Text } = Typography

const dataCards = generateSomeClients(100).sort((a, b) => {
  return moment(a.creationDate).isBefore(b.creationDate) ? 1 : -1
})

// TODO create component for this?
const MiniStats = (props: any) => (
  <div className="ni-mini-stats-double">
    <Row justify="space-between" align="top">
      <Col>
        <Text type="secondary">Invited</Text>
        <Title level={1} className="u-margin-none">
          183
        </Title>
      </Col>
      <Col className="u-align-right">
        <Text type="secondary">Downloaded</Text>
        <Title level={1} className="u-margin-none">
          140
        </Title>
      </Col>
    </Row>
  </div>
)

const ProspectPage: React.FC = (props: any) => {
  const [modalVisible, setModal] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [newProspectSubmitted, setNewProspectSubmitted] = React.useState<
    boolean
  >(false)

  const openModal = () => {
    setModal(true)
  }

  const hideModal = () => {
    return setModal(false)
  }

  const submitForm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setNewProspectSubmitted(true)
    }, 1000)
  }

  // executed after modal is closed. we can use it to reset inside conditions
  const resetModal = () => {
    setNewProspectSubmitted(false)
  }

  const formClassName = newProspectSubmitted
    ? 'ni-modal--prospect u-fade-leave u-fade-leave-active'
    : 'ni-modal--prospect u-fade-leave'

  const confirmedClassName = newProspectSubmitted
    ? 'ni-modal--confirmed u-fade-appear u-fade-appear-active'
    : 'ni-modal--confirmed u-fade-appear'

  return (
    <React.Fragment>
      <SectionHeader title="Prospects" rightComponent={<NotificationBadge />}>
        <FilterDropdownMenu title="Filters" />
      </SectionHeader>

      <Box row="main-sidebar" className="slim">
        <Card bordered={false} size="small">
          <CustomerTable
            align="center"
            clients={dataCards}
            theme={CustomerTable.themes.PROSPECTS}
          />
        </Card>
        <div>
          <Button
            block={true}
            type="primary"
            size={'large'}
            className="u-margin-bottom-xl"
            onClick={openModal}
          >
            <UserPlusIcon style={{ fontSize: '24px' }} />
            New Prospect
          </Button>
          <MiniStats />
          <CircularProgress percent={80} legend="Downloaded" width={170} />
          <StatList />
        </div>
      </Box>

      <Modal
        closable={true}
        maskClosable={true}
        centered={true}
        visible={modalVisible}
        footer={null}
        width="440px"
        className="ni-modal"
        bodyStyle={{ minHeight: '540px' }}
        afterClose={resetModal}
        onCancel={hideModal}
      >
        <div className={formClassName}>
          <div className="ni-modal--title">
            <Title level={1}>
              <Title level={3} type="secondary">
                New
              </Title>
              Prospect
            </Title>
          </div>

          <NewProspectForm />

          <Row justify="space-around" align="middle">
            <Button key="back" type="default" shape="round" onClick={hideModal}>
              Back
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loading}
              onClick={submitForm}
            >
              Send Invite
            </Button>
          </Row>
        </div>
        <div className={confirmedClassName}>
          <div className="ni-modal--title">
            <Title level={3} type="secondary">
              Invitation
            </Title>
          </div>
          <img
            alt="example"
            src="/temp/confirmed_illustration.jpg"
            className="ni-modal--confirmed--icon"
          />
          <Title level={1} className="ni-modal--confirmed--action">
            Sent
          </Title>
          <Button type="default" shape="round" onClick={hideModal}>
            Close
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default ProspectPage
