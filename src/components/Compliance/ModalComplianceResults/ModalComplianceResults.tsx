import React from 'react'
import { Drawer } from 'antd'
import { SignerSchema } from '../../../store'
import { ModalHeader } from '../../Signer/ModalHeader/ModalHeader'
import FormatHelper from '../../../utils/FormatHelper'
import { SignerComplianceVerificationContext } from '../../../store/SignerComplianceVerificationProvider'
import { ComplianceVerification } from '../ComplianceVerification/ComplianceVerification'
import { ServiceStatusMessage } from '../../Common/ServiceStatusMessage/ServiceStatusMessage'

interface ISignerDetailWindow {
  signer: SignerSchema
  text?: string
  onClose?: () => void
}

export const ModalComplianceResults: React.FC<ISignerDetailWindow> = (
  props: ISignerDetailWindow
) => {
  const { onClose, text, signer } = props
  const [isVisible, setIsVisible] = React.useState(false)

  const { state, getSignerComplianceVerification } = React.useContext(
    SignerComplianceVerificationContext
  )

  const handleCloseWindow = (): void => {
    setIsVisible(false)
  }

  const handleOpenWindow = async () => {
    setIsVisible(true)
    // load only if we have diffent information
    if (state.complianceVerification?.signer_id !== props.signer.id) {
      await getSignerComplianceVerification(props.signer.id)
    }
  }
  const fullName = FormatHelper.signerFullName(props.signer)

  return (
    <React.Fragment>
      <button onClick={handleOpenWindow} className="ant-btn clear">
        {text || 'Compliance Checks'}
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
          title="Compliance Checks"
        />

        {state.complianceVerification !== undefined &&
        signer.verificationStatus?.mediaStatus !== 'PENDING' ? (
          <ComplianceVerification
            fullName={fullName}
            dateOfBirth={props.signer.dateOfBirth}
            complianceVerification={state.complianceVerification}
          />
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
