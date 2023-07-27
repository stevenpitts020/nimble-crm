import { Button, Row } from 'antd'
import React, { useContext } from 'react'
import { Typography } from 'antd'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import { authService } from '../../../services'
import { ProfileContext } from '../../../store/ProfileProvider'
import { MFAPhoneIcon } from '../../Common/Icon/Icon'

const { Title, Text } = Typography

export const FormRequestPhone: React.FC = () => {
  const [phone, setPhone] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { profileState } = useContext(ProfileContext)

  const profile = profileState.profile

  const isValid = phone.length === 11

  async function saveNumber() {
    setLoading(true)
    if (profile) {
      await authService.setPhone(phone.slice(1))
    }
    window.location.href = '/login'
  }

  async function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isValid) {
      return
    }

    if (event.key !== 'Enter') {
      return
    }

    await saveNumber()
  }

  return (
    <>
      <Row justify="center">
        <MFAPhoneIcon />
      </Row>
      <Row justify="center">
        <Title level={3} className="u-margin-top-xl">
          Please Input your mobile #
        </Title>
      </Row>
      <Row justify="center">
        <Text style={{ fontWeight: 400, textAlign: 'center' }}>
          Enter your cell phone number below to add to your account for future
          verification.
        </Text>
      </Row>
      <Row justify="center" className="u-margin-top-xl">
        <Row>
          <PhoneInput
            country={'us'}
            onlyCountries={['us']}
            countryCodeEditable={false}
            value={phone}
            onChange={setPhone}
            isValid={isValid}
            disabled={loading}
            onKeyDown={onKeyDown}
          />
        </Row>
      </Row>
      <Row justify="center" className="u-margin-top-xxl">
        <Button
          type="primary"
          disabled={!isValid}
          onClick={saveNumber}
          loading={loading}
        >
          Save Number
        </Button>
      </Row>
    </>
  )
}
