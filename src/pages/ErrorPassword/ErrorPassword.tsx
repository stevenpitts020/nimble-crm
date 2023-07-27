import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Typography } from 'antd'
import { Box, Hero, LockIcon } from '../../components'

export interface ErrorMessage {
  title: string
  text: string
  button: JSX.Element | null
}

interface RouteParams {
  code: string
}

const ErrorPassword: React.FC = (props: any) => {
  const { Paragraph } = Typography
  const { code } = useParams<RouteParams>()
  const [message, setMessage] = React.useState<ErrorMessage>({
    title: '',
    text: '',
    button: null,
  })

  const buttonMessage = (btnProps: { url: string; text: string }) => {
    return (
      <Link
        to={btnProps.url}
        className="ant-btn padding-vertical-xl ant-btn-primary ant-btn-round"
      >
        {btnProps.text}
      </Link>
    )
  }

  React.useEffect(() => {
    switch (code) {
      case 'reset-expired':
        setMessage({
          title: 'This password reset link has expired',
          text: 'You need to reset your password again.',
          button: buttonMessage({
            url: '/auth/request-password',
            text: 'Reset Your Password',
          }),
        })
        break
      case 'reset-used':
        setMessage({
          title: 'This password reset link has already been used',
          text: 'You need to reset your password again.',
          button: buttonMessage({
            url: '/auth/request-password',
            text: 'Reset Your Password',
          }),
        })
        break
      case 'password-expired':
        setMessage({
          title: 'This set password link has expired',
          text: 'You need to reset your password again.',
          button: buttonMessage({
            url: '/auth/request-password',
            text: 'Reset Your Password',
          }),
        })
        break
      case 'password-used':
        setMessage({
          title: 'This set password link has already been used',
          text: 'You need to reset your password again.',
          button: buttonMessage({
            url: '/auth/request-password',
            text: 'Reset Your Password',
          }),
        })
        break
      default:
        break
    }
  }, [code])

  return (
    <Row align="middle" justify="center">
      <Box marginTop="xl" size="small" theme="light" shadow="small">
        <Hero theme="dark" title={message.title} rounded="top">
          <LockIcon className="u-margin-bottom-sm" />
        </Hero>
        <Box className="padding-xl" textAlign="center">
          <div className="request-pass-form--spacer">
            <Paragraph type="secondary">{message.text}</Paragraph>
            {message.button}
          </div>
        </Box>
      </Box>
    </Row>
  )
}

export default ErrorPassword
