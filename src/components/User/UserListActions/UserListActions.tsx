import _ from 'lodash'
import React, { useContext } from 'react'
import { ModalWindow } from '../../Common/ModalWindow/ModalWindow'
import { AddUserForm } from '../AddUserForm/AddUserForm'
import { Button, Form } from 'antd'
import { AuthContextStore } from '../../../store/AuthProvider'
import { ProfileContext } from '../../../store/ProfileProvider'
import { Store } from 'antd/lib/form/interface'
import { log, userService } from '../../../services'
import { AlertContext } from '../../../store/AlertProvider'
import { AlertMessage } from '../../Common/AlertMessage/AlertMessage'
import { IUserCreate } from '../../../store'

interface IUserListActionsProps {
  notifyDataChanged: () => void
  watchDataChanged: boolean
}

export const UserListActions: React.FC<IUserListActionsProps> = (
  props: IUserListActionsProps
) => {
  const {
    isSuperAdmin,
    isInstitutionAdmin,
    isBranchAdmin,
    assignableRoles,
  } = useContext(AuthContextStore)

  const [form] = Form.useForm()

  const { showAlert } = useContext(AlertContext)

  const { profileState } = useContext(ProfileContext)

  const me = profileState.profile

  const [addUserModalVisible, setAddUserModalVisible] = React.useState<boolean>(
    false
  )

  const [loading, setLoading] = React.useState<boolean>(false)

  const hide = () => {
    setAddUserModalVisible(false)
    form.resetFields()
  }

  const show = () => {
    setLoading(false)
    setAddUserModalVisible(true)
  }

  const addUser = async (values: Store) => {
    setLoading(true)

    try {
      const user: IUserCreate = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        institutionId: isSuperAdmin(me) ? values?.institution?.value : null,
        branchId: isInstitutionAdmin(me) ? values?.branch?.value : null,
      }

      if (values?.roles && isInstitutionAdmin(me))
        user.roles = _.map(values.roles, 'value')

      const created = await userService.create(user)

      log.info(created, 'UserListAction.addUser')

      props.notifyDataChanged()
      hide()
      setTimeout(
        () =>
          showAlert({
            message: `${created.firstName} ${created.lastName} successfully created and welcome email sent!`,
            type: 'success',
            timeout: 10000,
          }),
        500
      )
    } catch (err) {
      log.info(err.response, 'UserListAction.addUser')

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
        disabled={!isBranchAdmin(me)}
        loading={false}
        type="primary"
        htmlType="submit"
        shape="round"
        onClick={show}
      >
        Add User
      </Button>
      <ModalWindow
        visible={addUserModalVisible}
        afterClose={hide}
        onCancel={hide}
        introductionTitle={'Add User'}
        introductionText={`Add a new user to ${me?.institution?.name ||
          'your institution'}.`}
      >
        <AddUserForm
          form={form}
          onSubmit={addUser}
          onCancel={hide}
          loading={loading}
          roles={assignableRoles(me)}
        />
        <AlertMessage />
      </ModalWindow>
    </>
  )
}
