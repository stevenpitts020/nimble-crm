import React, { useState } from 'react'
import { Drawer, Row, Spin } from 'antd'
import { SignerSchema } from '../../../store'
import { ModalHeader } from '../ModalHeader/ModalHeader'
import FormatHelper from '../../../utils/FormatHelper'
import Title from 'antd/lib/typography/Title'

import CoreAPI from '../../../services/CoreAPI'
import { log } from '../../../services'
import { Sheet } from '../../Common/Sheet/Sheet'

interface IModalSheetWindow {
  signer: SignerSchema
  text?: string
  onClose?: () => void
}

export const ModalSheet: React.FC<IModalSheetWindow> = (
  props: IModalSheetWindow
) => {
  const width = 1050

  const { onClose, signer } = props
  const [isVisible, setIsVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = useState('[]')

  const handleCloseWindow = (): void => {
    setIsVisible(false)
  }
  const handleOpenWindow = async (): Promise<void> => {
    setIsVisible(true)
  }

  React.useEffect(() => {
    if (!isVisible) {
      return
    }

    setIsLoading(true)

    const api = new CoreAPI()

    const fetchData = async () => {
      const calls = [
        'basicdetails',
        'realestate',
        'auto',
        'connection',
        'credit',
        'offenses',
      ]
      const names = [
        'Basic Details',
        'Real Estate',
        'Auto',
        'Connection',
        'Credit',
        'Offenses',
      ]
      const callsRespones = await Promise.all(
        calls.map(call =>
          api.postRequestMicro(call, { signature: props.signer.id })
        )
      )
      setIsLoading(false)

      const sheets = calls.map((call, i) => {
        return {
          name: names[i],
          data: callsRespones[i].flatMap((entry: any, j: number) => {
            return entry.map((value: any, k: number) => {
              return {
                cell: `${String.fromCharCode(65 + k)}${j}`,
                value: `${value}`,
                format: 'common',
              }
            })
          }),
        }
      })

      setData(
        JSON.stringify({
          styles: {},
          sheets,
        })
      )
    }

    try {
      fetchData()
    } catch (error) {
      log.error(error, 'fetchData')
    }
  }, [isVisible, props.signer])

  return (
    <React.Fragment>
      <button onClick={handleOpenWindow} className="ant-btn clear">
        Data Sheets
      </button>
      {isVisible && (
        <Drawer
          width={width}
          placement="right"
          closable={false}
          onClose={onClose || handleCloseWindow}
          visible={isVisible}
          className="ni-signer-details-drawer"
        >
          <ModalHeader
            fullName={FormatHelper.signerFullName(signer)}
            photoSource={signer.selfie.default}
            title="Device Details"
          />
          {isLoading ? (
            <Row justify="space-around" align="middle">
              <Spin
                spinning={isLoading}
                tip="Loading..."
                style={{ paddingTop: '40px' }}
              />
            </Row>
          ) : (
            <div>
              <Row>
                <Title
                  level={2}
                  style={{ paddingTop: '40px', fontWeight: 400 }}
                >
                  Data Sheets
                </Title>
              </Row>
              <Row>
                <Sheet
                  style={{ height: '75vh', width: '100vh' }}
                  data={data}
                  menu={true}
                />
              </Row>
            </div>
          )}
        </Drawer>
      )}
    </React.Fragment>
  )
}
