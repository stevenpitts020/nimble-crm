import React from 'react'
import { Row, Col } from 'antd'
import {
  Stack,
  SignerTextLabel,
  SignerIdProofImages,
} from '../../../components'
import FormatHelper from '../../../utils/FormatHelper'

interface ISignerDocuments {
  imageFront?: string
  imageBack?: string | null
  documentType?: string
  documentNumber?: string | null
  documentExpirationDate?: string | null
  documentIssuedDate?: string | null
}

export const SignerDocuments: React.FC<ISignerDocuments> = (
  props: ISignerDocuments
) => {
  return (
    <Stack className="ni-signer-documents" direction="vertical" spacing="md">
      <SignerIdProofImages
        type={props.documentType}
        imageFront={props.imageFront}
        imageBack={props.imageBack}
      />
      <Row gutter={[16, 20]}>
        <Col span={24}>
          <SignerTextLabel
            text="Number"
            label={props.documentNumber || 'Pending'}
          />
        </Col>
        <Col span={12}>
          <SignerTextLabel
            text="Issued"
            label={
              props.documentIssuedDate
                ? FormatHelper.dateFormatExtended(
                    new Date(props.documentIssuedDate)
                  )
                : 'Pending'
            }
          />
        </Col>
        <Col span={12}>
          <SignerTextLabel
            text="Exp Date"
            label={
              props.documentExpirationDate
                ? FormatHelper.dateFormatExtended(
                    new Date(props.documentExpirationDate)
                  )
                : 'Pending'
            }
          />
        </Col>
      </Row>
    </Stack>
  )
}
