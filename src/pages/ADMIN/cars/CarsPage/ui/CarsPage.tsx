import { useTranslation } from 'react-i18next'
import { memo, useEffect } from 'react'
import { getCarsState } from 'entities/Car/model/selectors/getCarsState'
import { Loader } from 'shared/ui/Loader/Loader'
import { getCars } from 'entities/Car'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { PageContainer } from 'widgets/PageContainer'
import { CarsTable } from 'widgets/Tables/CarsTable'

const CarsPage = memo(() => {
  const { t } = useTranslation()
  const { isLoading, result } = useAppSelector(getCarsState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCars())
  }, [])

  if (isLoading) return <Loader />

  return (
    <PageContainer
      buttonText="Add car"
      createPath='/create-car'
    >
      <CarsTable data={result} />
    </PageContainer>
  )
})

export default CarsPage
