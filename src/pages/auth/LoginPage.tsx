import React, { useState } from 'react'
import { Row, Spin } from 'antd'
import { Box, FormLogin } from '../../components'
import { InstitutionProvider } from '../../store/InstitutionProvider'
import { AuthContextStore } from '../../store/AuthProvider'
import { Redirect } from 'react-router-dom'
import { AlertContext } from '../../store/AlertProvider'
import { useParams } from 'react-router'
import LocationHelper, { Link } from '../../utils/LocationHelper'

interface RouteParams {
  email: string
  token: string
}

const HOME = '/accounts'

const LoginPage: React.FC = (props: any) => {
  const { email, token } = useParams<RouteParams>()

  // Note: this syntax will be refactored in Ant 4.0. We can refactor login form then.
  const { isAuthenticated, auth, handleMagicLink } = React.useContext(
    AuthContextStore
  )
  const { showAlert } = React.useContext(AlertContext)

  const [link, setLink] = useState<Link>()

  const loginAttempt = !!(email && token && !isAuthenticated())

  React.useEffect(() => {
    if (loginAttempt)
      (async () => {
        await handleMagicLink({ email, token })
        const _link = LocationHelper.getLink()
        setLink(_link ? _link : { pathname: HOME })
      })()
    else if (isAuthenticated()) setLink({ pathname: HOME })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once

  React.useEffect(() => {
    if (auth.error) {
      showAlert({
        message: auth.error,
        type: auth.status === 'success' ? 'success' : 'error',
        timeout: 3000,
      })
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.error])

  return (
    <Row align="middle" justify="center">
      <Box marginTop="xl" size="small" theme="light" shadow="small">
        <Box className="padding-xl">
          {link && <Redirect to={link} />}
          <InstitutionProvider>
            <Spin spinning={loginAttempt || isAuthenticated()}>
              <FormLogin />
            </Spin>
          </InstitutionProvider>
        </Box>
      </Box>
    </Row>
  )
}

export default LoginPage
