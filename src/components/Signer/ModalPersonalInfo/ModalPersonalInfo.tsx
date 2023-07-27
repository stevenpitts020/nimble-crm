import React from 'react'
import { Drawer, Typography } from 'antd'
import { SignerSchema } from '../../../store'
import { Stack } from '../..'
import { ModalHeader } from '../ModalHeader/ModalHeader'
import FormatHelper from '../../../utils/FormatHelper'

interface ISignerDetailWindow {
  signer: SignerSchema
  text?: string
  onClose?: () => void
}

const { Text } = Typography

const ListDescriptionItem = (itemProps: {
  title: string
  text?: string | null
}) => (
  <li className="flex-spaced-horizontal">
    <Text className="item-title uppercase">{itemProps.title}</Text>
    <Text className="bold ni-color-black">{itemProps.text}</Text>
  </li>
)

export const ModalPersonalInfo: React.FC<ISignerDetailWindow> = (
  props: ISignerDetailWindow
) => {
  const { onClose, text, signer } = props
  const [isVisible, setIsVisible] = React.useState(false)

  const handleCloseWindow = (): void => {
    setIsVisible(false)
  }
  const handleOpenWindow = (): void => {
    setIsVisible(true)
  }

  return (
    <React.Fragment>
      <button onClick={handleOpenWindow} className="ant-btn clear">
        {text || 'Detail Information '}
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
          title="Detailed Information"
        />

        <Stack
          horizontalAlign="left"
          direction="horizontal"
          spacing="xxxl"
          className="u-margin-top-xxxl"
        >
          <ul className="ni-detail-list ni-col-flex">
            <ListDescriptionItem title="Name Prefix" text="value" />
            <ListDescriptionItem title="First Name" text="Lily" />
            <ListDescriptionItem title="Middle Name" text="value" />
            <ListDescriptionItem title="Last Name" text="value" />
            <ListDescriptionItem title="Name Suffix" text="value" />
            <ListDescriptionItem title="Race/Ethnicity" text="value" />
            <ListDescriptionItem title="Gender" text="value" />
            <ListDescriptionItem title="Hair Color" text="value" />
            <ListDescriptionItem title="Eye Color" text="value" />
            <ListDescriptionItem title="Height" text="value" />
            <ListDescriptionItem title="Weight" text="value" />
          </ul>

          <ul className="ni-detail-list ni-col-flex">
            <ListDescriptionItem title="Date of Birth" text="value" />
            <ListDescriptionItem title="Place of Birth" text="value" />
            <ListDescriptionItem title="Marital Status" text="value" />
            <ListDescriptionItem title="Nationality" text="value" />
            <ListDescriptionItem title="SSN" text="value" />
            <ListDescriptionItem title="Veteran" text="value" />
            <ListDescriptionItem title="Mobile Phone" text="value" />
            <ListDescriptionItem title="Phone" text="value" />
            <ListDescriptionItem title="Work Phone" text="value" />
            <ListDescriptionItem title="Email" text={signer.email} />
          </ul>
        </Stack>

        <Stack horizontalAlign="center" direction="horizontal" spacing="xxxl">
          <ul className="ni-detail-list ni-col-flex">
            <li className="header">
              <p className="ant-typography item-title">Address</p>
            </li>
            <ListDescriptionItem title="Address" text={signer.address} />
            <ListDescriptionItem title="Address Line 2" text="Storm Lake" />
            <ListDescriptionItem title="City" text="value" />
            <ListDescriptionItem title="State" text="value" />
            <ListDescriptionItem title="ZIP" text="value" />
          </ul>
          <ul className="ni-detail-list ni-col-flex">
            <li className="header">
              <p className="ant-typography item-title">Mailing Address</p>
            </li>
            <ListDescriptionItem title="Address" text="2593 Harper Street" />
            <ListDescriptionItem title="Address Line 2" text="Storm Lake" />
            <ListDescriptionItem title="City" text="value" />
            <ListDescriptionItem title="State" text="value" />
            <ListDescriptionItem title="ZIP" text="value" />
          </ul>
        </Stack>
      </Drawer>
    </React.Fragment>
  )
}
