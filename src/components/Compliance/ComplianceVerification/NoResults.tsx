import React from 'react'
import { Button, Typography } from 'antd'
import { Stack, CheckCircleIcon } from '../..'

const { Text } = Typography

export const NoResults = (props: {
  fullName: string
  year: string
  pdf: string | null
}) => (
  <div data-testid="compliance-verification-no-results">
    <Stack direction="vertical" spacing="xxxl">
      <Stack direction="vertical" className="u-margin-top-xxxl u-align-center">
        <CheckCircleIcon
          className="ni-color-accent u-margin-top-xxxl u-margin-bottom-md"
          style={{ fontSize: '80px' }}
        />
        <Text className="ni-color-green lh-md" strong={true}>
          No results found on any Sanction or Watchlist
        </Text>
        <Text className="ni-color-gray lh-md" strong={true}>
          for the name {props.fullName} born in {props.year} with a fuziness of
          60%
        </Text>
      </Stack>

      <div className="u-margin-top-xxxl">
        <Text className="ni-color-silver stronger">
          Searched 1,000s of global government regulatory and law enforcement
          watchlists and over 100 International and National Sanctions lists
          including:
        </Text>
        <ul className="ni-disc-list u-margin-top-md">
          <li className="ant-typography stronger ni-color-silver">
            Office of Foreign Assets Control (OFAC) Sanctions
          </li>
          <li className="ant-typography stronger ni-color-silver">
            United Nations Security Council Sanctions
          </li>
          <li className="ant-typography stronger ni-color-silver">
            Her Majesty’s (HM) Treasury List
          </li>
          <li className="ant-typography stronger ni-color-silver">
            EU Consolidated Sanctions List & EU Most Wanted Warnings
          </li>
          <li className="ant-typography stronger ni-color-silver">
            Bureau of Industry and Security
          </li>
          <li className="ant-typography stronger ni-color-silver">
            State Department Foreign Terrorist Organizations List and
            Non-Proliferation List
          </li>
          <li className="ant-typography stronger ni-color-silver">
            US DOJ (FBI, DEA, US Marshals, and others)
          </li>
          <li className="ant-typography stronger ni-color-silver">
            Interpol Most Wanted
          </li>
          <li className="ant-typography stronger ni-color-silver">
            CBI List (The Central Bureau of Investigation)
          </li>
        </ul>
      </div>
      {props.pdf && (
        <div className="u-margin-top-l u-align-center">
          <a
            href={props.pdf}
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
    </Stack>
  </div>
)
