import React, { useContext } from 'react'
import { Row, Input, Button, Typography, Alert, Form } from 'antd'
import { useHistory } from 'react-router-dom'
import { Stack, Box } from '../..'
import { log } from '../../../services'
import { RequestPasswordContext } from '../../../store/RequestPasswordProvider'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'

interface IFormSetPassword {
  email: string
  code: string
  isFirstPasswordChange: boolean
}

const { Text } = Typography

export const FormSetPassword: React.FC<IFormSetPassword> = (
  props: IFormSetPassword
) => {
  const { changePassword, requestState } = useContext(RequestPasswordContext)

  const { isFirstPasswordChange, email, code } = props
  const [form] = Form.useForm()
  const loading = requestState.status === 'loading'

  const history = useHistory()
  const handleCancel = async () => {
    log.info('canceled', 'FormSetPassword')
    history.push('/login')
  }

  const handleChangePassword = async (values: Store) => {
    try {
      await changePassword(email, values.password, code)
    } catch (error) {
      log.error(error, 'Error in handleChangePassword')
    }
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  React.useEffect(() => {
    if (requestState.error) {
      // this is how we catch error when code is expired
      const codeExpiredRegex = /request a new code/g
      if (codeExpiredRegex.test(requestState.error)) {
        // error will be different on differnt Routes
        // when User completes registration OR reset his password
        if (isFirstPasswordChange) {
          log.info('Set code used', 'ResetPassword')
          history.push('/auth/error/password-used')
        } else {
          log.info('Reset code used', 'ResetPassword')
          history.push('/auth/error/reset-used')
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstPasswordChange, requestState.status, requestState.error])

  if (requestState.status === 'success') {
    return (
      <>
        <div className="request-pass-form--spacer" data-testid="alertSuccess">
          <Stack direction="vertical" spacing="md" textAlign="center">
            <Alert
              message={
                isFirstPasswordChange
                  ? 'Registration completed'
                  : 'Your password has been changed'
              }
              type="success"
            />
            <Text className="ni-color-gray">
              {isFirstPasswordChange
                ? 'Please Sign in to your account.'
                : 'Please Sign in to your account with you new password.'}
            </Text>
          </Stack>
        </div>
        <Box textAlign="center">
          <Button
            shape="round"
            htmlType="button"
            type="primary"
            onClick={handleCancel}
          >
            Sign in
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Stack direction="vertical" spacing="xl">
      <Form
        form={form}
        data-testid="set-password-form"
        onFinish={handleChangePassword}
        layout="vertical"
      >
        <div className="recover-pass-form--spacer">
          <Form.Item
            label="New password"
            hasFeedback={true}
            name="password"
            htmlFor="password"
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input size="large" placeholder="" type="password" />
          </Form.Item>

          <Form.Item
            label="Re-enter your new password"
            hasFeedback={true}
            name="confirmPassword"
            htmlFor="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm the password' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Passwords don`t match!')
                },
              }),
            ]}
          >
            <Input size="large" placeholder="" type="password" />
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
            style={{ background: '#62DB85' }}
          >
            {isFirstPasswordChange ? 'Set Password' : 'Change Password'}
          </Button>
        </Row>
      </Form>
    </Stack>
  )
}
