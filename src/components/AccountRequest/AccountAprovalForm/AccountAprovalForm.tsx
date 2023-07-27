import React, { useContext } from 'react'
import { Input, Row, Col, Button, InputNumber, Alert, Form } from 'antd'
import EmailMessageHelper from '../../../utils/EmailMessageHelper'
import { ProfileContext } from '../../../store/ProfileProvider'
import { log } from '../../../services'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'
import { Dropdown } from '../../Common/Dropdown/Dropdown'
import { IInstitutionBranch } from '../../../store'

export interface IAprovalFormInitialValues {
  emailSubject: string
  amountTransfer: number | undefined
  emailMessageData: {
    bankName: string
    bankSlug: string
    employeeName: string
    routingNumber: string
    accountNumber: string
    fullName: string | undefined
    productName: string
  }
  branchId?: string
}

interface IAccountAproveForm {
  loading?: boolean
  initialValues?: IAprovalFormInitialValues
  onCancel?: () => void
  onSubmit?: (values: Store) => void
  children?: React.ReactNode
  branches?: IInstitutionBranch[]
}

export const AccountAprovalForm: React.FC<IAccountAproveForm> = (
  props: IAccountAproveForm
) => {
  const [isManualEditMode, setManualEditMode] = React.useState(false)
  const { profileState } = useContext(ProfileContext)
  const handleSubmit = (values: Store) => {
    log.info('submitted!', 'accountAprovalForm')
    if (props.onSubmit) {
      props.onSubmit(values)
    }
  }
  // this is not pretty
  const containsErrors = (err: any) => {
    if (err) {
      // if we have only 1 error and it's account number and we're also in manual edit mode, then forget about it
      if (!err.emailSubject && err.accountNumber && isManualEditMode) {
        log.warn(
          'manual edit mode and only accountNumber is missing',
          'accountAprovalForm'
        )
        return false
      }

      return true
    }
    return false
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    if (containsErrors(fieldsError)) {
      return fieldsError.some((field: FieldError) => field.errors.length > 0)
    }
  }

  const handleChangeAmount = (value: string | number | null | undefined) => {
    form.setFieldsValue({
      emailMessage: EmailMessageHelper.buildAproveEmailMessage({
        accountNumber: form.getFieldValue('accountNumber'),
        amount: Number(value),
        template: profileState.profile?.institution?.templateApprove,
        routingNumber: props.initialValues?.emailMessageData.routingNumber,
        bankName: props.initialValues?.emailMessageData.bankName,
        bankSlug: props.initialValues?.emailMessageData.bankSlug,
        fullName: props.initialValues?.emailMessageData.fullName,
        productName: props.initialValues?.emailMessageData.productName,
        employeeName: props.initialValues?.emailMessageData.employeeName,
      }),
    })
  }

  const formatCurrency = (text: any) => {
    if (text) {
      return `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return `$ 0`
  }

  const parseInputNumber = (text: any) => {
    return text.replace(/\$\s?|(,*)/g, '')
  }

  const handleChangeAccountNumber = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    form.setFieldsValue({
      emailMessage: EmailMessageHelper.buildAproveEmailMessage({
        accountNumber: event.target.value,
        amount: parseFloat(form.getFieldValue('amountTransfer')),
        template: profileState.profile?.institution?.templateApprove,
        routingNumber: props.initialValues?.emailMessageData.routingNumber,
        bankName: props.initialValues?.emailMessageData.bankName,
        bankSlug: props.initialValues?.emailMessageData.bankSlug,
        fullName: props.initialValues?.emailMessageData.fullName,
        productName: props.initialValues?.emailMessageData.productName,
        employeeName: props.initialValues?.emailMessageData.employeeName,
      }),
    })
  }

  // when we change the body message
  const handleChangeBodyMessage = (e: any) => {
    if (isManualEditMode === false) {
      setManualEditMode(true)
    }
  }
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      data-testid="account-request-aproval-form"
      layout="vertical"
      className="ni-modal-form-padded"
      onFinish={handleSubmit}
      initialValues={{
        emailSubject: props.initialValues?.emailSubject,
        amountTransfer: props.initialValues?.amountTransfer,
        accountNumber: props.initialValues?.emailMessageData.accountNumber,
        emailMessage: EmailMessageHelper.buildAproveEmailMessage({
          amount: props.initialValues?.amountTransfer,
          routingNumber: props.initialValues?.emailMessageData.routingNumber,
          template: profileState.profile?.institution?.templateApprove,
          bankName: props.initialValues?.emailMessageData.bankName,
          bankSlug: props.initialValues?.emailMessageData.bankSlug,
          accountNumber: props.initialValues?.emailMessageData.accountNumber,
          fullName: props.initialValues?.emailMessageData.fullName,
          productName: props.initialValues?.emailMessageData.productName,
          employeeName: props.initialValues?.emailMessageData.employeeName,
        }),
        branchId: props.initialValues?.branchId,
      }}
    >
      <Form.Item
        label="Email Subject"
        name="emailSubject"
        rules={[{ required: true, message: 'Please add a Email Subject' }]}
      >
        <Input placeholder="Email subject" size="large" />
      </Form.Item>

      <Row gutter={[20, 20]} hidden={isManualEditMode}>
        <Col span={16}>
          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[
              {
                required: isManualEditMode === false,
                message: 'Account Number is required.',
              },
            ]}
          >
            <Input onChange={handleChangeAccountNumber} size="large" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Amount to transfer" name="amountTransfer">
            <InputNumber
              placeholder="$ 300"
              size="large"
              formatter={formatCurrency}
              parser={parseInputNumber}
              onChange={handleChangeAmount}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="E-mail Message"
        name="emailMessage"
        rules={[{ required: true, message: 'E-mail body is required.' }]}
      >
        <Input.TextArea
          placeholder="Insert Text"
          className={'input-message'}
          onClick={handleChangeBodyMessage}
        />
      </Form.Item>

      {isManualEditMode && (
        <Alert
          className="u-margin-bottom-xl"
          message="You are now editing the message directly. We disabled the other control fields."
          type="info"
        />
      )}

      {props.children}

      <Form.Item
        label="What Branch do you wish to assign this account to?"
        name="branchId"
      >
        <Dropdown
          name="branchDropdown"
          options={props.branches}
          value={props.initialValues?.branchId}
        />
      </Form.Item>
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
          Send & Accept
        </Button>
      </Row>
    </Form>
  )
}
