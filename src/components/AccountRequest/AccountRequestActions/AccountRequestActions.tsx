import React, { useContext } from 'react'
import { ModalWindow } from '../../Common/ModalWindow/ModalWindow'
import { SendAccountRequestForm } from '../SendAccountRequestForm/SendAccountRequestForm'
import { Button, Form } from 'antd'
import { log } from '../../../services'
import { AlertContext } from '../../../store/AlertProvider'
import { AlertMessage } from '../../Common/AlertMessage/AlertMessage'
import { INotificationCreate } from '../../../store'
import notificationService from '../../../services/NotificationService'

interface IAccountRequestActions {
  notifyDataChanged: () => void
  watchDataChanged: boolean
}

export const AccountRequestActions: React.FC<IAccountRequestActions> = (
  props: IAccountRequestActions
) => {
  const [form] = Form.useForm()

  const { showAlert } = useContext(AlertContext)

  const [
    sendAccountRequestModalVisible,
    setSendAccountRequestModalVisible,
  ] = React.useState<boolean>(false)

  const [loading, setLoading] = React.useState<boolean>(false)

  const hide = () => {
    setSendAccountRequestModalVisible(false)
    form.resetFields()
  }

  const show = () => {
    setLoading(false)
    setSendAccountRequestModalVisible(true)
  }

  // @see UserListActions
  const sendAccountRequest = async (notification: INotificationCreate) => {
    log.info(notification, 'sendAccountRequest')

    setLoading(true)

    try {
      const created = await notificationService.notify(notification)

      log.info(created, 'AccountRequestActions.created')

      props.notifyDataChanged()
      hide()
      setTimeout(
        () =>
          showAlert({
            message: `Notification successfully sent!`,
            type: 'success',
            timeout: 10000,
          }),
        500
      )
    } catch (err) {
      log.info(err.response, 'AccountRequestActions.notify')

      showAlert({
        message:
          err?.response?.data?.message ||
          err?.response.statusText ||
          err.message,
        type: 'error',
        timeout: 10000,
      })
    }

    setLoading(false)
  }

  return (
    <>
      <Button
        className="referral-button"
        hidden={false}
        disabled={false}
        loading={false}
        type="ghost"
        shape="circle"
        onClick={show}
      >
        +
      </Button>
      <ModalWindow
        visible={sendAccountRequestModalVisible}
        afterClose={hide}
        onCancel={hide}
        introductionTitle={'New Referral'}
        introductionText={'Please choose a product'}
      >
        <SendAccountRequestForm
          form={form}
          onSubmit={sendAccountRequest}
          onCancel={hide}
          loading={loading}
        />
        <AlertMessage />
      </ModalWindow>
    </>
  )
}
