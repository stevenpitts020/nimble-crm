import React, { useContext } from 'react'
import { Card, Skeleton } from 'antd'
import _ from 'lodash'
import { ProductTableLayout } from './ProductTableLayout'
import { ProductListContext } from '../../../store/ProductListProvider'
import { ProfileContext } from '../../../store/ProfileProvider'
import { BaseRateContext } from '../../../store/BaseRateProvider'

interface IProductTableProps {
  notifyDataChanged: () => void
  watchDataChanged: boolean
}

export const ProductTable: React.FC<IProductTableProps> = (
  props: IProductTableProps
) => {
  const { state, list } = useContext(ProductListContext)
  const { profileState } = React.useContext(ProfileContext)
  const { baseRateState, getBaseRate } = React.useContext(BaseRateContext)

  const baseRate = _.get(baseRateState, 'baseRate', [])

  React.useEffect(() => {
    const status = _.get(profileState, 'status')

    if (status === 'success') {
      const id = _.get(profileState, 'profile.institution.id')
      list(id)
      getBaseRate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileState])

  const isLoading = [
    state.status,
    profileState.status,
    baseRateState.status,
  ].includes('loading')

  if (isLoading) {
    return (
      <Card bordered={false} size="default">
        <Skeleton active={true} />
      </Card>
    )
  }

  return (
    <>
      <Card bordered={false} size="small">
        <ProductTableLayout
          data={state.products}
          loading={isLoading}
          baseRate={baseRate}
        />
      </Card>
    </>
  )
}
