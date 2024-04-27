import { useTranslation } from 'react-i18next'
import { memo, useEffect } from 'react'
import { getDrivers, getDriversState } from 'entities/Driver'
import { Loader } from 'shared/ui/Loader/Loader'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { PageContainer } from 'widgets/PageContainer'
import { DriversTable } from 'widgets/Tables/DriversTable'

const DriversPage = memo(() => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { result, isLoading } = useAppSelector(getDriversState)

  useEffect(() => {
    dispatch(getDrivers())
  }, [])

  if (isLoading) return <Loader />

  return (
    <PageContainer
      buttonText="Add driver"
      createPath="/create-driver"
    >
      <DriversTable data={result} />
    </PageContainer>
  )
})

export default DriversPage
