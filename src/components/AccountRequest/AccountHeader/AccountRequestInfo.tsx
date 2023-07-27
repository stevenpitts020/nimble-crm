import React, { useContext } from 'react'
import FormatHelper from '../../../utils/FormatHelper'
import { SeeAgreementButton } from './SeeAgreementButton'
import { Stack } from '../../index'
import { Typography, Skeleton } from 'antd'
import { AccountRequestDetailContext } from '../../../store/AccountRequestDetailProvider'
const { Text } = Typography

interface IAccountRequestInfo {
  uri: string
}

export const AccountRequestInfo: React.FC<IAccountRequestInfo> = ({ uri }) => {
  const { accountState } = useContext(AccountRequestDetailContext)
  const accountRequest = accountState?.accountRequest

  if (accountRequest === undefined) {
    return <Skeleton />
  }

  const accountRequestStatus = accountRequest.status
  const accountRequestDate = accountRequest.createdAt
  const accountRequestUpdateDate = accountRequest.statusUpdatedAt

  return (
    <Stack className="account-request-info">
      <Stack direction="vertical" horizontalAlign="right">
        <Stack spacing="xs" direction="horizontal">
          {accountRequestDate && (
            <>
              <Text className="info-value">Requested: </Text>
              <Text className="info-value ni-color-black">
                {accountRequestDate &&
                  FormatHelper.dateTimeFormatExtended(accountRequestDate)}
              </Text>
            </>
          )}
        </Stack>
        <Stack spacing="xs" direction="horizontal">
          {accountRequestUpdateDate && (
            <>
              <Text className="info-value">Updated: </Text>
              <Text className="info-value ni-color-black">
                {accountRequestUpdateDate &&
                  FormatHelper.dateTimeFormatExtended(accountRequestUpdateDate)}
              </Text>
            </>
          )}
        </Stack>
        <Stack spacing="xs" direction="horizontal">
          {accountRequestStatus && (
            <>
              <Text className="info-value">Status:</Text>
              <Text className="info-value ni-color-black">
                {FormatHelper.getAccountRequestStatus(accountRequestStatus)}
              </Text>
            </>
          )}
        </Stack>
      </Stack>
      {uri && (
        <SeeAgreementButton
          accountRequestStatus={accountRequestStatus}
          uri={uri}
        />
      )}
    </Stack>
  )
}
