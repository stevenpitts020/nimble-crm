import React from 'react'
import { Button, Typography } from 'antd'
import {
  ISignerComplianceVerification,
  ISignerComplianceVerificationItem,
} from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'
import { NoResults } from './NoResults'
import { ComplianceVerificationItem } from '../ComplianceVerificationItem/ComplianceVerificationItem'
import { Stack } from '../..'

export const ComplianceVerification = (props: {
  complianceVerification?: ISignerComplianceVerification
  fullName: string
  dateOfBirth: string
}) => {
  const { Text } = Typography
  let year = FormatHelper.dateYear(props.dateOfBirth)

  if (year === 'Invalid date') {
    year = '(not provided)'
  }

  if (
    props.complianceVerification &&
    props.complianceVerification.results.length > 0
  ) {
    return (
      <div data-testid="compliance-verification">
        <div className="u-margin-top-xl">
          <Text className="ni-color-silver" strong={true}>
            Found {props.complianceVerification.results.length} possible results
            for the name {props.fullName} born in {year} with a fuziness of 60%
          </Text>
        </div>
        <Stack direction="vertical">
          {props.complianceVerification.results.map(
            (item: ISignerComplianceVerificationItem) => {
              return <ComplianceVerificationItem key={item.id} item={item} />
            }
          )}
        </Stack>
        {props.complianceVerification.report.uri && (
          <div className="u-margin-top-xl u-align-center">
            <a
              href={props.complianceVerification.report.uri}
              target="_blank"
              rel="noreferrer noopener"
              data-testid="report-button"
            >
              <Button
                shape="round"
                className="ant-btn ant-btn-dashed ant-btn-round"
              >
                Download Report
              </Button>
            </a>
          </div>
        )}
      </div>
    )
  }

  // no results
  return (
    <NoResults
      fullName={props.fullName}
      year={year}
      pdf={props.complianceVerification?.report.uri || null}
    />
  )
}
