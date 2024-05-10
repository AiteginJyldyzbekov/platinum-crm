import { useTranslation } from 'react-i18next'
import { memo, useEffect } from 'react'
import { getCarsState } from 'entities/Car/model/selectors/getCarsState'
import { getCars } from 'entities/Car'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { PageContainer } from 'widgets/PageContainer'
import { CarsTable } from 'widgets/Tables/CarsTable'
import { getPaginationState } from 'entities/Pagination/model/selectors/getPaginationState'
import { Pagination } from 'entities/Pagination'

const CarsPage = memo(() => {
  const { t } = useTranslation()
  const { isLoading, result } = useAppSelector(getCarsState)
  const { limit } = useAppSelector(getPaginationState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCars({ limitNumber: limit, orderByProp: 'brand' }))
  }, [])

  // if (isLoading) return <Loader />

  return (
    <PageContainer
      buttonText="Add car"
      createPath='/create-car'
    >
      <CarsTable data={result} />
      <Pagination collectionName='cars' isLoading={isLoading} />
    </PageContainer>
  )
})

export default CarsPage
