/* eslint-disable */
// @ts-nocheck

import _ from 'lodash'
import React, { ReactNode, useEffect, useState } from 'react'
import { Col, Collapse, Row, Space } from 'antd'

const { Panel } = Collapse

import { WarningOutlined } from '@ant-design/icons'

import CANON from './CANON'
import { LineItems } from './LineItems'

export interface ICanonicalProps {
  headers: { name?: ReactNode; values: [] }
  lineItems: LineItems
}

export const Canonical: React.FC<ICanonicalProps> = (
  props: ICanonicalProps
) => {
  const lineColSpan = 10
  const bufferColSpan = 2
  const valueColSpan = _.floor(
    (24 - lineColSpan - bufferColSpan) / props.headers.values.length
  )

  const [aggregates, setAggregates] = useState({})

  useEffect(() => {
    const sums = {}

    _.forEach(props.lineItems, (subCats, catKey) => {
      sums[catKey] = { values: [], children: {} }

      _.forEach(subCats, (lineItems, subCatKey) => {
        sums[catKey].children[subCatKey] = { values: [] }

        _.forEach(lineItems, lineItem =>
          _.forEach(lineItem.values, (value, idx) => {
            const val = _.toNumber(value)

            sums[catKey].values[idx] = sums[catKey].values[idx] || 0
            sums[catKey].children[subCatKey].values[idx] =
              sums[catKey].children[subCatKey].values[idx] || 0

            if (!val) return

            sums[catKey].values[idx] += val
            sums[catKey].children[subCatKey].values[idx] += val
          })
        )
      })
    })

    setAggregates(sums)
  }, [props.lineItems])

  return (
    <div className="canonical-statement">
      <Space style={{ fontSize: '2em', marginBottom: '1em' }}>
        <WarningOutlined /> WIP: TODO: populate on-change, design + pixel
        perfectness
      </Space>
      <div className="canonical-statement-header">
        <Row
          key={[
            'canonical-statement-header',
            props.headers.values.join('-'),
          ].join('-')}
        >
          <Col span={lineColSpan}>{props.headers?.name || ''}</Col>
          {_.map(props.headers.values, value => (
            <Col className="canonical-statement-value" span={valueColSpan}>
              {value}
            </Col>
          ))}
        </Row>
      </div>
      <Collapse defaultActiveKey={_.keys(aggregates)}>
        {_.map(aggregates, (cat, catKey) => (
          <Panel
            key={catKey}
            header={
              <Row>
                <Col span={lineColSpan}>
                  {CANON[catKey]?.name || 'UNKNOWN CATEGORY'}
                </Col>
                {_.map(cat.values, value => (
                  <Col
                    className="canonical-statement-value"
                    span={valueColSpan}
                  >
                    {value}
                  </Col>
                ))}
              </Row>
            }
          >
            <Collapse>
              {_.map(cat.children, (sub, subKey) => (
                <Panel
                  key={[catKey, subKey].join('-')}
                  header={
                    <Row>
                      <Col span={lineColSpan}>
                        {CANON[catKey]?.children[subKey]?.name ||
                          'UNKNOWN SUBCATEGORY'}
                      </Col>
                      {_.map(sub.values, value => (
                        <Col
                          className="canonical-statement-value"
                          span={valueColSpan}
                        >
                          {value}
                        </Col>
                      ))}
                    </Row>
                  }
                >
                  <Row>
                    <Col
                      style={{
                        borderLeft: '1px solid #ccc',
                        marginLeft: 25,
                        width: 25,
                      }}
                    >
                      &nbsp;
                    </Col>
                    <Col span={23}>
                      {_.map(props.lineItems[catKey][subKey], lineItem => (
                        <Row
                          key={[
                            catKey,
                            subKey,
                            _.snakeCase(lineItem.name),
                          ].join('-')}
                        >
                          <Col span={lineColSpan}>{lineItem.name}</Col>
                          {_.map(lineItem.values, value => (
                            <Col
                              className="canonical-statement-value"
                              span={valueColSpan}
                            >
                              {value}
                            </Col>
                          ))}
                        </Row>
                      ))}
                    </Col>
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}
