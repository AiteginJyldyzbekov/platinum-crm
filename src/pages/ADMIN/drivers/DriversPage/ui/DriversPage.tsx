import { useTranslation } from 'react-i18next'
import { memo, useEffect } from 'react'
import { getDrivers, getDriversState, deleteDriver } from 'entities/Driver'
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

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    nameToDelete: string,
    tid: string,
    email: string,
    password: string
  ) => {
    e.stopPropagation()
    const res = window?.confirm(`Вы действительно хотите удалить водителя ${nameToDelete}?`)
    if (res) {
      dispatch(deleteDriver({ tid, email, password }))
    }
  }

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
