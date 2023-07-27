import React from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { Row } from 'antd'
import { Box, FormSetPassword, Hero, LockIcon } from '../../components'
import moment from 'moment'
import { log } from '../../services'

interface RouteParams {
  code: string
  email: string
  expireAt: string
}

const ResetPassword: React.FC = (props: any) => {
  const history = useHistory()
  const { code, email, expireAt } = useParams<RouteParams>()

  const isExpired = () => {
    const expirationTimeLocal = moment.utc(expireAt)
    const now = moment.utc()
    return expirationTimeLocal.diff(now) <= 0
  }

  const { pathname } = useLocation()
  // if the 'set-password' string is present in the pathname, then User is completing the registration
  // and setting his password for the first time. In all other cases, User is resetting his password
  const isCodeExpiredRegex = /set-password/g
  const isUserSettingPassword = isCodeExpiredRegex.test(pathname)

  // if token is expired we redirect to '/auth/error/:code,
  // where code highlight a specific case of expiraton
  if (isExpired()) {
    if (isUserSettingPassword) {
      log.info('expired', 'ResetPassword')
      history.push('/auth/error/password-expired')
    } else {
      log.info('expired', 'ResetPassword')
      history.push('/auth/error/reset-expired')
    }
  }

  return (
    <Row align="middle" justify="center">
      <Box marginTop="xl" size="small" theme="light" shadow="small">
        <Hero
          theme="dark"
          title={
            isUserSettingPassword ? 'Set your password' : 'Reset your password'
          }
          rounded="top"
          subTitle={
            isUserSettingPassword
              ? 'Please set your password to complete your account registration'
              : 'Please enter your new password below'
          }
        >
          <LockIcon className="u-margin-bottom-sm" />
        </Hero>
        <Box className="padding-xl">
          {/* replace this component with real form */}
          {code && email && (
            <FormSetPassword
              code={code}
              email={email}
              isFirstPasswordChange={isUserSettingPassword}
            />
          )}
        </Box>
      </Box>
    </Row>
  )
}

export default ResetPassword
