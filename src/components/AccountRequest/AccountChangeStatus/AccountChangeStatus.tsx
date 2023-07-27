import React, { useContext } from 'react'
import { Button, Alert } from 'antd'
import { Stack, ModalWindow, AccountAprovalForm } from '../../index'
import { AccountRequestDetailContext } from '../../../store/AccountRequestDetailProvider'
import { ProfileContext } from '../../../store/ProfileProvider'
import { AccountDeclineForm } from '../AccountDeclineForm/AccountDeclineForm'
import { Store } from 'antd/lib/form/interface'
import { IInstitutionBranch } from '../../../store'

interface IChangeAccountRequestAproval {
  id: string
  product: string
  amount: number
  routingNumber: string
  accountNumber: string
  primarySignerfullName: string
  disableAcceptButton: boolean
  branches: IInstitutionBranch[]
}

export const AccountChangeStatus: React.FC<IChangeAccountRequestAproval> = (
  props: IChangeAccountRequestAproval
) => {
  const [aprovalModalVisible, setAprovalModalVisible] = React.useState<boolean>(
    false
  )
  const [DeclineModalVisible, setDeclineModalVisible] = React.useState<boolean>(
    false
  )

  const { accountState, updateAccountRequest, clearData } = useContext(
    AccountRequestDetailContext
  )
  const { profileState } = useContext(ProfileContext)

  const defaultBranch = profileState.profile?.branch
    ? profileState.profile?.branch
    : { name: '', id: '' }
  // set initial values for the accept form
  const aprovalFormInitialValues = {
    emailSubject: 'Account Request Accepted',
    amountTransfer: props.amount,
    emailMessageData: {
      accountNumber: props.accountNumber,
      bankName: profileState?.profile?.institution?.name || 'Loading',
      bankSlug: profileState?.profile?.institution?.domain || 'Loading',
      employeeName: `${profileState?.profile?.firstName} ${profileState?.profile?.lastName}`,
      routingNumber: props.routingNumber,
      fullName: '{$Signer_FirstName}',
      productName: props.product,
    },
    branchId: defaultBranch.id,
  }
  // set initial values for the Decline form
  const DeclineFormInitialValues = {
    emailSubject: 'Account Request Declined',
    emailMessageData: {
      template:
        profileState?.profile?.institution?.templateDecline || 'Loading',
      bankName: profileState?.profile?.institution?.name || 'Loading',
      bankSlug: profileState?.profile?.institution?.domain || 'Loading',
      employeeName: `${profileState?.profile?.firstName} ${profileState?.profile?.lastName}`,
      routingNumber: props.routingNumber,
      fullName: '{$Signer_FullName}',
      productName: props.product,
    },
  }

  React.useEffect(() => {
    // hide if state transitioned to success!
    if (accountState.status === 'success') {
      hideAprovalModal()
      hideDeclineModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountState.status])

  const hideAprovalModal = () => {
    setAprovalModalVisible(false)
    clearData()
  }

  const hideDeclineModal = () => {
    setDeclineModalVisible(false)
    clearData()
  }

  const openDeclineModal = () => {
    setDeclineModalVisible(true)
  }

  const openAcceptModal = () => {
    setAprovalModalVisible(true)
  }

  const onSubmitAprovalForm = async (values: Store) => {
    await updateAccountRequest(props.id, {
      status: 'APPROVED',
      statusEmailSubject: values.emailSubject,
      statusEmailBody: values.emailMessage,
      branchId: values.branchId,
    })
  }

  const onSubmitDeclineForm = async (values: Store) => {
    await updateAccountRequest(props.id, {
      status: 'DECLINED',
      statusEmailSubject: values.emailSubject,
      statusEmailBody: values.emailMessage,
    })
  }

  return (
    <>
      <Stack
        direction="horizontal"
        spacing="md"
        data-testid="account-change-status-buttons"
      >
        <Button danger={true} shape="round" onClick={openDeclineModal}>
          Decline
        </Button>
        <Button
          data-testid="accept-button"
          shape="round"
          className="ant-btn-success"
          disabled={props.disableAcceptButton}
          onClick={openAcceptModal}
        >
          Accept
        </Button>
      </Stack>

      <ModalWindow
        visible={aprovalModalVisible}
        afterClose={hideAprovalModal}
        onCancel={hideAprovalModal}
        introductionTitle={'Accept'}
        introductionText={
          'This notification will be sent to the prospect notifying him that the account was created and he should move funds to the new account'
        }
      >
        {profileState.profile && (
          <AccountAprovalForm
            onSubmit={onSubmitAprovalForm}
            onCancel={hideAprovalModal}
            initialValues={aprovalFormInitialValues}
            loading={accountState.status === 'updating'}
            branches={props.branches}
          >
            {accountState.status === 'failure' && (
              <Alert
                message="There was an error while accepting this account. Try again or contact support."
                type="error"
                className="u-margin-bottom-xl"
              />
            )}
          </AccountAprovalForm>
        )}
      </ModalWindow>

      <ModalWindow
        visible={DeclineModalVisible}
        afterClose={hideDeclineModal}
        onCancel={hideDeclineModal}
        introductionTitle={'Decline'}
        introductionText={
          'This message will be sent to the Prospect explaining why we are Declining their account request.'
        }
      >
        {profileState.profile && (
          <AccountDeclineForm
            onSubmit={onSubmitDeclineForm}
            onCancel={hideDeclineModal}
            initialValues={DeclineFormInitialValues}
            loading={accountState.status === 'updating'}
          >
            {accountState.status === 'failure' && (
              <Alert
                message="There was an error while Declining this account. Try again or contact support."
                type="error"
                className="u-margin-bottom-xl"
              />
            )}
          </AccountDeclineForm>
        )}
      </ModalWindow>
    </>
  )
}
