import React from 'react'
import { Menu, Row } from 'antd'
import { IProductOptionsConfiguration, SignerSchema } from '../../../store'
import { ModalIdentity } from '../ModalIdentityVerifications/ModalIdentity'
import { ModalDocuments } from '../ModalDocuments.tsx/ModalDocuments'
import { ModalAdditionalFeatures } from '../ModalAdditionalFeatures/ModalAdditionalFeatures'
import { ModalComplianceResults } from '../../Compliance/ModalComplianceResults/ModalComplianceResults'
import { SignerIdentityVerificationProvider } from '../../../store/SignerIdentityVerificationProvider'
import { SignerComplianceVerificationProvider } from '../../../store/SignerComplianceVerificationProvider'
import { ModalSheet } from '../ModalSheet/ModalSheet'

interface ISignerDetailWindow {
  signer: SignerSchema
  report?: string
  productOptions: IProductOptionsConfiguration[]
}
/* Not sure it's worth having a component just for this. Might be better just to include it in SignerDetailCard */
export const SignerModalMenu: React.FC<ISignerDetailWindow> = (
  props: ISignerDetailWindow
) => {
  const { signer, productOptions } = props
  const selected = ['2', '3', '4', '5', '6', '7']
  return (
    <Row justify="space-between">
      <Menu
        selectedKeys={selected}
        mode="horizontal"
        className="ni-signer-modal-menu"
      >
        <Menu.Item key="2">
          <SignerIdentityVerificationProvider>
            <ModalIdentity signer={signer} text="Identity Verification" />
          </SignerIdentityVerificationProvider>
        </Menu.Item>
        <Menu.Item key="3">
          <SignerComplianceVerificationProvider>
            <ModalComplianceResults signer={signer} />
          </SignerComplianceVerificationProvider>
        </Menu.Item>
        <Menu.Item key="4">
          <ModalDocuments signer={signer} />
        </Menu.Item>
        {props.report !== 'no-report' && (
          <Menu.Item key="5">
            <a target="_blank" href={props.report} rel="noopener noreferrer">
              Donwload Credit Report
            </a>
          </Menu.Item>
        )}
        <Menu.Item key="6">
          <ModalAdditionalFeatures
            signer={signer}
            productOptions={productOptions}
          />
        </Menu.Item>
        <Menu.Item key="7">
          <ModalSheet signer={signer} />
        </Menu.Item>
      </Menu>
    </Row>
  )
}
