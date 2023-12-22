import { useTranslation } from 'react-i18next'
import styles from './DriversPage.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect, useMemo } from 'react'
import { getDrivers } from 'entities/Driver/model/services/getDrivers/getDrivers'
import { getDriverState } from 'entities/Driver/model/selectors/getDriverState'
import { Loader } from 'shared/ui/Loader/Loader'
import { deleteDriver } from 'entities/Driver/model/services/deleteDriver/deleteDriver'

const DriversPage = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isLoading, drivers } = useSelector(getDriverState)

  useEffect(() => {
    dispatch<any>(getDrivers())
  }, [])

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    nameToDelete: string,
    tid: string
  ) => {
    e.stopPropagation()
    const res = window?.confirm(`Вы действительно хотите удалить водителя ${nameToDelete}?`)
    if (res) {
      dispatch<any>(deleteDriver({ tid }))
    }
  }

  const renderDrivers = useMemo(() => (
    drivers?.map((el, index) => (
            <div className={styles.table__row} key={`${el.name}_${index}`}>
                <p>{el.name}</p>
                <p>{el.lastname}</p>
                <p>{el.surname}</p>
                <p>{t('phoneNumber')}</p>
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={(e) => { onDelete(e, el.name, el.tid) }}
                >
                    <p>{t('delete')}</p>
                </Button>
            </div>
    ))
  ), [drivers])
  if (isLoading) return <Loader />

  return (
        <div className={styles.wrapper}>
            <div className={styles.page__header}>
                <p>{t('DriversPage')}</p>
                <Link to={'/create-driver'}>
                    <Button theme={ThemeButton.OUTLINE}>{t('add')}</Button>
                </Link>
            </div>
            <div className={styles.table__content}>
                <div className={styles.table__header}>
                    <p>{t('name')}</p>
                    <p>{t('lastname')}</p>
                    <p>{t('surname')}</p>
                    <p>{t('phoneNumber')}</p>
                    <p>{t('action')}</p>
                </div>
                <div className={styles.table__rows}>
                    {renderDrivers}
                </div>
            </div>
        </div>
  )
})

export default DriversPage
