import { useTranslation } from 'react-i18next'
import { memo, useEffect } from 'react'
import { getDrivers, getDriversState } from 'entities/Driver'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { PageContainer } from 'widgets/PageContainer'
import { DriversTable } from 'widgets/Tables/DriversTable'
import { getPaginationState } from 'entities/Pagination/model/selectors/getPaginationState'
import { Pagination } from 'entities/Pagination'

const DriversPage = memo(() => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { result, isLoading } = useAppSelector(getDriversState)
  const { limit } = useAppSelector(getPaginationState)

  useEffect(() => {
    dispatch(getDrivers({ limitNumber: limit, orderByProp: 'name' }))
  }, [])

  // if (isLoading) return <Loader />

  return (
    <PageContainer
      buttonText="Add driver"
      createPath="/create-driver"
    >
      <DriversTable data={result} />
      <Pagination collectionName='users' isLoading={isLoading} />
    </PageContainer>
  )
})

export default DriversPage
