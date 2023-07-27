import React from 'react'
import {
  Box,
  SearchBar,
  SearchInput,
  StatList,
  CircularProgress,
  PillDropdown,
  SidebarNotifications,
  Stack,
} from '../../components/'

import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  InboxOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'

import {
  Upload,
  Input,
  Menu,
  Row,
  Col,
  Avatar,
  Card,
  Button,
  Typography,
  Calendar,
  Empty,
  Progress,
  Tooltip,
  Form,
} from 'antd'

const { Title } = Typography
const { Text } = Typography
const { Meta } = Card

const AccountRequestAprovalForm = () => {
  const initialText =
    'Dear Mr. Steve \nWe are happy to inform that your new Simple Checking account at Central Bank is opened with the following information:\n\nRouting N: xpto\nAccount N: xpto\n\nWe remind you that you should transfer at least $200 in the next 5 days to the new account to finalize the process.\n\nRespectfully,\nMark Brown\nCentral Bank Online'

  return (
    <Form layout="vertical" className="ni-modal-form-padded">
      <Form.Item label="Email" required={true}>
        <Input placeholder="+351 000" size="large" />
      </Form.Item>

      <Row gutter={[20, 20]}>
        <Col span="16">
          <Form.Item label="Account Number" required={true}>
            <Input placeholder="444 555 000" size="large" />
          </Form.Item>
        </Col>
        <Col span="8">
          <Form.Item label="Amount to transfer">
            <Input placeholder="$300" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="E-mail Message" required={true}>
        <Input.TextArea
          value={initialText}
          placeholder="Insert Text her"
          disabled={true}
          className={'input-message'}
        />
      </Form.Item>
      <Row justify="space-between" align="middle">
        <Button type="default" shape="round">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" shape="round">
          Send & Accept
        </Button>
      </Row>
    </Form>
  )
}

const ModalAccountRequestAproval = () => {
  const modalTitle = 'Accept'
  const introduction =
    'This notification will be sent to the prospect notifying him that the account was created and he should move funds to the new account'
  return (
    <div
      className="ni-modal"
      style={{
        width: '500px',
        backgroundColor: 'white',
        padding: '0',
      }}
    >
      <div className="ni-modal-introduction">
        <Title level={3}>{modalTitle}</Title>
        <Text className="ni-color-gray">{introduction}</Text>
      </div>
      <AccountRequestAprovalForm />
    </div>
  )
}

const NewProspectForm = () => {
  return (
    <Form layout="vertical">
      <Form.Item>
        <Upload.Dragger name="files" action="/upload.do">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Drop Driver Licence Here</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Upload.Dragger>
      </Form.Item>
      <Form.Item
        label="Confirm"
        required={true}
        extra="We must make sure that your are a human."
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item label="SSN" required={true}>
        <Input placeholder="+351 000" size="large" />
      </Form.Item>
      <Form.Item label="Phone Number" required={true}>
        <Input placeholder="+351 000" size="large" />
      </Form.Item>
      <Form.Item label="Email" required={true}>
        <Input placeholder="+351 000" size="large" />
      </Form.Item>
      <Row justify="space-between" align="middle">
        <Button type="default" shape="round">
          Back
        </Button>
        <Button type="primary" htmlType="submit" shape="round">
          Send Invite
        </Button>
      </Row>
    </Form>
  )
}

const ModalNewProspect = () => {
  return (
    <div
      className="ni-modal"
      style={{
        width: '440px',
        backgroundColor: 'white',
        padding: '48px',
        marginBottom: '32px',
      }}
    >
      <div className="ni-modal--title">
        <Title level={1}>
          <Title level={3} type="secondary">
            New
          </Title>
          Prospect
        </Title>
      </div>
      <NewProspectForm />
    </div>
  )
}

const ModalThankYou = () => {
  return (
    <div
      className="ni-modal"
      style={{
        width: '440px',
        backgroundColor: 'white',
        padding: '48px',
        marginBottom: '32px',
      }}
    >
      <div className="ni-modal--confirmed">
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
        <Button type="default" shape="round">
          Close
        </Button>
      </div>
    </div>
  )
}

const Headings = () => (
  <div>
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
  </div>
)

const Texts = () => (
  <div>
    <Text>Normal Ant Design</Text>
    <br />
    <Text type="secondary">Ant Design</Text>
    <br />
    <Text type="warning">Ant Design</Text>
    <br />
    <Text type="danger">Ant Design</Text>
    <br />
    <Text disabled={true}>Ant Design</Text>
    <br />
    <Text mark={true}>Ant Design</Text>
    <br />
    <Text code={true}>Ant Design</Text>
    <br />
    <Text underline={true}>Ant Design</Text>
    <br />
    <Text delete={true}>Ant Design</Text>
    <br />
    <Text strong={true}>Ant Design</Text>
  </div>
)

const Buttons = () => (
  <div>
    <p>Button Types</p>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button danger={true}>Danger</Button>
    <Button type="link">Link</Button>
    <br />
    <br />
    <p>Button size</p>
    <Button type="primary" shape="round" size="large">
      Resend
    </Button>
    <Button type="dashed" shape="round" size="middle">
      Resend
    </Button>
    <Button type="primary" shape="round" size="small">
      Resend
    </Button>
    <br />
    <br />

    <Button shape="round">Back</Button>
    <br />
    <br />

    <Button type="dashed" shape="round">
      Send Invite
    </Button>
    <br />
    <br />
    <p>Danger and success</p>
    <Stack direction="horizontal" spacing="md">
      <Button danger={true} shape="round">
        Decline
      </Button>
      <Button shape="round" className="ant-btn-success">
        Accept
      </Button>
    </Stack>

    <br />
    <Button type="primary" icon={<DownloadOutlined />} size={'large'}>
      New Prospect
    </Button>
  </div>
)

const Others = () => (
  <div
    style={{
      background: 'white',
      border: '1px solid #d9d9d9',
      borderRadius: 4,
      width: 350,
    }}
  >
    <Calendar fullscreen={false} />
  </div>
)
const title = (
  <Text>
    <Text type="secondary">Hello</Text>World
  </Text>
)

const Cards = () => (
  <div style={{ width: 350 }}>
    <Card title={title} bordered={false} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <br />
    <Card
      title="Default size card"
      extra={<a href="/demo">More</a>}
      style={{ width: 300 }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <br />
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title="Card title"
        description="This is the description"
      />
    </Card>
  </div>
)

const SearchMenuOptions = (
  <Menu>
    <Menu.Item key="1">1rd menu item</Menu.Item>
    <Menu.Item key="2">2rd menu item</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
)

const Charts = () => (
  <div>
    <Progress
      strokeColor={{
        '0%': '#4BBFEC',
        '100%': '#4BBFEC',
      }}
      percent={39.9}
      showInfo={false}
      strokeWidth={4}
    />

    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress
        type="dashboard"
        strokeWidth={6}
        strokeColor={{
          '0%': '#56CCF2',
          '100%': '#1D7FB7',
        }}
        percent={34}
      />
    </Tooltip>
  </div>
)

const DemoPage: React.FC = () => {
  return (
    <React.Fragment>
      <Headings />
      <hr />
      <Texts />
      <hr />
      <Buttons />
      <hr />
      <Cards />
      <hr />
      <Title>Other</Title>
      <Others />
      <hr />
      <Title>Progress components for charts</Title>
      <Charts />
      <hr />
      <Title>Search</Title>
      <SearchBar />
      <div style={{ width: '300px', marginTop: '24px' }}>
        <br />
        <SearchInput size="large" />
      </div>
      <hr />

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

      <CircularProgress percent={80} legend="Downloads" width={170} />
      <StatList />
      <hr />
      <Title>Empty</Title>
      <Empty />
      <br />
      <Empty
        description={
          <span>
            Customize <a href="#API">Description</a>
          </span>
        }
      />
      <hr />
      <Title>Pill Dropdowns </Title>
      <PillDropdown options={SearchMenuOptions} title="Top Products" />
      <br />
      <div style={{ width: 200 }}>
        <PillDropdown
          options={SearchMenuOptions}
          title="On your region"
          block={true}
        />
      </div>
      <hr />
      <Title>Box</Title>
      <Box row="main-sidebar">
        <Box col="main">
          <div style={{ backgroundColor: 'pink' }}>Hello</div>
        </Box>
        <Box col="sidebar">
          <div style={{ backgroundColor: 'yellow' }}>Hello</div>
        </Box>
      </Box>
      <Box row="flex-center">
        <Box textAlign="center" marginBottom="md" style={{ width: '50%' }}>
          <div style={{ backgroundColor: 'pink' }}>Hello</div>
        </Box>
        <Box textAlign="center" marginBottom="md" style={{ width: '50%' }}>
          <div style={{ backgroundColor: 'yellow' }}>Hello</div>
        </Box>
      </Box>
      <hr />
      <Title>Modals</Title>
      <ModalNewProspect />
      <ModalThankYou />

      <ModalAccountRequestAproval />

      <div
        style={{
          width: '335px',
          backgroundColor: 'white',
          padding: '40px 32px',
          marginBottom: '32px',
        }}
      >
        <SidebarNotifications />
      </div>
    </React.Fragment>
  )
}

export default DemoPage
