import React from 'react'
import { SectionHeader, InstitutionTable } from '../../components'

const InstitutionList: React.FC = (props: any) => {
  const [watchDataChanged, setWatchDataChanged] = React.useState<boolean>(false)

  const notifyDataChanged = () => setWatchDataChanged(!watchDataChanged)

  return (
    <div data-testid="institutions-list">
      <SectionHeader title="Institutions" subtitle="" rightComponent={<></>} />
      <InstitutionTable
        notifyDataChanged={notifyDataChanged}
        watchDataChanged={watchDataChanged}
      />
    </div>
  )
}

export default InstitutionList
