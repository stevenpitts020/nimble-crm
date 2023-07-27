import React from 'react'
import { Row } from 'antd'
import { Box, FormChangePassword, Hero, LockIcon } from '../../components'

const ChangePassword: React.FC = () => {
  return (
    <Row align="middle" justify="center">
      <Box marginTop="xl" size="small" theme="light" shadow="small">
        <Hero
          theme="light"
          title="Change your password"
          rounded="top"
          subTitle="Please enter your current and new password below."
        >
          <LockIcon className="u-margin-bottom-sm" />
        </Hero>
        <Box className="padding-xl">
          <FormChangePassword />
        </Box>
      </Box>
    </Row>
  )
}

export default ChangePassword
