import React from 'react'
import { Drawer } from 'antd'
import { SignerSchema } from '../../../store'
import {
  Stack,
  DriversLicenceFrontIcon,
  DriversLicenceBackIcon,
  PassportFrontIcon,
} from '../..'
import { ModalHeader } from '../ModalHeader/ModalHeader'
import FormatHelper from '../../../utils/FormatHelper'

interface ISignerDetailWindow {
  signer: SignerSchema
  text?: string
  onClose?: () => void
}

export const ModalDocuments: React.FC<ISignerDetailWindow> = (
  props: ISignerDetailWindow
) => {
  const { onClose, text, signer } = props
  const [isVisible, setIsVisible] = React.useState(false)

  const documentType = signer.idProofDocument.type
  const imageFront = signer.idProofDocument.frontIdProof?.default
  const imageBack = signer.idProofDocument.backIdProof?.default

  const handleCloseWindow = (): void => {
    setIsVisible(false)
  }
  const handleOpenWindow = (): void => {
    setIsVisible(true)
  }

  const frontIcon =
    documentType === 'USDL' ? (
      <DriversLicenceFrontIcon />
    ) : (
      <PassportFrontIcon />
    )
  const backIcon = documentType === 'USDL' ? <DriversLicenceBackIcon /> : null

  return (
    <React.Fragment>
      <button onClick={handleOpenWindow} className="ant-btn clear">
        {text || 'Documents'}
      </button>

      <Drawer
        width={832}
        placement="right"
        closable={false}
        onClose={onClose || handleCloseWindow}
        visible={isVisible}
        className="ni-signer-details-drawer"
      >
        <ModalHeader
          fullName={FormatHelper.signerFullName(signer)}
          photoSource={signer.selfie.default}
          title="Documents"
        />
        <Stack
          horizontalAlign="left"
          direction="vertical"
          spacing="xxl"
          className="u-margin-top-xxl "
        >
          {!imageFront ? (
            frontIcon
          ) : (
            <div className="document-img-wrapper">
              <img src={imageFront} className="ni-id-proof-img" alt="front" />
            </div>
          )}

          {!imageBack ? (
            backIcon
          ) : (
            <div className="document-img-wrapper">
              <img src={imageBack} className="ni-id-proof-img" alt="back" />
            </div>
          )}
        </Stack>
      </Drawer>
    </React.Fragment>
  )
}
