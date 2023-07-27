/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from 'react'
import { Analysis, GeoEnrichment, PeopleSearch, DocumentRequest, WorkflowBuilder } from '../../components'
import { Tabs } from 'antd'
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs

const Labs: React.FC = (props: any) => {
  const history = useHistory()

  const activeTab = () => {
    const _tab = history.location.hash
    return _tab ? _tab.substring(1) : 'financial-analysis'
  }

  useEffect(() => setTab(activeTab()), [history.location.hash])

  const [tab, setTab] = useState<object>(activeTab())

  const onTabClick = (key: string) =>
    history.push(`${history.location.pathname}#${key}`)

  return (
    <Tabs size="large" defaultActiveKey={tab} onTabClick={onTabClick}>
      <TabPane tab="FinAnalysis" key="financial-analysis">
        <Analysis />
      </TabPane>
      <TabPane tab="GeoEnrich" key="geo-enrichment">
        <GeoEnrichment />
      </TabPane>
      <TabPane tab="PeopleSearch" key="people-search">
        <PeopleSearch />
      </TabPane>
      <TabPane tab="Workflow" key="workflow">
        <DocumentRequest />
      </TabPane>
      <TabPane tab="Workflow Builder" key="workflow-builder">
        <WorkflowBuilder />
      </TabPane>
    </Tabs>
  )
}

export default Labs
