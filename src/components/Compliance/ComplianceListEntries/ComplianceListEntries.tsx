import React from 'react'
import { Button } from 'antd'
import { Stack, Box } from '../..'
import { IGroupedComplianceEntries } from '../../../store'
import FormatHelper from '../../../utils/FormatHelper'
import { ComplianceListEntryGroup } from './ComplianceListEntryGroup'

interface IResults {
  listEntries: IGroupedComplianceEntries
}

export const ComplianceListEntries: React.FC<IResults> = (props: IResults) => {
  const groupedEntries = props.listEntries

  const [current, setCurrent] = React.useState<{
    numberOfitemsShown: number
  }>({ numberOfitemsShown: 10 })

  const showMore = () => {
    if (current.numberOfitemsShown <= Object.keys(groupedEntries).length) {
      setCurrent({ numberOfitemsShown: current.numberOfitemsShown + 5 })
    }
  }

  if (FormatHelper.isEmpty(props.listEntries)) {
    return <p>No Results</p>
  }

  return (
    <div className="u-margin-bottom-xl">
      <Stack direction="vertical">
        {Object.keys(groupedEntries)
          .slice(0, current.numberOfitemsShown)
          .map((key: string) => (
            <ComplianceListEntryGroup
              key={key}
              title={key}
              listEntries={groupedEntries[key]}
            />
          ))}
      </Stack>
      <Box row="flex-center" justify="center" marginTop="md">
        {current.numberOfitemsShown <= Object.keys(groupedEntries).length && (
          <Button type="dashed" size="small" shape="round" onClick={showMore}>
            Show more
          </Button>
        )}
      </Box>
    </div>
  )
}
