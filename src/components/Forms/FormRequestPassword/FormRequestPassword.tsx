import React, { useContext } from 'react'
import { Row, Input, Button, Typography, Alert, Form } from 'antd'
import { useHistory } from 'react-router-dom'
import { Stack, Box } from '../..'
import { log } from '../../../services'
import { RequestPasswordContext } from '../../../store/RequestPasswordProvider'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'

const { Text } = Typography

export const FormRequestPassword: React.FC = () => {
  const history = useHistory()
  const { requestState, requestPassword } = useContext(RequestPasswordContext)
  const [form] = Form.useForm()
  const loading = requestState.status === 'loading'

  const handleCancel = async () => {
    log.info('canceled', 'FormRequestPassword')
    history.push('/login')
  }

  const handleRequestPass = async (values: Store) => {
    log.info(values.email, 'handleRequestPass')
    await requestPassword(values.email)
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  if (requestState.status === 'success') {
    return (
      <>
        <div className="request-pass-form--spacer" data-testid="alertSuccess">
          <Stack direction="vertical" spacing="md" textAlign="center">
            <Alert message="Password reset link sent" type="success" />
            <Text className="ni-color-gray">
              Please check your email for instructions on what to do next
            </Text>
          </Stack>
        </div>
        <Box textAlign="center">
          <Button
            type="ghost"
            shape="round"
            htmlType="button"
            onClick={handleCancel}
          >
            Go to Login
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Form
      data-testid="request-pass-form"
      onFinish={handleRequestPass}
      layout="vertical"
      form={form}
    >
      <div className="request-pass-form--spacer">
        <Form.Item
          label="Your E-mail"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The E-mail entered is not valid',
            },
            { required: true, message: 'Please input your e-mail' },
          ]}
        >
          <Input size="large" placeholder="Your E-mail" />
        </Form.Item>
      </div>

      {requestState.error && (
        <div role="alert" data-testid="alert">
          <Box marginBottom="xl" textAlign="center">
            <Text type="danger">{requestState.error}</Text>
          </Box>
        </div>
      )}

      <Row align="middle" justify="space-between">
        <Button
          type="ghost"
          shape="round"
          htmlType="button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          data-testid="submit"
          type="primary"
          shape="round"
          htmlType="submit"
          disabled={hasErrors(form.getFieldsError()) || loading}
          loading={loading}
          className="padding-vertical-xl"
        >
          {loading ? 'Loading...' : 'Request Reset Link'}
        </Button>
      </Row>
    </Form>
  )
}
