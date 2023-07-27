/* eslint-disable */
// @ts-nocheck

import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, List, Typography } from "antd";
import { AlertMessage } from "../../Common/AlertMessage/AlertMessage";
import { ModalWindow } from "../../Common/ModalWindow/ModalWindow";
import { DocumentRequestForm } from "./DocumentRequestForm";
import { ProfileContext } from "../../../store/ProfileProvider";
import { IDocumentRequest } from "../../../store";
import { log } from "../../../services";
import { AlertContext } from "../../../store/AlertProvider";
import WorkflowService from "../../../services/WorkflowService";

export interface IDocumentRequestProps {
}

export const DocumentRequest: React.FC<IDocumentRequestProps> = (props: IDocumentRequestProps) => {
  const [form] = Form.useForm()

  const { showAlert } = useContext(AlertContext)
  const { profileState } = useContext(ProfileContext)

  const [init, setInit] = useState<boolean>(false)
  const [runId, setRunId] = useState<string>()
  const [run, setRun] = useState<any[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const openForm = () => setShowForm(true)
  const closeForm = () => {
    setShowForm(false)
    form.resetFields()
  }

  const startDocumentRequest = async (req: IDocumentRequest) => {
    setLoading(true)
    setRun(null)

    try {
      const start = await WorkflowService.startDocumentRequest(req)

      setRunId(start.runId)

      log.info(start, 'DocumentRequest.start')

      closeForm()

      setTimeout(
        () =>
          showAlert({
            message: 'Successfully Started Document Request',
            type: 'success',
            timeout: 10000,
          }),
        500
      )
    } catch (err) {
      log.info(err.response, 'DocumentRequest.start')

      showAlert({
        message:
          err?.response?.data?.message ||
          err?.response.statusText ||
          err.message,
        type: 'error',
        timeout: 10000,
      })
    }

    setTimeout(() => {
      setLoading(false)
      closeForm()
    }, 1000)
  }

  const loadRun = () => {
    WorkflowService.run(runId)
      .catch(err => {
        console.log(err)
        setTimeout(loadRun, 5000)
      })
      .then(_run => {
        setRun(_run)
        setTimeout(loadRun, 5000)
      })
  }

  useEffect(() => {
    if (_.isNil(runId)) return
    if (init) return

    setInit(true)
    loadRun();
  }, [runId, init])

  return (
    <div className='document-request-wrapper'>
      <Button onClick={openForm}>Request Document</Button>

      <ModalWindow
        visible={showForm}
        afterClose={closeForm}
        onCancel={closeForm}
        introductionTitle={'Request a Document'}
        introductionText={'Start a document request workflow.'}
      >
        <DocumentRequestForm
          form={form}
          initialValues={{
            productType: 'loan',
            productName: 'Unsecured Personal Loan',
            documentType: 'tax',
            documentName: 'Form 1040 (2021)',
            senderName: `${profileState.profile?.firstName || ''} ${profileState.profile?.lastName || ''}`,
            senderEmail: profileState.profile?.email
          }}
          onSubmit={startDocumentRequest}
          onCancel={closeForm}
          loading={loading}
        />
        <AlertMessage />
      </ModalWindow>
      <List
        style={{ marginTop: '1em' }}
        header={<div>Status</div>}
        bordered={true}
        dataSource={_.get(run, 'actions')}
        renderItem={action => (
          <List.Item>
            <Typography.Text mark>[{action.status}]</Typography.Text> {_.startCase(action.key)}
          </List.Item>
        )}
      />
    </div>
  )
}
