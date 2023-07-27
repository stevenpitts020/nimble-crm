import React from 'react'
import { Typography, Button, Spin } from 'antd'
import { Stack, Box } from '../..'
import { ISignerComplianceVerificationListEntry } from '../../../store'
import { ComplianceListEntryArticle } from './ComplianceListEntryArticle'
import FormatHelper from '../../../utils/FormatHelper'

const { Text } = Typography

// This is just a helper to facilitate with pagination/show more
const DisplayPaginatedArticles = (props: {
  items: ISignerComplianceVerificationListEntry[]
  numberOfitemsShown: number
}) => {
  if (props.items.length === 0) {
    return <Spin />
  }
  return (
    <>
      {props.items.slice(0, props.numberOfitemsShown).map(item => (
        <ComplianceListEntryArticle
          key={item.id}
          title={item.name}
          date={`Published ${FormatHelper.dateFormatExtended(item.date)}`}
        >
          <Text strong={true}>{item.value}</Text>
        </ComplianceListEntryArticle>
      ))}
    </>
  )
}

interface IResults {
  listEntries: ISignerComplianceVerificationListEntry[]
}

export const ComplianceListEntriesAdverseMedia: React.FC<IResults> = (
  props: IResults
) => {
  const [current, setCurrent] = React.useState<{
    numberOfitemsShown: number
  }>({ numberOfitemsShown: 5 })

  const showMore = () => {
    if (current.numberOfitemsShown <= Object.keys(props.listEntries).length) {
      setCurrent({ numberOfitemsShown: current.numberOfitemsShown + 5 })
    }
  }

  if (FormatHelper.isEmpty(props.listEntries)) {
    return <p>No Results</p>
  }

  return (
    <React.Fragment>
      <Stack
        horizontalAlign="left"
        direction="vertical"
        className="u-margin-top-md"
        collapse="sm"
      >
        <DisplayPaginatedArticles
          items={props.listEntries}
          numberOfitemsShown={current.numberOfitemsShown}
        />
      </Stack>
      <Box row="flex-center" justify="center" marginTop="md">
        {current.numberOfitemsShown <= props.listEntries.length && (
          <Button type="dashed" size="small" shape="round" onClick={showMore}>
            Show more
          </Button>
        )}
      </Box>
    </React.Fragment>
  )
}
