import React from 'react'
import { Input, Row, Button, Form } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { FieldError } from 'rc-field-form/lib/interface'
import { FormInstance } from 'antd/lib/form'
import { ISearchData } from '../../../store'

interface ISaveSearchForm {
  form: FormInstance
  query: any
  filters: any[]
  loading?: boolean
  onCancel?: () => void
  onSubmit?: (search: ISearchData) => void
}

export const SaveSearchForm: React.FC<ISaveSearchForm> = (
  props: ISaveSearchForm
) => {
  const form = props.form

  const handleCancel = () => {
    if (props.onCancel) props.onCancel()
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  const onFinish = (values: Store) => {
    if (props.onSubmit)
      props.onSubmit({
        name: values.name,
        description: values.description,
        query: props.query,
        filters: props.filters,
      })
  }

  return (
    <div className={'send-account-request-referral-form'}>
      <Form
        form={form}
        data-testid="save-search-form"
        layout="vertical"
        className="ni-modal-form-padded"
        onFinish={onFinish}
        initialValues={{
          name: null,
          description: null,
        }}
      >
        <div className="ni-modal-form-content">
          <Form.Item
            name="name"
            label="Name your search"
            rules={[
              {
                required: true,
                message: 'Name is required',
              },
            ]}
          >
            <Input size="large" disabled={props.loading} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea
              placeholder="A short description of your search..."
              className={'input-message'}
              disabled={props.loading}
            />
          </Form.Item>
        </div>
        <div className="ni-modal-form-actions">
          <Row justify="space-between" align="middle">
            <Button type="default" shape="round" onClick={handleCancel}>
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
        </div>
      </Form>
    </div>
  )
}
