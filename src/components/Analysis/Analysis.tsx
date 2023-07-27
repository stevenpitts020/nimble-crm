/* eslint-disable */
// @ts-nocheck

import _ from 'lodash'
import React, { useState } from 'react'

// generally auth would be handled in a service, but the image upload tool requires making the call
import AuthService from '../../services/AuthService'

import Config from '../../services/Config'
import FileAnalysisService from '../../services/FileAnalysisService'
import AccountingTermsService from '../../services/AccountingTermsService'

import { Spin, Table, Tabs } from 'antd'

const { TabPane } = Tabs

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginPdfConvert from 'filepond-plugin-pdf-convert'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilepondPluginImageEdit from 'filepond-plugin-image-edit'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
import FilepondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilepondPluginImageTransform from 'filepond-plugin-image-transform'
import FilepondPluginFileValidateSize from 'filepond-plugin-file-validate-size'

import { FilePondErrorDescription, FilePondFile } from 'filepond'
import Select from 'react-select'
import SplitPane from 'react-split-pane'
import {
  FileDoneOutlined,
  LoadingOutlined,
  TableOutlined,
} from '@ant-design/icons'

import { Canonical } from './Statements/Canonical'

registerPlugin(
  FilepondPluginImageEdit,
  FilePondPluginPdfConvert,
  FilePondPluginImagePreview,
  FilepondPluginImageTransform,
  FilepondPluginFileValidateSize,
  FilepondPluginFileValidateType,
  FilePondPluginImageExifOrientation
)

const loadingIcon = <LoadingOutlined style={{ fontSize: 20 }} spin={true} />

interface IHeader {
  key: string
  title: string
  dataIndex: string
}

export const Analysis: React.FC = (props: any) => {
  const [files, setFiles] = useState<any>([])
  const [columns, setColumns] = useState<IHeader[]>([])
  const [dataSource, setDataSource] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<string>([])
  const [subcategories, setSubcategories] = useState<string>([])

  React.useEffect(() => {
    AccountingTermsService.categories().then(res => {
      setCategories(
        _.map(_.get(res, 'categories.aggregates', []), cat => cat.l0)
      )
      setSubcategories(
        _.map(_.get(res, 'subcategories.aggregates', []), sub => sub.l1)
      )
    })
  }, [])

  const fileProcessed = (
    err: FilePondErrorDescription | null,
    file: FilePondFile
  ) => {
    if (file) {
      setLoading(true)

      FileAnalysisService.financialStatement(file.serverId)
        .then(res => {
          const rows = res.table.rows
          const headers = rows.shift()
          processDataSource(rows, processColumns(headers))
        })
        .finally(() => setLoading(false))
    }
  }

  const processDataSource = (rows: [][], headers: IHeader[]) => {
    if (!rows || _.isEmpty(rows)) return setDataSource([])

    let idx = 0
    setDataSource(
      rows.map(_row => {
        const row = { key: _.toString(idx++) } as any

        const cells = [
          _row.cells[0],
          { _: _row.l0 },
          { _: _row.l1 },
          ..._row.cells.slice(1),
        ]

        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i] || {}
          row[headers[i].dataIndex] = cell.$ || cell.txt || cell._ || ''
        }

        return row
      })
    )
  }

  const processColumns = (header: []): IHeader[] => {
    if (!header || _.isEmpty(header)) {
      setColumns([])
      return []
    }

    const cells = [
      header.cells[0],
      {
        _: 'l0',
        txt: 'Category',
        select: 'l0',
      },
      {
        _: 'l1',
        txt: 'Subcategory',
        select: 'l1',
      },
      ...header.cells.slice(1),
    ]

    let idx = 0
    // @ts-ignore
    const cols = cells.map((cell, colNum) => {
      const key = cell && cell._ ? _.camelCase(cell._) : _.toString(idx++)

      const col = {
        title: _.toString(cell.dt || cell.$ || cell.txt || cell._ || ''),
        dataIndex: key,
        key,
      }

      const select = cell.select

      if (select)
        col.render = (text, row, rowNum) => {
          const options = (select === 'l0' ? categories : subcategories).map(
            l0 => {
              return { value: l0, label: l0 }
            }
          )

          return (
            <div style={{ minWidth: 150 }}>
              <Select
                key={`${idx}-${text}`}
                title={cell.select.i}
                isMulti={false}
                options={options}
                defaultValue={{ value: text, label: text }}
              />
            </div>
          )
        }

      return col
    })

    setColumns(cols)

    return cols
  }

  return (
    <div className="financial-analysis-wrapper">
      <SplitPane
        split="vertical"
        minSize={600}
        defaultSize="40%"
        style={{ padding: '2em', height: '80vh' }}
        paneStyle={{ padding: '1em', overflowY: 'scroll', overflowX: 'hidden' }}
      >
        <div className="analysis-split-left">
          <FilePond
            files={files}
            onprocessfile={fileProcessed}
            onupdatefiles={setFiles}
            allowMultiple={false}
            instantUpload={true}
            maxFiles={1}
            server={{
              url: `${Config.coreAPI}/files?ext=text`,
              headers: {
                Authorization: `Bearer ${AuthService.getAccessToken()!}`,
              },
            }}
            name="files"
            acceptedFileTypes={['image/*', 'application/pdf']}
            labelIdle={`<svg viewBox="64 64 896 896" focusable="false" data-icon="up-circle" width="4em" height="4em" fill="currentColor" aria-hidden="true"><path d="M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg><br>Upload or <span class='filepond--label-action'>Browse</span>`}
            pdfConvertType="image/png"
            pdfConvertMarginHeight={10}
            imagePreviewMinHeight={512}
            imagePreviewMaxHeight={1280}
            credits={false}
          />
        </div>
        <div className="analysis-split-right-top">
          <Tabs defaultActiveKey="fs-tbl">
            <TabPane
              key="fs-tbl"
              tab={
                <>
                  <Spin spinning={loading} indicator={loadingIcon} />
                  <TableOutlined hidden={loading} />
                  Table
                </>
              }
            >
              <Table
                className="financial-statement-table"
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
              />
            </TabPane>
            <TabPane
              key="fs-canon"
              tab={
                <>
                  <Spin spinning={loading} indicator={loadingIcon} />
                  <FileDoneOutlined hidden={loading} />
                  Statement
                </>
              }
            >
              <Canonical
                headers={{ name: '', values: ['2020', '2021', '2022'] }}
                lineItems={{
                  assets: {
                    current: {
                      cash: [
                        {
                          name: 'Cash and Equivalents',
                          values: _.range(3).map(() => _.random(100, 999)),
                        },
                        {
                          name: 'Accounts Receivable',
                          values: _.range(3).map(() => _.random(100, 999)),
                        },
                      ],
                    },
                    nonCurrent: [
                      {
                        name: 'Intangible Assets',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'Property, Plant, and Equip',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                  },
                  liabilities: {
                    current: [
                      {
                        name: 'a',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'b',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    nonCurrent: [
                      {
                        name: 'c',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'd',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                  },
                  equity: {
                    outstanding: [
                      {
                        name: 'e',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'f',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    additional: [
                      {
                        name: 'g',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'h',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    repurchased: [
                      {
                        name: 'i',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'j',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    adjustments: [
                      {
                        name: 'k',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'l',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    equity: [
                      {
                        name: 'm',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'n',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                  },
                  revenue: {
                    net: [
                      {
                        name: 'o',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'p',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    gross: [
                      {
                        name: 'q',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'r',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    returns: [
                      {
                        name: 's',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 't',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    credits: [
                      {
                        name: 'u',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'v',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                  },
                  cogs: {
                    materials: [
                      {
                        name: 'w',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'x',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    labor: [
                      {
                        name: 'y',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'z',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    overhead: [
                      {
                        name: 'aa',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'bb',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    total: [
                      {
                        name: 'cc',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: '',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                  },
                  expenses: {
                    operating: [
                      {
                        name: 'dd',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'ee',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    nonOperating: [
                      {
                        name: 'ff',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'gg',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    interest: [
                      {
                        name: 'hh',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'ii',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    taxes: [
                      {
                        name: 'jj',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'kk',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    depreciation: [
                      {
                        name: 'll',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'mm',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                  },
                  other: {
                    income: [
                      {
                        name: 'nn',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'oo',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    expense: [
                      {
                        name: 'pp',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'qq',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    gains: [
                      {
                        name: 'rr',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'ss',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    loss: [
                      {
                        name: 'tt',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'uu',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                  },
                  extraordinary: {
                    income: [
                      {
                        name: 'vv',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'ww',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    expense: [
                      {
                        name: 'xx',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'yy',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    gains: [
                      {
                        name: 'zz',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'aaa',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                    loss: [
                      {
                        name: 'bbb',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                      {
                        name: 'ccc',
                        values: _.range(3).map(() => _.random(100, 999)),
                      },
                    ],
                  },
                }}
              />
            </TabPane>
          </Tabs>
        </div>
      </SplitPane>
    </div>
  )
}
