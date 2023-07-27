import React from 'react'
import { SectionHeader, InstitutionBranchTable } from '../../components'

const InstitutionBranchsList: React.FC = (props: any) => {
  const [watchDataChanged, setWatchDataChanged] = React.useState<boolean>(false)

  const notifyDataChanged = () => setWatchDataChanged(!watchDataChanged)

  return (
    <div data-testid="institutions-list">
      <SectionHeader title="Branches" subtitle="" rightComponent={<></>} />
      <InstitutionBranchTable
        notifyDataChanged={notifyDataChanged}
        watchDataChanged={watchDataChanged}
      />
    </div>
  )
}

export default InstitutionBranchsList
