import React, { useContext } from 'react'
import { Spin, Skeleton } from 'antd'
import { useParams } from 'react-router'
import {
  NotFound,
  SignerDetailCard,
  SignerInvitedDetailCard,
  Stack,
  AccountHeader,
  AccountChangeStatus,
  Box,
} from '../../components'
import { SignerSchema, IProductOptionsConfiguration } from '../../store'
import { AccountRequestDetailContext } from '../../store/AccountRequestDetailProvider'
import { AlertContext } from '../../store/AlertProvider'
import FormatHelper from '../../utils/FormatHelper'
import { ProfileContext } from '../../store/ProfileProvider'
import { useInstitutionBranches } from '../../hooks/useInstitutionBranches'

const statusInvited = (s: SignerSchema) => s.status === 'INVITED'

interface RouteParams {
  id: string
}

const AccountRequestDetail: React.FC = (props: any) => {
  const { id } = useParams<RouteParams>()

  const { accountState, getAccountRequest } = useContext(
    AccountRequestDetailContext
  )
  const { showAlert, clearAlert } = useContext(AlertContext)

  // shortener
  const accountRequest = accountState?.accountRequest
  const accountRequestStatus = accountState?.accountRequest?.status

  const [productConfig] = accountRequest?.productConfigurations || []
  const productName = productConfig?.product?.name || '(no product)'
  const initialAmount = productConfig ? productConfig.initialDeposit / 100 : 0

  const { profileState } = useContext(ProfileContext)
  const { data, status } = useInstitutionBranches(
    profileState.profile?.institution?.id!
  )
  // get a branch name from a branch id
  const branchName =
    status !== 'error' && accountRequest
      ? data?.find(el => el.id === accountRequest.branchId)?.name
      : ''
  // this will be set from institituion in the future
  const routingNumber = '073903503'

  const accountNumber = productConfig
    ? productConfig.product.options?.find(
        (option: IProductOptionsConfiguration) =>
          option.key === 'account_number'
      )?.value || '(no account number)'
    : '(no account number)'
  const productOptions = productConfig ? productConfig.product.options : []
  // shortener
  const isLoading = accountState.status === 'loading'
  const hideButtons =
    accountRequestStatus === 'APPROVED' || accountRequestStatus === 'DECLINED'
  const disableAcceptButton =
    accountRequestStatus === 'INCOMPLETE' || accountRequestStatus === 'PENDING'

  const signers: SignerSchema[] = accountRequest?.signers || []
  const onboardedSigners = signers.filter(s => !statusInvited(s))
  const invitedSigners = signers.filter(statusInvited)
  const primarySigner = signers.find(s => s.role === 'PRIMARY')

  // This is to load the information
  React.useEffect(() => {
    if (id) {
      getAccountRequest(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onStatusClick = () => {
    // noop
  }

  // This is to display the message
  React.useEffect(() => {
    const displayAlertMessage = () => {
      const formattedDate = FormatHelper.dateTimeFormat(
        accountRequest ? accountRequest.statusUpdatedAt : '',
        '-'
      )
      const formattedName =
        accountRequest && accountRequest.statusUpdatedBy
          ? `${accountRequest.statusUpdatedBy.firstName} ${accountRequest.statusUpdatedBy.lastName} (${accountRequest.statusUpdatedBy.email})`.toUpperCase()
          : ''
      if (accountRequestStatus === 'APPROVED') {
        const msg = `REQUEST ACCEPTED BY ${formattedName} ON ${formattedDate}`
        showAlert({ message: msg, type: 'success', onClick: onStatusClick })
      } else if (accountRequestStatus === 'DECLINED') {
        const msg = `REQUEST DECLINED BY ${formattedName} ON ${formattedDate}`
        showAlert({ message: msg, type: 'error', onClick: onStatusClick })
      }
    }
    if (accountRequestStatus) {
      displayAlertMessage()
    }
    return () => {
      clearAlert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountRequestStatus])

  // consider creating a hook for this and reusing in other pages
  if (accountRequest === undefined) {
    if (!isLoading) {
      return <NotFound title="Cannot find that account request." />
    } else {
      return <Skeleton />
    }
  }

  return (
    <div data-testid="account-detail">
      <Spin spinning={isLoading} tip="Loading...">
        {accountRequest && (
          <AccountHeader
            title={productName}
            branchName={branchName}
            accountNumber={accountNumber}
            accountRequestId={accountRequest.id}
            contract={accountRequest.contract}
            bsa={accountRequest.bsa}
          />
        )}

        <Stack direction="vertical" spacing="lg">
          {onboardedSigners.map((signer: SignerSchema) => {
            return (
              <SignerDetailCard
                key={signer.id}
                loading={isLoading}
                signer={signer}
                createdAt={accountRequest.createdAt}
                productOptions={productOptions}
              />
            )
          })}
          {invitedSigners.map((signer: SignerSchema) => {
            return <SignerInvitedDetailCard key={signer.id} signer={signer} />
          })}
          <Box row="flex-center" justify="center">
            {!hideButtons && (
              <AccountChangeStatus
                id={accountRequest.id}
                product={productName}
                amount={initialAmount}
                routingNumber={routingNumber}
                accountNumber={accountNumber}
                primarySignerfullName={FormatHelper.signerFullName(
                  primarySigner
                )}
                branches={data!}
                disableAcceptButton={disableAcceptButton}
              />
            )}
          </Box>
        </Stack>
      </Spin>
    </div>
  )
}

export default AccountRequestDetail
