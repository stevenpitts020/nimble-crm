import React, { useState } from 'react'
import { Card, Typography, Button } from 'antd'
import InstitutionService from '../../../services/InstitutionService'
import JSONInput from 'react-json-editor-ajrm'
import { en } from './vendored/local/en'

const { Title } = Typography

function BSA(props: any) {
  const { id, bsa } = props

  const [error, setError] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>()
  const [monolith, setMonolith] = useState<any>(bsa)

  async function onSave(event: any) {
    if (monolith === bsa) return
    if (error) return

    setLoading(true)

    await InstitutionService.update({
      id,
      publicMetadata: { bsa: monolith },
    })

    setTimeout(() => setLoading(false), 500)
  }

  const handleOnChange = (jsonEvent: any) => {
    setError(!!jsonEvent.error)
    if (!error) setMonolith(jsonEvent.jsObject)
  }

  return (
    <Card bordered={false}>
      <Title level={2}>BSA</Title>
      <JSONInput
        id="monolith"
        placeholder={monolith}
        locale={en}
        onChange={handleOnChange}
      />
      <Button
        loading={loading}
        disabled={error}
        type="primary"
        onClick={onSave}
      >
        Save
      </Button>
    </Card>
  )
}

export default BSA
