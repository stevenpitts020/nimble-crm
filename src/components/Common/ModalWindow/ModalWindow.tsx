import React from 'react'
import { Modal, Typography } from 'antd'

interface IModalWindow {
  visible: boolean
  introductionTitle?: string
  introductionText?: string
  children?: React.ReactNode
  afterClose?: () => void
  onCancel?: () => void
  closable?: boolean
  width?: string | number
}

export const ModalWindow: React.FC<IModalWindow> = (props: IModalWindow) => {
  const { Title, Text } = Typography

  return (
    <Modal
      closable={props.closable || false}
      maskClosable={props.closable || true}
      centered={true}
      visible={props.visible}
      footer={null}
      width={props.width || '25%'}
      className="ni-modal no-padding"
      afterClose={props.afterClose}
      onCancel={props.onCancel}
    >
      <div className="ni-modal-introduction">
        {props.introductionTitle && (
          <Title level={3}>{props.introductionTitle}</Title>
        )}
        {props.introductionText && (
          <Text className="ni-color-gray">{props.introductionText}</Text>
        )}
      </div>
      {props.children}
    </Modal>
  )
}

ModalWindow.defaultProps = {
  introductionTitle: '',
  introductionText: '',
}
