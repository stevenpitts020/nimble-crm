import React from 'react'
import { Typography } from 'antd'
import { Stack } from '../..'
import { ComplianceListEntriesTabs } from '../ComplianceListEntriesTabs/ComplianceListEntriesTabs'
import { Header } from './Header'
import { ISignerComplianceVerificationItem } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'

const { Text } = Typography

const ListDescriptionItem = (itemProps: {
  title: string
  text?: string | null
}) => (
  <li className="flex-spaced-horizontal ">
    <Text className="item-title uppercase flex-035">{itemProps.title}</Text>
    <Text className="bold ni-color-black flex-1">{itemProps.text}</Text>
  </li>
)

interface IComplianceDetail {
  onClose: () => void
  item: ISignerComplianceVerificationItem
}

/* Not sure it's worth having a component just for this. Might be better just to include it in SignerDetailCard */
export const ComplianceVerificationItemDetail: React.FC<IComplianceDetail> = (
  props: IComplianceDetail
) => {
  const item = props.item
  const nameAlias = item.nameAka.join(', ')
  const countries = item.countries.join(', ')
  const associates = item.associates.join(', ')
  const age = FormatHelper.age(item.dateOfBirth)
  const date = FormatHelper.dateFormat(item.dateOfBirth, '-')

  return (
    <div>
      <Header title="Back to Compliance Results" onClose={props.onClose} />

      <Stack
        direction="horizontal"
        spacing="xl"
        verticalAlign="top"
        className="u-margin-top-xl"
        collapse="sm"
      >
        <ul className="ni-detail-list ni-col-flex">
          <ListDescriptionItem title="Full Name" text={item.fullName} />
          <ListDescriptionItem title="AKA" text={nameAlias} />
          {date !== 'Invalid date' && (
            <ListDescriptionItem
              title="Date of Birth"
              text={`${date} (Age: ${age})`}
            />
          )}
          <ListDescriptionItem title="Countries" text={countries} />
          <ListDescriptionItem title="Associates" text={associates} />
        </ul>
      </Stack>

      <ComplianceListEntriesTabs
        adverseMedia={item.adverseMedia}
        warnings={item.warnings}
        sanctions={item.sanctions}
        politicalExposure={item.politicalExposure}
      />
    </div>
  )
}
