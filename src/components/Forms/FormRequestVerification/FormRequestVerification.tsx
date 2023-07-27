import { Button, Input, Row } from 'antd'
import React, { ChangeEvent } from 'react'
import { MFAPhoneIcon } from '../../Common/Icon/Icon'
import { Typography } from 'antd'
import { authService } from '../../../services'

const { Title, Text, Link } = Typography

export const FormRequestVerification: React.FC = () => {
  const [code, setCode] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [showError, setShowError] = React.useState(false)

  async function verify() {
    setShowError(false)
    setLoading(true)
    try {
      const res = await authService.verifyCode(code)
      if (!res.verified) {
        throw new Error('verification failed')
      }
      const email = res.email
      const token = res.token

      window.location.href = `/login/${email}/${token}`
      return
    } catch (err) {
      setLoading(false)
      setShowError(true)
    }
  }

  function isValid(): boolean {
    return code.length === 6 && Number(code) > 0
  }

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    setCode(e.target.value)
  }

  return (
    <>
      <Row justify="center">
        <MFAPhoneIcon />
      </Row>
      <Row justify="center">
        <Title level={3} className="u-margin-top-xl">
          Enter your verification code
        </Title>
      </Row>
      <Row justify="center">
        <Text
          style={{ fontWeight: 400, textAlign: 'center', fontSize: '18px' }}
        >
          Input the code we sent to {authService.getMFAMaskedPhone()} to access
          your account
        </Text>
      </Row>
      <Row justify="center" className="u-margin-top-xl">
        <Input
          size="large"
          placeholder="Enter Code"
          type="text"
          maxLength={6}
          value={code}
          onChange={onChange}
        />
      </Row>
      {showError && (
        <Row justify="center">
          <Text style={{ color: 'red' }}>Verification Failed!</Text>
        </Row>
      )}
      <Row justify="center" className="u-margin-top-xxl">
        <Button
          type="primary"
          disabled={!isValid()}
          onClick={verify}
          loading={loading}
        >
          Verify Code
        </Button>
      </Row>
      <Row justify="center" className="u-margin-top-xl">
        <Link underline={true} href="/login">
          didn't receive the text?
        </Link>
      </Row>
    </>
  )
}
