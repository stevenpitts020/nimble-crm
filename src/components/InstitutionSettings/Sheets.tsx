import _ from 'lodash'
import React from 'react'
import InstitutionService from '../../services/InstitutionService'
import { IInstitutionUpdate } from '../../store'
import { IInstitutionState } from '../../store/InstitutionProvider'
import { Sheet } from '../Common/Sheet/Sheet'

interface SheetsProps {
  state: IInstitutionState
}

const defaultSheets = {
  styles: { 'A1:Z1': { fontWeight: 'bold' } },
  sheets: [
    {
      name: 'Advanced Rates',
      id: 'advanced-rates',
      data: [
        { cell: 'a1', value: 'Collateral Description' },
        { cell: 'b1', value: 'Term (months)' },
        { cell: 'c1', value: 'Amortization (in years)' },
        { cell: 'd1', value: 'Amortization (months)' },
        {
          cell: 'e1',
          value: 'Collateral Analysis: Institutional Policy Advance Rate',
        },
      ],
    },
    {
      name: 'High Risk Industries',
      id: 'high-risk-industries',
      data: [],
    },
    {
      name: 'Rates',
      id: 'rates',
      data: [],
    },
    {
      name: 'Financials',
      id: 'financials',
      data: [],
    },
    {
      name: 'Compliance Questions',
      id: 'compliance-questions',
      data: [],
    },
    {
      name: 'Employee Roles',
      id: 'employee-roles',
      data: [
        { cell: 'a1', value: 'Employee First Name' },
        { cell: 'b1', value: 'Employee Last Name' },
        { cell: 'c1', value: 'Department' },
        { cell: 'd1', value: 'Branch' },
        { cell: 'e1', value: 'Title' },
        { cell: 'f1', value: 'Email Address' },
        { cell: 'g1', value: 'Cell Phone Number' },
      ],
    },
  ],
}

export function Sheets(props: SheetsProps): React.ReactElement {
  // const institutionDomain = _.get(props.state, 'institution.domain')
  const publicMetadata = _.get(props.state, 'institution.publicMetadata')
  if (!publicMetadata) {
    return <></>
  }

  const id = _.get(props.state, 'institution.id')

  const data = publicMetadata.settingSheets || JSON.stringify(defaultSheets)

  function onSave(newData: string) {
    publicMetadata.settingSheets = newData

    const institution: IInstitutionUpdate = {
      id,
      publicMetadata,
    }

    InstitutionService.update(institution)
  }

  return (
    <Sheet
      onSave={onSave}
      menu={true}
      data={data}
      style={{ height: '50vh', width: '100%' }}
      rowsCount={200}
      toolbarBlocks={[
        'undo',
        'colors',
        'decoration',
        'align',
        'lock',
        'clear',
        'rows',
        'format',
      ]}
    />
  )
}
