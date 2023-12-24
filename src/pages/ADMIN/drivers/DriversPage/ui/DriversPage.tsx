import { useTranslation } from 'react-i18next'
import styles from './DriversPage.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect, useMemo } from 'react'
import { getDrivers, getDriversState, deleteDriver } from 'entities/Driver'

import { Loader } from 'shared/ui/Loader/Loader'

const DriversPage = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { result, isLoading } = useSelector(getDriversState)

  useEffect(() => {
    dispatch<any>(getDrivers())
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
      dispatch<any>(deleteDriver({ tid, email, password }))
    }
  }

  const renderDrivers = useMemo(() => (
    result?.map((el, index) => (
      <div className={styles.row__container} key={`${el.name}_${index}`}>
        <Link to={el.tid} className={styles.table__row}>
          <p>{el.name}</p>
          <p>{el.lastname}</p>
          <p>{el.surname}</p>
          <p>{t('phoneNumber')}</p>
        </Link>
        <Button
          theme={ThemeButton.OUTLINE}
          onClick={(e) => {
            e.stopPropagation()
            onDelete(e, el.name, el.tid, el.email, el.password)
          }}
        >
          <p>{t('delete')}</p>
        </Button>
      </div>
    ))
  ), [result])
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
