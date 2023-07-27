import React, { useContext } from 'react'
import { Input, Row, Button, Form } from 'antd'
import EmailMessageHelper from '../../../utils/EmailMessageHelper'
import { ProfileContext } from '../../../store/ProfileProvider'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'

export interface IDeclineFormFields {
  emailSubject: string
  emailMessage: string
}

export interface IDeclineFormInitialValues {
  emailSubject: string
  emailMessageData: {
    template: string
    bankName: string
    bankSlug: string
    employeeName: string
    routingNumber: string
    fullName: string | undefined
    productName: string
  }
}
interface IAccountDeclineForm {
  loading?: boolean
  initialValues?: IDeclineFormInitialValues
  onCancel?: () => void
  onSubmit?: (values: Store) => void
  children?: React.ReactNode
}

export const AccountDeclineForm: React.FC<IAccountDeclineForm> = (
  props: IAccountDeclineForm
) => {
  const { profileState } = useContext(ProfileContext)
  const handleSubmit = (values: Store) => {
    if (props.onSubmit) {
      props.onSubmit(values)
    }
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  const [form] = Form.useForm()

  return (
    <Form
      data-testid="account-request-Decline-form"
      layout="vertical"
      className="ni-modal-form-padded"
      onFinish={handleSubmit}
      form={form}
      initialValues={{
        emailSubject: props.initialValues?.emailSubject,
        emailMessage: EmailMessageHelper.buildDeclineEmailMessage({
          template: profileState.profile?.institution?.templateDecline,
          bankSlug: props.initialValues?.emailMessageData.bankSlug,
          bankName: props.initialValues?.emailMessageData.bankName,
          fullName: props.initialValues?.emailMessageData.fullName,
          productName: props.initialValues?.emailMessageData.productName,
          employeeName: props.initialValues?.emailMessageData.employeeName,
        }),
      }}
    >
      <Form.Item
        label="Email Subject"
        name="emailSubject"
        rules={[{ required: true, message: 'Please add a Email Subject' }]}
      >
        <Input placeholder="Email subject" size="large" />
      </Form.Item>

      <Form.Item
        label="Email Message"
        name="emailMessage"
        rules={[{ required: true, message: 'E-mail body is required.' }]}
      >
        <Input.TextArea placeholder="Insert Text" className={'input-message'} />
      </Form.Item>

      {props.children}
      <Row justify="space-between" align="middle">
        <Button type="default" shape="round" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button
          disabled={hasErrors(form.getFieldsError()) || props.loading}
          loading={props.loading}
          type="primary"
          htmlType="submit"
          shape="round"
        >
          Send & Decline
        </Button>
      </Row>
    </Form>
  )
}
