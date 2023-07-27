import React from 'react'
import { Form } from 'antd'
import { Upload, Input } from 'antd'

interface INewProspectForm {
  title?: string
}

export const NewProspectForm: React.FC<INewProspectForm> = (
  props: INewProspectForm
) => {
  return (
    <Form layout="vertical">
      <Form.Item>
        <Upload.Dragger
          name="files"
          action="http://www.mocky.io/v2/5d9e1eba3200005400329c36"
        >
          <p className="ant-upload-text">Drop Driver Licence Here</p>
        </Upload.Dragger>
      </Form.Item>
      <Form.Item label="SSN" required={true}>
        <Input placeholder="Please enter a SSN" size="large" />
      </Form.Item>
      <Form.Item label="Phone Number" required={true}>
        <Input placeholder="Please enter a phone number" size="large" />
      </Form.Item>
      <Form.Item label="E-mail" required={true}>
        <Input placeholder="Please enter an e-mail" size="large" />
      </Form.Item>
    </Form>
  )
}
