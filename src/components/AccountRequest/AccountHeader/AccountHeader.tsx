import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Row, Button, Col } from 'antd'
import { Stack, ArrowLeftIcon } from '../../index'
import { AccountRequestInfo } from './AccountRequestInfo'
import { ModalBSARiskResults } from '../ModalBSARiskResults/ModalBSARiskResults'

interface IAccountHeader {
  title?: string
  accountNumber: string
  accountRequestId: string
  branchName?: string
  contract?: {
    uri: string
  }
  bsa?: {
    score: number
    risk: string
  }
}

export const AccountHeader: React.FC<IAccountHeader> = (
  props: IAccountHeader
) => {
  const { accountNumber, accountRequestId, contract, title, bsa } = props

  const { Title, Text } = Typography
  const history = useHistory()

  const handleGoBack = () => {
    history.goBack()
  }

  return (
    <Row
      justify="space-between"
      align="middle"
      className="account-request-header u-margin-bottom-xl"
      data-testid="ni-account-request-header"
    >
      <Col xs={24} sm={8} lg={8}>
        <Stack direction="horizontal">
          <Button
            type="link"
            shape="circle"
            onClick={handleGoBack}
            data-testid="goback-button"
          >
            <ArrowLeftIcon className="u-margin-left-xs u-margin-right-md ni-color-black" />
          </Button>
          <Stack direction="vertical">
            <Text className="ni-color-silver" strong={true}>
              Account #{accountNumber}{' '}
              {props.branchName ? `- ${props.branchName}` : ''}
            </Text>
            <Title level={2} className="no-margin">
              {title}
            </Title>
            <ModalBSARiskResults
              accountRequestId={accountRequestId}
              bsa={
                bsa || {
                  score: 0,
                  risk: 'Pending',
                }
              }
            />
          </Stack>
        </Stack>
      </Col>
      <Col xs={24} sm={16} lg={16}>
        {contract && <AccountRequestInfo uri={contract.uri} />}
      </Col>
    </Row>
  )
}
