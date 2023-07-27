import React from 'react'
import { Typography, Tabs } from 'antd'
import {
  DriversLicenceBackIcon,
  DriversLicenceFrontIcon,
  PassportFrontIcon,
} from '../../../components'

interface IIdProofImages {
  type?: string
  imageFront?: string
  imageBack?: string | null
}

export const SignerIdProofImages: React.FC<IIdProofImages> = (
  props: IIdProofImages
) => {
  const { TabPane } = Tabs
  const { Text } = Typography

  const frontIcon =
    props.type === 'USDL' ? <DriversLicenceFrontIcon /> : <PassportFrontIcon />
  const backIcon = props.type === 'USDL' ? <DriversLicenceBackIcon /> : null

  return (
    <div
      className="ni-signer-id-proof-images"
      data-testid="signer-id-proof-images"
    >
      <Tabs
        type="card"
        tabBarExtraContent={
          <Text className="info-label strong">Drivers Licence</Text>
        }
      >
        <TabPane tab="Front" key="1">
          {!props.imageFront ? (
            frontIcon
          ) : (
            <img
              src={props.imageFront}
              className="ni-id-proof-img"
              alt="front"
            />
          )}
        </TabPane>
        {props.type === 'USDL' ? (
          <TabPane tab="Back" key="2">
            {!props.imageBack ? (
              backIcon
            ) : (
              <img
                src={props.imageBack}
                className="ni-id-proof-img"
                alt="back"
              />
            )}
          </TabPane>
        ) : null}
      </Tabs>
    </div>
  )
}
