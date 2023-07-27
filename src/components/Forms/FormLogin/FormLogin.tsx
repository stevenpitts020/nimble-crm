import React, { useState, useContext, ChangeEvent } from 'react'
import { Row, Input, Button, Typography, Form } from 'antd'
import { Stack, Box } from '../..'
import { InstitutionLogo } from '../../InstitutionLogo/InstitutionLogo'

/* Our Context */
import { AuthContextStore } from '../../../store/AuthProvider'
import { InstitutionContext } from '../../../store/InstitutionProvider'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'
import Config from '../../../services/Config'
import Repo from '../../../services/Repo'

export interface UserAuth {
  password: string
  email: string
}

const { Title, Text } = Typography

export const FormLogin: React.FC = () => {
  // get global context
  const { auth, handleLogin, getLastEmail } = useContext(AuthContextStore)
  const { institutionState, getInstitutionByDomain } = useContext(
    InstitutionContext
  )
  const [lastEmail, setLastEmail] = useState<string>()

  const [form] = Form.useForm()

  React.useEffect(() => form.setFieldsValue({ email: getLastEmail() || '' }))

  const loading = auth.status === 'loading'

  const authHandler = async (values: Store) => {
    // should this error business be handled inside the provider?
    const credentials = { email: values.email, password: values.password }
    await handleLogin(credentials)
  }

  // get institution from the email
  const handleChangeEmail = async (event: any) => {
    const currentEmailValue = event.target?.value

    // avoid extra request
    if (lastEmail === currentEmailValue) {
      return
    }
    setLastEmail(currentEmailValue)
    await getInstitutionByDomain(currentEmailValue)
  }

  const onTypeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    Repo.setItem('login_form_email', event.target?.value)
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  const storedEmail = () => Repo.getItem('login_form_email') || ''

  React.useEffect(() => {
    form.setFieldsValue({ email: storedEmail() })
  })

  return (
    <Stack direction="vertical" spacing="xl">
      <Stack direction="vertical" spacing="xxl" horizontalAlign="center">
        <InstitutionLogo
          src={institutionState.institution?.logoUri?.default}
          alt={institutionState.institution?.name}
          width={'200'}
        />
        <Title level={1}>Sign in to your account</Title>
      </Stack>

      <Form
        data-testid="login-form"
        onFinish={authHandler}
        className="ni-login-form"
        layout="vertical"
        form={form}
        initialValues={{ email: storedEmail() }}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The E-mail entered is not valid',
            },
            { required: true, message: 'Please input your e-mail' },
          ]}
        >
          <Input
            size="large"
            placeholder="Your E-mail"
            onBlur={handleChangeEmail}
            onChange={onTypeEmail}
          />
        </Form.Item>
        <Form.Item
          hidden={true}
          label="Password"
          name="password"
          rules={[{ required: false, message: 'Please input your password' }]}
        >
          <Input size="large" type="password" placeholder="Your Password" />
        </Form.Item>

        {auth.error && (
          <div role="alert" data-testid="alert">
            <Box marginBottom="xl" textAlign="center">
              <Text type={auth.status === 'success' ? 'success' : 'danger'}>
                {Config.local &&
                (auth.error.startsWith('http://') ||
                  auth.error.startsWith('https://')) ? (
                  <>
                    <Box>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={auth.error}
                      >
                        LOCAL DEVELOPMENT NEW SESSION LINK
                      </a>
                    </Box>
                    <Box marginTop="xl">
                      <a href={auth.error}>LOCAL DEVELOPMENT LINK</a>
                    </Box>
                  </>
                ) : (
                  auth.error
                )}
              </Text>
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
            className="ni-button"
          >
            {loading ? 'Loading...' : 'Sign In with Email'}
          </Button>
        </Row>
      </Form>
    </Stack>
  )
}
