import React, { useContext } from 'react'
import { Row, Input, Button, Typography, Form } from 'antd'
import { Stack, Box } from '../..'
import { AuthContextStore } from '../../../store/AuthProvider'
import { ProfileContext } from '../../../store/ProfileProvider'
import { AlertContext } from '../../../store/AlertProvider'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'

const { Text } = Typography

export const FormChangePassword: React.FC = () => {
  const { auth, changePassword } = useContext(AuthContextStore)
  const { showAlert } = useContext(AlertContext)

  React.useEffect(() => {
    if (auth.status === 'passwordChanged') {
      showAlert({
        message: 'Your password has been changed',
        type: 'success',
        timeout: 3000,
      })
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.status])

  const { profileState } = useContext(ProfileContext)
  const loading = auth.status === 'loading'

  const handleChangePassword = async (values: Store) => {
    const { currentPassword, newPassword } = values
    if (profileState.profile) {
      const credentials = {
        email: profileState.profile.email,
        password: currentPassword,
      }
      await changePassword(credentials, newPassword)
    }
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  const [form] = Form.useForm()

  return (
    <Stack direction="vertical" spacing="xl">
      <Form
        data-testid="change-password-form"
        onFinish={handleChangePassword}
        layout="vertical"
        form={form}
      >
        <div className="change-pass-form">
          <Form.Item
            label="Current"
            hasFeedback={true}
            name="currentPassword"
            rules={[
              {
                required: true,
                message: 'Please enter your current password',
              },
            ]}
          >
            <Input size="large" placeholder="" type="password" />
          </Form.Item>
          <Form.Item
            label="New password"
            name="newPassword"
            hasFeedback={true}
            rules={[
              { required: true, message: 'Please enter your new password' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('currentPassword') !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    'New password is exactly the same as current'
                  )
                },
              }),
            ]}
          >
            <Input size="large" placeholder="" type="password" />
          </Form.Item>

          <Form.Item
            label="Re-enter your new password"
            name="confirmPassword"
            hasFeedback={true}
            rules={[
              { required: true, message: 'Please confirm the password' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
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

        {auth.error && (
          <div role="alert" data-testid="alert">
            <Box marginBottom="xl" textAlign="center">
              <Text type="danger">{auth.error}</Text>
            </Box>
          </div>
        )}

        <Row align="middle" justify="center">
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
            Change Password
          </Button>
        </Row>
      </Form>
    </Stack>
  )
}
