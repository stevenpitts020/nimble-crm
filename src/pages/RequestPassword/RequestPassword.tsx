import React from 'react'
import { Row } from 'antd'
import { Box, FormRequestPassword, Hero, LockIcon } from '../../components'

const RequestPassword: React.FC = (props: any) => {
  // Note: this syntax will be refactored in Ant 4.0. We can refactor form then.

  return (
    <Row align="middle" justify="center">
      <Box marginTop="xl" size="small" theme="light" shadow="small">
        <Hero
          title="Did you forget your password?"
          rounded="top"
          subTitle="Enter your email address below and we will send you a password reset link."
        >
          <LockIcon className="u-margin-bottom-sm" />
        </Hero>
        <Box className="padding-xl">
          <FormRequestPassword />
        </Box>
      </Box>
    </Row>
  )
}

export default RequestPassword
