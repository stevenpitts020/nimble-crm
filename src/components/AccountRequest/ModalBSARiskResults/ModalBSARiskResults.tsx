import _ from 'lodash'
import React from 'react'
import { Drawer, Typography, Avatar, Tag } from 'antd'
import { Stack } from '../..'
import { ModalHeader } from '../../Signer/ModalHeader/ModalHeader'
import { useBSARiskResults } from '../../../hooks/useBSARiskResults'
import CountryHelper from '../../../utils/CountryHelper'
import { ServiceStatusMessage } from '../../Common/ServiceStatusMessage/ServiceStatusMessage'

interface ISignerDetailWindow {
  bsa: {
    score: number
    risk: string
  }
  accountRequestId: string
  text?: string
  onClose?: () => void
}

const { Text } = Typography

const ListDescriptionItem = (itemProps: {
  title: string
  text?: string | null
}) => (
  <>
    {itemProps.text && (
      <li className="flex-spaced-horizontal">
        <Text className="item-title uppercase" style={{ maxWidth: '320px' }}>
          {itemProps.title}
        </Text>
        <Text className="bold ni-color-black">{itemProps.text}</Text>
      </li>
    )}
  </>
)

const getRiskColor = (risk: string): string => {
  return (
    ({
      high: '#F97A7A',
      moderate: '#FFC657',
      low: '#8AF1A8',
    } as any)[_.toLower(_.trim(risk))] || '#8AF1A8'
  )
}

export const ModalBSARiskResults: React.FC<ISignerDetailWindow> = (
  props: ISignerDetailWindow
) => {
  const { onClose, accountRequestId, bsa } = props
  const [isVisible, setIsVisible] = React.useState(false)

  const { status, data, error, isFetching } = useBSARiskResults(
    accountRequestId
  )

  const risk = {
    level: bsa.score,
    text: bsa.risk || 'Pending',
    color: getRiskColor(bsa.risk),
  }

  const handleCloseWindow = (): void => {
    setIsVisible(false)
  }
  const handleOpenWindow = (): void => {
    setIsVisible(true)
  }

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error fetching information: {error?.message}</span>
  }

  return (
    <React.Fragment>
      <button onClick={handleOpenWindow} className="ant-btn clear">
        <Stack direction="horizontal" spacing="sm">
          <Text className="ni-color-silver" strong={true}>
            Bsa Risk: {risk.level}
          </Text>
          <Tag color={risk.color}>{risk.text}</Tag>
        </Stack>
      </button>

      <Drawer
        width={632}
        placement="right"
        closable={false}
        onClose={onClose || handleCloseWindow}
        visible={isVisible}
        className="ni-signer-details-drawer"
      >
        <ModalHeader
          title="BSA Risk"
          fullName={risk.text}
          avatar={
            <Avatar
              style={{
                backgroundColor: risk.color,
                fontSize: '32px',
                fontWeight: 'bold',
              }}
              size={80}
              shape={'square'}
            >
              {risk.level}
            </Avatar>
          }
        />

        {!(
          data === undefined ||
          data === null ||
          (typeof data === 'object' && Object.keys(data).length === 0)
        ) ? (
          <Stack
            horizontalAlign="left"
            direction="vertical"
            spacing="sm"
            className="u-margin-top-xxxl"
          >
            {isFetching ? <div>Refreshing...</div> : null}

            <ul className="ni-detail-list w100">
              {data.map(answer => (
                <ListDescriptionItem
                  key={`bsa-answer-${answer.questionId}`}
                  title={answer.text || answer.questionId}
                  text={
                    answer.subtype === 'country'
                      ? CountryHelper.nameFromISOCode(answer.answer)
                      : answer.answer
                  }
                />
              ))}
            </ul>
          </Stack>
        ) : (
          <ServiceStatusMessage
            title="We are still processing your request"
            message="Please come back later"
          />
        )}
      </Drawer>
    </React.Fragment>
  )
}
