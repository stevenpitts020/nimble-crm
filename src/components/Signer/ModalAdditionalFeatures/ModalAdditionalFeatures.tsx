import React from 'react'
import { Drawer } from 'antd'
import { IProductOptionsConfiguration, SignerSchema } from '../../../store'
import { CheckCircleIcon, EmptyCircleIcon } from '../..'
import { ModalHeader } from '../ModalHeader/ModalHeader'
import FormatHelper from '../../../utils/FormatHelper'
import { ServiceStatusMessage } from '../../Common/ServiceStatusMessage/ServiceStatusMessage'

interface ISignerAdditionalFeaturesWindow {
  signer: SignerSchema
  productOptions: IProductOptionsConfiguration[]
  text?: string
  onClose?: () => void
}

const ListFeatures = (itemProps: {
  margin?: string
  list: IProductOptionsConfiguration[]
}) => {
  const list = itemProps.list.filter(
    item => item.category === 'product_feature'
  )
  return (
    <ul className={`ni-detail-list u-margin-top-${itemProps.margin}`}>
      {list.map(el => (
        <ListFeaturesItem
          category={el.category}
          title={el.title}
          value={el.value}
          key={el.key}
        />
      ))}
    </ul>
  )
}

const ListFeaturesItem = (itemProps: {
  title: string
  category: string
  key: string
  value: string
}) => (
  <li className="flex-spaced-horizontal">
    <p className="ant-typography item-title uppercase">{itemProps.title}</p>
    {itemProps.value === 'true' ? (
      <CheckCircleIcon style={{ fontSize: '24px' }} data-testid="ok" />
    ) : itemProps.value === 'false' ? (
      <EmptyCircleIcon style={{ fontSize: '24px' }} data-testid="pending" />
    ) : (
      <EmptyCircleIcon style={{ fontSize: '24px' }} data-testid="pending" />
    )}
  </li>
)

export const ModalAdditionalFeatures: React.FC<ISignerAdditionalFeaturesWindow> = (
  props: ISignerAdditionalFeaturesWindow
) => {
  const { onClose, text, signer, productOptions } = props
  const [isVisible, setIsVisible] = React.useState(false)
  const handleCloseWindow = (): void => {
    setIsVisible(false)
  }
  const handleOpenWindow = async (): Promise<void> => {
    setIsVisible(true)
  }

  return (
    <React.Fragment>
      <button onClick={handleOpenWindow} className="ant-btn clear">
        {text || 'Additional Features'}
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
          title="Additional Features"
        />
        {productOptions &&
        productOptions.filter(item => item.category === 'product_feature')
          .length > 0 ? (
          <ListFeatures list={productOptions} margin={'xxl'} />
        ) : (
          <ServiceStatusMessage
            title="No additional Features available"
            message="Please come back later"
          />
        )}
      </Drawer>
    </React.Fragment>
  )
}
