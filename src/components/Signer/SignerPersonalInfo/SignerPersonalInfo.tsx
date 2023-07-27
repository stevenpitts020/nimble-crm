import React from 'react'
import { Col } from 'antd'
import { SignerTextLabel, Stack } from '../../../components'
import { SignerSchema } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'

interface ISignerRole {
  signer: SignerSchema
}

const formatAddress = (signer: SignerSchema) => {
  const formattedAddress =
    signer.address !== null ? `${signer.address}` : 'Incomplete'
  return formattedAddress
}

const formatSSN = (ssn: string) => {
  if (FormatHelper.isEmpty(ssn)) {
    return null
  }
  return ssn.replace(/^\d{3}/, '****')
}

const formatString = (val: null | string) => {
  if (val === null) {
    return 'Incomplete'
  }
  return val
}

export const SignerPersonalInfo: React.FC<ISignerRole> = (
  props: ISignerRole
) => {
  const { signer } = props
  return (
    <Stack
      direction="horizontal"
      className="ni-signer-personal-info"
      collapse="md"
    >
      <Col xs={24} sm={24} md={24} lg={12} xl={8}>
        <SignerTextLabel
          text="Date of Birth"
          label={
            signer.dateOfBirth
              ? FormatHelper.dateFormatExtended(signer.dateOfBirth)
              : 'Incomplete'
          }
        />
        <SignerTextLabel
          text="SSN"
          label={signer.ssn ? formatSSN(signer.ssn) : 'Incomplete'}
        />
        <SignerTextLabel
          text="Phone"
          label={signer.phoneNumber || 'Incomplete'}
        />
        <SignerTextLabel text="Email" label={signer.email || 'Incomplete'} />
        <SignerTextLabel
          text="Employer"
          label={signer.employer || 'Incomplete'}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={8}>
        <SignerTextLabel text="Address" label={formatAddress(signer)} />
        <SignerTextLabel text="City" label={formatString(signer.city)} />
        <SignerTextLabel
          text="State"
          label={formatString(FormatHelper.getStateName(signer.state))}
        />
        <SignerTextLabel text="Zip" label={formatString(signer.zipCode)} />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={8}>
        {/* TODO get Document type */}
        <SignerTextLabel
          text="Document Type"
          label={FormatHelper.getDocumentTypeName(signer.idProofDocument.type)}
        />
        <SignerTextLabel
          text="Document Number"
          label={formatString(signer.idProofDocument.number)}
        />
        <SignerTextLabel
          text="Issued By"
          label={FormatHelper.getIssuerName(
            signer.idProofDocument.type,
            signer.idProofDocument.issuer
          )}
        />
        <SignerTextLabel
          text="Issue Date"
          label={formatString(
            FormatHelper.dateFormat(signer.idProofDocument.issuedDate, '-')
          )}
        />
        <SignerTextLabel
          text="Expiration Date"
          label={formatString(
            FormatHelper.dateFormat(signer.idProofDocument.expirationDate, '-')
          )}
        />
      </Col>
    </Stack>
  )
}
