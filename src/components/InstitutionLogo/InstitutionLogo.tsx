import React from 'react'
import { PlaceHolderInstitutionIcon } from '../Common/Icon/Icon'

interface InstitutionLogoSchema {
  alt?: string
  src?: string
  width?: string
  filter?: boolean
}

export const InstitutionLogo: React.FC<InstitutionLogoSchema> = (
  props: InstitutionLogoSchema
) => {
  const [hasError, setHasError] = React.useState(false)

  function onError() {
    setHasError(true)
  }

  return props.src && !hasError ? (
    <img
      className={`ni-institution-logo ${
        props.filter === true ? 'to-white' : ''
      }`}
      alt={props.alt || 'Placeholder'}
      width={props.width}
      src={props.src}
      onError={onError}
    />
  ) : (
    <div className="ni-institution-logo placeholder">
      <PlaceHolderInstitutionIcon />
    </div>
  )
}
