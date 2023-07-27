import React, { useContext } from 'react'
import { Input, Row, Col, Button, Form } from 'antd'
import { ProfileContext } from '../../../store/ProfileProvider'
import { log } from '../../../services'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'
import { ISelectOptions } from '../../../store'
import Select from 'react-select'
import { AuthContextStore } from '../../../store/AuthProvider'
import { FormInstance } from 'antd/lib/form'
import { useInstitutionBranches } from '../../../hooks/useInstitutionBranches'

export interface IAddUserFormInitialValues {
  firstName: string
  lastName: string
  email: string
  roles?: ISelectOptions[]
  institution?: ISelectOptions
  branch?: ISelectOptions
}

interface IAddUserForm {
  form: FormInstance
  loading?: boolean
  initialValues?: IAddUserFormInitialValues
  onCancel?: () => void
  onSubmit?: (values: Store) => void
  roles?: ISelectOptions[]
}

export const AddUserForm: React.FC<IAddUserForm> = (props: IAddUserForm) => {
  const form = props.form
  const { profileState } = useContext(ProfileContext)

  const user = profileState.profile
  const org = user?.institution!
  const branch = user?.branch!

  const { data, status } = useInstitutionBranches(org.id)

  const branches =
    status === 'error'
      ? [{ value: branch.id, label: branch.name }]
      : data?.map(datum => {
          return {
            value: datum.id,
            label: datum.name,
          }
        })

  const { isSuperAdmin, isInstitutionAdmin } = useContext(AuthContextStore)

  const superAdmin = isSuperAdmin(user)
  const institutionAdmin = isInstitutionAdmin(user)

  const handleSubmit = (values: Store) => {
    log.info(values, 'AddUserForm.handleSubmit')
    if (props.onSubmit) props.onSubmit(values)
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  return (
    <Form
      form={form}
      data-testid="add-user-form"
      layout="vertical"
      className="ni-modal-form-padded"
      onFinish={handleSubmit}
      initialValues={{
        roles: [{ value: 'employee', label: 'Employee' }],
        institution: {
          value: profileState.profile?.institution?.id,
          label: profileState.profile?.institution?.name,
        },
        branch: {
          value: profileState.profile?.branch?.id,
          label: profileState.profile?.branch?.name,
        },
      }}
    >
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'First Name is required',
              },
            ]}
          >
            <Input placeholder="First" size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Last Name is required',
              },
            ]}
          >
            <Input placeholder="Last" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Email is required',
          },
        ]}
      >
        <Input
          placeholder={`user@${profileState.profile?.institution?.domain}`}
          size="large"
          type={'email'}
        />
      </Form.Item>

      <Form.Item label="Roles" name="roles">
        <Select
          name="roles"
          className="multi-select user-roles"
          isMulti={true}
          isDisabled={!institutionAdmin}
          options={props.roles}
        />
      </Form.Item>

      <Form.Item label="Institution" name="institution">
        <Select
          name="institution"
          isDisabled={!superAdmin}
          className="multi-select user-institutions"
          options={[{ value: org.id, label: org.name }]}
          defaultValue={[{ value: org.id, label: org.name }]}
        />
      </Form.Item>

      <Form.Item label="Branch" name="branch">
        <Select
          name="branch"
          isDisabled={!institutionAdmin}
          className="multi-select user-branches"
          defaultValue={[{ value: branch.id, label: branch.name }]}
          options={branches}
        />
      </Form.Item>

      <Row justify="space-between" align="middle">
        <Button type="default" shape="round" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button
          disabled={hasErrors(form.getFieldsError()) || props.loading}
          loading={props.loading}
          type="primary"
          htmlType="submit"
          shape="round"
        >
          Save
        </Button>
      </Row>
    </Form>
  )
}
