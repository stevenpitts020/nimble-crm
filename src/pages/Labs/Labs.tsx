/* eslint-disable */
// @ts-nocheck

import _ from 'lodash'
import React, { useState } from 'react'
import { Analysis, Box, GeoEnrichment } from '../../components'
import { Button, Typography } from 'antd'

const { Title } = Typography

const Labs: React.FC = (props: any) => {
  const tabs = {
    analysis: { title: 'Financial Analysis', render: () => <Analysis /> },
    geoEnrich: { title: 'Geo Enrichment', render: () => <GeoEnrichment /> },
  }

  const [tab, setTab] = useState<object>(tabs.analysis)

  const onTabClick = (key: string) => () => {
    if (key && tab.key !== key) setTab(tabs[key])
  }

  return (
    <div className="labs-page">
      <div
        className="tabs"
        style={{
          marginBottom: '2em',
          paddingBottom: '2em',
          borderBottom: '1px solid #CCC',
        }}
      >
        {_.map(tabs, (t, key) => (
          <Button
            key={`${key}-tab`}
            value={key}
            onClick={onTabClick(key)}
            style={{ marginRight: '2em' }}
          >
            {t.title}
          </Button>
        ))}
      </div>

      <Box>{tab.render()}</Box>
    </div>
  )
}

export default Labs
