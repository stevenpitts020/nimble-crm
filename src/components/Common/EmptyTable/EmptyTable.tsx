import React from 'react'
import { Typography, Empty } from 'antd'
import { Box } from '../../index'

export const EmptyTable: React.FC = (props: any) => {
  const { Title } = Typography
  return (
    <div>
      <Box textAlign="center" style={{ margin: '0 auto', maxWidth: '250px' }}>
        <Title level={3} type="secondary">
          This list is empty
        </Title>
        <Empty
          description={
            <span>
              Don't worry, pretty soon we will have more to show here.
            </span>
          }
        />
      </Box>
    </div>
  )
}
