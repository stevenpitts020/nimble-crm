import React from 'react'
import _ from 'lodash'
import { compressToBase64, decompressFromBase64 } from 'lz-string'
import { ISpreadsheetConfig } from '../../../types/codebase/types/ts-spreadsheet/sources/types'

interface ISheet extends ISpreadsheetConfig {
  data: string
  style?: React.CSSProperties
  onSave?: (data: string) => void
}

export function Sheet(props: ISheet): React.ReactElement {
  const [sheetId] = React.useState(_.uniqueId('prefix-'))
  const sheet = React.useRef<dhx.Spreadsheet | null>(null)
  const [sheetCreated, setSheetCreated] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [save, setSave] = React.useState(false)
  const counterRef = React.useRef(0)

  function afterEvent() {
    setSave(true)
  }

  React.useEffect(() => {
    if (!sheet.current) {
      const config: ISpreadsheetConfig = _.omit(props, [
        'data',
        'stlye',
        'autosave',
      ])
      // @ts-ignore
      sheet.current = new dhx.Spreadsheet(sheetId, config)

      const events = [
        'afterValueChange',
        'afterStyleChange',
        'afterFormatChange',
        'afterRowAdd',
        'afterRowDelete',
        'afterColumnAdd',
        'afterColumnDelete',
        'beforeEditEnd',
        'afterSheetAdd',
        'afterSheetRemove',
        'afterSheetRename',
        'afterSheetChange',
      ]

      events.forEach(event => {
        sheet.current?.events.on(event, afterEvent)
      })

      setSheetCreated(true)
    }

    const intervalId = setInterval(() => {
      counterRef.current = counterRef.current + 1
      setCounter(counterRef.current)
    }, 3000)

    return function cleanup() {
      if (sheet.current) {
        sheet.current.clear()
      }

      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useMemo(() => {
    if (props.onSave && sheet.current && save) {
      setSave(false)
      props.onSave(compressToBase64(JSON.stringify(sheet.current.serialize())))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  React.useMemo(() => {
    if (!sheet.current) {
      return
    }

    let data = decompressFromBase64(props.data)
    if (data == null) {
      data = props.data
    }

    sheet.current.parse(JSON.parse(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, sheetCreated])

  return <div id={sheetId} style={props.style} />
}
