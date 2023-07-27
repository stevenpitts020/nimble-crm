import React, { useState, useEffect } from 'react'
import { Badge, Button, Drawer } from 'antd'
import { BellIcon } from '../../Common/Icon/Icon'
import { SidebarNotifications } from '../../Dashboard/SidebarNotifications/SidebarNotifications'

interface INotificationProps {
  iconType?: string
  count?: number
}

export const NotificationBadge: React.FC<INotificationProps> = (
  props: INotificationProps
) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [count, setCount] = useState(0)

  const showNotificationModal = () => setModalVisible(true)

  const onClose = () => {
    setModalVisible(false)
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(() => {
      setCount(1)
    }, 1000)
  })

  return (
    <div className="ni-notification-badge">
      <Button
        shape="circle"
        size="small"
        block={true}
        onClick={showNotificationModal}
        type="link"
      >
        <Badge count={count} title="Warning" dot={true}>
          <BellIcon />
        </Badge>
      </Button>

      <Drawer
        width={'335px'}
        className={'ni-sidebar-drawer'}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={modalVisible}
      >
        <SidebarNotifications />
      </Drawer>
    </div>
  )
}

NotificationBadge.defaultProps = {
  iconType: 'notification',
}
