import React, { useContext } from 'react'
import { Input, Row, Button, Form, Typography, Col } from 'antd'
import { ProfileContext } from '../../../store/ProfileProvider'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'
import { FormInstance } from 'antd/lib/form'
import PhoneInput from 'react-phone-input-2'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Box } from '../../Common/Box/Box'
import { CopyIcon, EmailIcon, SmartPhoneIcon } from '../../Common/Icon/Icon'
import {
  CreditCardOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { INotificationCreate } from '../../../store'

const { Text } = Typography

interface ISendAccountRequestForm {
  form: FormInstance
  loading?: boolean
  onCancel?: () => void
  onSubmit?: (notification: INotificationCreate) => void
}

export const SendAccountRequestForm: React.FC<ISendAccountRequestForm> = (
  props: ISendAccountRequestForm
) => {
  const form = props.form
  const { profileState } = useContext(ProfileContext)
  const [method, setMethod] = React.useState<string>('email')
  const [product, setProduct] = React.useState<string>('Credit Card')
  const [phone, setPhone] = React.useState<string>()
  const [refLinkCopied, setRefLinkCopied] = React.useState<boolean>(false)

  React.useEffect(() => {
    form.setFieldsValue({ method })
    form.setFieldsValue({ product })
  }, [form, method, product])

  React.useEffect(() => {
    if (refLinkCopied) setTimeout(() => setRefLinkCopied(false), 5000)
  }, [refLinkCopied])

  const handleCancel = () => {
    handleRefLinkCopied()
    if (props.onCancel) props.onCancel()
  }

  const handleRefLinkCopied = () => setRefLinkCopied(true)

  const handleSetMethod = (selected: string) => () => setMethod(selected)

  const handleSetProduct = (selected: string) => () => setProduct(selected)

  const isPhoneValid = (phoneNumber: string) => phoneNumber?.length === 11

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  const my = {
    name: `${profileState.profile?.firstName} ${profileState.profile?.lastName}`,
    email: profileState.profile?.email,
    phone: profileState.profile?.phone,
    referral: {
      link: profileState.profile?._refLink,
    },
    bank: {
      name: profileState.profile?.institution?.name,
    },
    branch: {
      name: profileState.profile?.branch?.name,
    },
  }

  const onFinish = (values: Store) => {
    const notification: INotificationCreate = ({
      email: {
        method: 'email',
        recipient: {
          name: values.applicant_name,
          email: values.applicant_email,
        },
        title: values.title,
        message: values.message,
        product: values.product,
      } as INotificationCreate,
      sms: {
        method: 'sms',
        recipient: {
          name: values.applicant_name,
          mobile: values.applicant_mobile,
        },
        message: values.message,
        product: values.product,
      } as INotificationCreate,
    } as any)[values.method]

    if (props.onSubmit) props.onSubmit({ ...notification, my })
  }

  return (
    <div className={'send-account-request-referral-form'}>
      <div className={'referral-link'}>
        <Box>
          Copy Referral Link
          <CopyToClipboard
            text={profileState?.profile?._refLink || ''}
            onCopy={handleRefLinkCopied}
          >
            <span className={'copy-referral-link-text'}>
              {' '}
              <CopyIcon />
              {refLinkCopied ? ' copied!' : ''}
            </span>
          </CopyToClipboard>
        </Box>
        <Text className={'referral-link-text ni-color-gray'}>
          {/*{profileState?.profile?._refLink}*/}
        </Text>
      </div>
      <Form
        form={form}
        data-testid="send-account-request-form"
        layout="vertical"
        className="ni-modal-form-padded"
        onFinish={onFinish}
        initialValues={{
          method: 'email',
          phone: null,
          email: null,
          title: '{{my.bank.name}} | New Account Invitation',
          message:
            'Congratulations {{recipient.name}} on your {{my.bank.name}} {{product}} invitation!\n\nUse the following link to get started:\n{{my.referral.link}}\n\nThank you!\n{{my.name}}\n{{my.email}}',
        }}
      >
        <div className="ni-modal-form-content">
          <Row
            gutter={[20, 20]}
            align="middle"
            justify="space-between"
            style={{ marginBottom: 32 }}
          >
            <Col span={12}>
              <Button
                type="default"
                size="large"
                icon={<EmailIcon />}
                className={method === 'email' ? 'selected' : ''}
                onClick={handleSetMethod('email')}
                disabled={props.loading}
              >
                Email
              </Button>
            </Col>
            <Col
              span={12}
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                type="default"
                size="large"
                icon={<SmartPhoneIcon />}
                className={method === 'sms' ? 'selected' : ''}
                onClick={handleSetMethod('sms')}
                disabled={true || props.loading}
              >
                SMS
              </Button>
            </Col>
            <Form.Item name="method">
              <Input hidden={true} value={method} />
            </Form.Item>
          </Row>

          <Form.Item
            name="applicant_name"
            label="Applicant Name"
            rules={[
              {
                required: true,
                message: 'Applicant Name is required',
              },
            ]}
          >
            <Input size="large" disabled={props.loading} />
          </Form.Item>

          <Form.Item
            name="applicant_mobile"
            label="Applicant Mobile Phone"
            hidden={method !== 'sms'}
            rules={[
              {
                required: method === 'sms',
                message: 'Mobile phone is required',
              },
            ]}
          >
            <PhoneInput
              inputClass="ant-input"
              country={'us'}
              onlyCountries={['us']}
              countryCodeEditable={false}
              value={phone}
              onChange={setPhone}
              isValid={isPhoneValid}
              disabled={props.loading}
            />
          </Form.Item>

          <Form.Item
            name="applicant_email"
            label="Applicant Email"
            hidden={method !== 'email'}
            rules={[
              {
                required: method === 'email',
                type: 'email',
                message: 'Email is required',
              },
            ]}
          >
            <Input
              placeholder="applicant@personal-email.com"
              size="large"
              type={'email'}
              disabled={props.loading}
            />
          </Form.Item>

          <Form.Item
            name="title"
            label="Subject"
            hidden={method !== 'email'}
            rules={[{ required: true, message: 'Please add an Email Subject' }]}
          >
            <Input
              placeholder="Subject"
              size="large"
              disabled={props.loading}
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Message is required.' }]}
          >
            <Input.TextArea
              placeholder={`Use the following link to register:\n${profileState?.profile?._refLink}\n`}
              className={'input-message'}
              disabled={props.loading}
            />
          </Form.Item>

          <Row
            className="product-buttons"
            gutter={[20, 20]}
            align="middle"
            justify="space-between"
            style={{ marginBottom: 32 }}
          >
            <Col span={8}>
              <Button
                type="default"
                size="middle"
                icon={<CreditCardOutlined />}
                className={product === 'Credit Card' ? 'selected' : ''}
                onClick={handleSetProduct('Credit Card')}
                disabled={props.loading}
              >
                Credit Card
              </Button>
            </Col>
            <Col span={8}>
              <Button
                type="default"
                size="middle"
                icon={<DollarCircleOutlined />}
                className={product === 'Deposit Account' ? 'selected' : ''}
                onClick={handleSetProduct('Deposit Account')}
                disabled={props.loading}
              >
                Deposit
              </Button>
            </Col>
            <Col span={8}>
              <Button
                type="default"
                size="middle"
                icon={<ShoppingCartOutlined />}
                className={product === 'Consumer Loan' ? 'selected' : ''}
                onClick={handleSetProduct('Consumer Loan')}
                disabled={props.loading}
              >
                Consumer Loan
              </Button>
            </Col>
            <Form.Item name="product">
              <Input hidden={true} value={product} />
            </Form.Item>
          </Row>
        </div>
        <div className="ni-modal-form-actions">
          <Row justify="space-between" align="middle">
            <Button type="default" shape="round" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              disabled={hasErrors(form.getFieldsError()) || props.loading}
              loading={props.loading}
              type="primary"
              htmlType="submit"
              shape="round"
            >
              Send
            </Button>
          </Row>
        </div>
      </Form>
    </div>
  )
}
