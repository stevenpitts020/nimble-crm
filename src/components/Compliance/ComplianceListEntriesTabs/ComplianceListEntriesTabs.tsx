import React from 'react'
import { Tabs, Typography } from 'antd'
import { ISignerComplianceVerificationListEntry } from '../../../store'
import { ComplianceListEntries } from '../ComplianceListEntries/ComplianceListEntries'
import { ComplianceListEntriesAdverseMedia } from '../ComplianceListEntriesAdverseMedia/ComplianceListEntriesAdverseMedia'
import ComplianceHelper from '../../../utils/ComplianceHelper'

const tabTitle = (tabProps: { title: string; total: number }) => {
  return (
    <React.Fragment>
      <span>{tabProps.title}</span>
      <br />
      <small>
        {tabProps.total} {tabProps.total === 1 ? 'result' : 'results'}
      </small>
    </React.Fragment>
  )
}

interface IcomplianceTabs {
  adverseMedia: [ISignerComplianceVerificationListEntry]
  warnings: [ISignerComplianceVerificationListEntry]
  sanctions: [ISignerComplianceVerificationListEntry]
  politicalExposure: [ISignerComplianceVerificationListEntry]
}

export const ComplianceListEntriesTabs: React.FC<IcomplianceTabs> = (
  props: IcomplianceTabs
) => {
  const { TabPane } = Tabs
  const { Text } = Typography

  const media = props.adverseMedia
  const warnings = ComplianceHelper.groupItemsBySourceAndDate(props.warnings)
  const sanctions = ComplianceHelper.groupItemsBySourceAndDate(props.sanctions)
  const politicalExposure = ComplianceHelper.groupItemsBySourceAndDate(
    props.politicalExposure
  )

  const warningsListSize = ComplianceHelper.itemSizeBySourceAndDate(warnings)
  const sanctionsListSize = ComplianceHelper.itemSizeBySourceAndDate(sanctions)
  const politicalExposureListSize = ComplianceHelper.itemSizeBySourceAndDate(
    politicalExposure
  )

  return (
    <Tabs size={'large'} type="card" defaultActiveKey="1" className="ni-tabs">
      <TabPane
        tab={tabTitle({
          title: 'Sanctions',
          total: sanctionsListSize,
        })}
        key="1"
        disabled={sanctionsListSize < 1}
      >
        {Object.keys(sanctions.active).length > 0 && (
          <React.Fragment>
            <Text className="bold ni-color-gray">Currently on:</Text>
            <ComplianceListEntries listEntries={sanctions.active} />
          </React.Fragment>
        )}
        {Object.keys(sanctions.inactive).length > 0 && (
          <React.Fragment>
            <Text className="bold ni-color-gray">Removed from:</Text>
            <ComplianceListEntries listEntries={sanctions.inactive} />
          </React.Fragment>
        )}
      </TabPane>
      <TabPane
        tab={tabTitle({
          title: 'Warnings',
          total: warningsListSize,
        })}
        key="2"
        disabled={warningsListSize < 1}
      >
        {Object.keys(warnings.active).length > 0 && (
          <React.Fragment>
            <Text className="bold ni-color-gray">Currently on:</Text>
            <ComplianceListEntries listEntries={warnings.active} />
          </React.Fragment>
        )}
        {Object.keys(warnings.inactive).length > 0 && (
          <React.Fragment>
            <Text className="bold ni-color-gray">Removed from:</Text>
            <ComplianceListEntries listEntries={warnings.inactive} />
          </React.Fragment>
        )}
      </TabPane>
      <TabPane
        tab={tabTitle({
          title: 'Adverse Media',
          total: media.length,
        })}
        key="3"
        disabled={media.length < 1}
      >
        <Text className="bold ni-color-gray">Currently on:</Text>
        <ComplianceListEntriesAdverseMedia listEntries={media} />
      </TabPane>
      <TabPane
        tab={tabTitle({
          title: 'Political Exposed',
          total: politicalExposureListSize,
        })}
        key="4"
        disabled={politicalExposureListSize < 1}
      >
        {Object.keys(politicalExposure.active).length > 0 && (
          <React.Fragment>
            <Text className="bold ni-color-gray">Currently on:</Text>
            <ComplianceListEntries listEntries={politicalExposure.active} />
          </React.Fragment>
        )}
        {Object.keys(politicalExposure.inactive).length > 0 && (
          <React.Fragment>
            <Text className="bold ni-color-gray">Removed from:</Text>
            <ComplianceListEntries listEntries={politicalExposure.inactive} />
          </React.Fragment>
        )}
      </TabPane>
    </Tabs>
  )
}
