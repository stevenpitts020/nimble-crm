import { Row } from 'antd'
import React from 'react'
import { Box } from '../../components'
import { FormRequestVerification } from '../../components/Forms/FormRequestVerification/FormRequestVerification'

const RequestVerification: React.FC = () => {
  return (
    <Row align="middle" justify="center">
      <Box marginTop="xl" size="small" theme="light" shadow="small">
        <Box className="padding-xl">
          <FormRequestVerification />
        </Box>
      </Box>
    </Row>
  )
}

export default RequestVerification
