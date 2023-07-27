import React from 'react'
import { SectionHeader, ProductTable } from '../../components'

const ProductList: React.FC = (props: any) => {
  const [watchDataChanged, setWatchDataChanged] = React.useState<boolean>(false)

  const notifyDataChanged = () => setWatchDataChanged(!watchDataChanged)

  return (
    <div data-testid="products-list">
      <SectionHeader title="Products" subtitle="" rightComponent={<></>} />
      <ProductTable
        notifyDataChanged={notifyDataChanged}
        watchDataChanged={watchDataChanged}
      />
    </div>
  )
}

export default ProductList
