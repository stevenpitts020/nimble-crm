import React from 'react'
import { Typography } from 'antd'
import { Box } from '../../index'
import emptyTableIcon from './emptyTableIcon.svg'

const { Title, Paragraph } = Typography

export const EmptyUser: React.FC = () => {
  return (
    <Box textAlign="center" style={{ margin: '0 auto' }}>
      <img
        src={emptyTableIcon}
        alt="Empty table"
        style={{ position: 'relative', left: '-20px', marginBottom: '30px' }}
      />
      <Title level={3} type="secondary">
        Your list is empty
      </Title>
      <Paragraph type="secondary" data-testid="empty-accounts">
        No Users.
      </Paragraph>
    </Box>
  )
}
