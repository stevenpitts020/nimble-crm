import React from 'react'
import DataTable, { IDataTableCols } from '../../components/DataTable/DataTable'
import { generateSome } from '../../services/FakerService'

const cols: IDataTableCols = {
  a: ' my custom text ', // <- key:value custom header
  e: <div>my custom html</div>,
}

const data: object[] = [
  { a: 1, b: 2, c: 3, d: 4, e: 5 }, // <-- most common way of sending data in is full objects
  { a: 2, b: 2, c: 3, d: 4, e: 5 },
  { a: 3, b: 2, c: 3, d: 4, e: 5 },
  { a: 4, b: 2, c: 3, d: 4, e: 5 },
  { a: 5, b: 2, c: 3, d: 4, e: 5 },
  { a: 6, b: 2, c: 3, d: 4, e: 5 },
]

// user fakerJS format here: http://marak.github.io/faker.js/#toc7__anchor
// use | to set a label, ex: faker.string|label
const data2 = generateSome([
  'name.firstName',
  'name.lastName',
  'internet.email',
  'company.companyName',
  'date.past|creationDate',
])

const DemoDataTable: React.FC = (props: any) => {
  return (
    <React.Fragment>
      <div>
        <h1>Headings</h1>
      </div>
      <DataTable cols={cols} data={data} />
      <DataTable data={data2} />
    </React.Fragment>
  )
}

export default DemoDataTable
