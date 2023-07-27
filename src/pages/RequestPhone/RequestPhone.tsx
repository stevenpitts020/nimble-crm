import { Row } from 'antd'
import React from 'react'
import { Box, FormRequestPhone } from '../../components'

const RequestPhone: React.FC = () => {
  return (
    <Row align="middle" justify="center">
      <Box marginTop="xl" size="small" theme="light" shadow="small">
        <Box className="padding-xl">
          <FormRequestPhone />
        </Box>
      </Box>
    </Row>
  )
}

export default RequestPhone
