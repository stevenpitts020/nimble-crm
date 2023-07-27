import React, { useContext } from 'react'
import { Drawer } from 'antd'
import { SignerSchema } from '../../../store'
import { CheckCircleIcon, AlertTriangleIcon, PendingCircleIcon } from '../..'
import { ModalHeader } from '../ModalHeader/ModalHeader'
import FormatHelper from '../../../utils/FormatHelper'
import { SignerIdentityVerificationContext } from '../../../store/SignerIdentityVerificationProvider'
import { ISignerIdentityVerification } from '../../../store'
import { ServiceStatusMessage } from '../../Common/ServiceStatusMessage/ServiceStatusMessage'

interface ISignerDetailWindow {
  signer: SignerSchema
  text?: string
  onClose?: () => void
}

const ListStatus = (itemProps: {
  title: string
  margin: string
  list: [ISignerIdentityVerification]
}) => {
  const list = itemProps.list
  return (
    <ul className={`ni-detail-list u-margin-top-${itemProps.margin}`}>
      <li className="header">
        <p className="ant-typography item-title">{itemProps.title}</p>
      </li>
      {list
        .filter(filterList => filterList.category === itemProps.title)
        .map(el => (
          <ListStatusItem
            title={el.verification}
            status={el.status}
            key={el.verification}
          />
        ))}
    </ul>
  )
}

const ListStatusItem = (itemProps: {
  title: string
  status: string
  key: string
}) => (
  <li className="flex-spaced-horizontal">
    <p className="ant-typography item-title uppercase">{itemProps.title}</p>
    {itemProps.status === 'VALID' ? (
      <CheckCircleIcon style={{ fontSize: '24px' }} data-testid="ok" />
    ) : itemProps.status === 'INVALID' ? (
      <AlertTriangleIcon style={{ fontSize: '24px' }} data-testid="not" />
    ) : (
      <PendingCircleIcon style={{ fontSize: '24px' }} data-testid="pending" />
    )}
  </li>
)

export const ModalIdentity: React.FC<ISignerDetailWindow> = (
  props: ISignerDetailWindow
) => {
  const { onClose, text, signer } = props
  const [isVisible, setIsVisible] = React.useState(false)
  const { state, getSignerIdentityVerification } = useContext(
    SignerIdentityVerificationContext
  )
  const handleCloseWindow = (): void => {
    setIsVisible(false)
  }
  const handleOpenWindow = async (): Promise<void> => {
    await getSignerIdentityVerification(signer.id)
    setIsVisible(true)
  }

  return (
    <React.Fragment>
      <button onClick={handleOpenWindow} className="ant-btn clear">
        {text || 'Detail Information '}
      </button>

      <Drawer
        width={448}
        placement="right"
        closable={false}
        onClose={onClose || handleCloseWindow}
        visible={isVisible}
        className="ni-signer-details-drawer"
      >
        <ModalHeader
          fullName={FormatHelper.signerFullName(signer)}
          photoSource={signer.selfie.default}
          title="Identity Verification"
        />
        {signer.verificationStatus?.documentStatus !== 'PENDING' &&
        state.identityVerifications !== undefined ? (
          <div>
            <ListStatus
              title="Face"
              list={state.identityVerifications}
              margin="xxl"
            />
            <ListStatus
              title="Document"
              list={state.identityVerifications}
              margin="l"
            />
          </div>
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
