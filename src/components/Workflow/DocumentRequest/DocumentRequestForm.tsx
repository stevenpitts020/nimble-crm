/* eslint-disable */
// @ts-nocheck

import React from 'react'
import { Input, Row, Button, Form, Select } from 'antd'
import { FieldError } from 'rc-field-form/lib/interface'
import { IDocumentRequest } from '../../../store'
import { FormInstance } from "antd/lib/form";

export interface IDocumentRequestFormValues {
  productType?: string,
  productName?: string,
  documentType?: string,
  documentName?: string,
  senderName?: string,
  senderEmail?: string,
  recipientName?: string,
  recipientEmail?: string
}

interface IDocumentRequestForm {
  form?: FormInstance
  initialValues?: IDocumentRequestFormValues
  loading?: boolean
  onCancel?: () => void
  onSubmit?: (request: IDocumentRequest) => void
}

export const DocumentRequestForm: React.FC<IDocumentRequestForm> = (props: IDocumentRequestForm) => {
  const form = props.form || Form.useForm()[0]

  const handleCancel = () => {
    if (props.onCancel) props.onCancel()
  }

  const hasErrors = (fieldsError: FieldError[]) => {
    return fieldsError.some((field: FieldError) => field.errors.length > 0)
  }

  const onSubmit = (values: IDocumentRequestFormValues) => {
    if (props.onSubmit) props.onSubmit({
      product: {
        type: values?.productType || '',
        name: values?.productName || '',
      },
      document: {
        type: values?.documentType || '',
        name: values?.documentName || '',
      },
      sender: {
        name: values?.senderName || '',
        email: values?.senderEmail || ''
      },
      recipient: {
        name: values?.recipientName || '',
        email: values?.recipientEmail || ''
      }
    })
  }

  return (
    <div className={'document-request-form'}>
      <Form
        form={form}
        name='doc-req'
        data-testid="document-request-form"
        layout="vertical"
        className="ni-modal-form-padded"
        onFinish={onSubmit}
        initialValues={props.initialValues}
      >
        <div className="ni-modal-form-content">

          <Form.Item
            name="productType"
            label="Product Type"
            rules={[
              {
                required: true,
                message: 'Product Type is required',
              },
            ]}
          ><Select disabled={props.loading} options={[
            { value: 'cc', label: 'Credit Card' },
            { value: 'loan', label: 'Loan' },
          ]} /></Form.Item>

          <Form.Item
            name="productName"
            label="Product Name"
            rules={[
              {
                required: true,
                message: 'Product Name is required',
              },
            ]}
          ><Input disabled={props.loading} /></Form.Item>

          <Form.Item
            name="documentType"
            label="Document Type"
            rules={[
              {
                required: true,
                message: 'Document Type is required',
              },
            ]}
          ><Select disabled={props.loading} options={[
            { value: 'tax', label: 'Tax Filing' },
            { value: 'financial-statement', label: 'Financial Statement' },
          ]} /></Form.Item>

          <Form.Item
            name="documentName"
            label="Document Name"
            rules={[
              {
                required: true,
                message: 'Document Name is required',
              },
            ]}
          ><Input disabled={props.loading} />
          </Form.Item>

          <Form.Item
            name="senderName"
            label="Sender Name"
            rules={[
              {
                required: true,
                message: 'Sender Name is required',
              },
            ]}
          ><Input disabled={props.loading} /></Form.Item>

          <Form.Item
            name="senderEmail"
            label="Sender Email"
            rules={[
              {
                required: true,
                message: 'Sender Email is required',
              },
            ]}
          ><Input disabled={props.loading} type='email' /></Form.Item>

          <Form.Item
            name="recipientName"
            label="Recipient Name"
            rules={[
              {
                required: true,
                message: 'Recipient Name is required',
              },
            ]}
          ><Input disabled={props.loading} /></Form.Item>

          <Form.Item
            name="recipientEmail"
            label="Recipient Email"
            rules={[
              {
                required: true,
                message: 'Recipient Email is required',
              },
            ]}
          ><Input disabled={props.loading} type='email' /></Form.Item>

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
              Send Document Request
            </Button>
          </Row>
        </div>
      </Form>
    </div>
  )
}
