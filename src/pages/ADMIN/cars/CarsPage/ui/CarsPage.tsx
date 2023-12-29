import { useTranslation } from 'react-i18next'
import styles from './CarsPage.module.scss'
import { Link } from 'react-router-dom'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { memo, useEffect, useMemo } from 'react'
import { getCarsState } from 'entities/Car/model/selectors/getCarsState'
import { Loader } from 'shared/ui/Loader/Loader'
import { getCars } from 'entities/Car'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'

const CarsPage = memo(() => {
  const { t } = useTranslation()
  const { isLoading, result } = useAppSelector(getCarsState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCars())
  }, [])

  const onDelete = (
    tid: string,
    car: string
  ) => {
    const res = window?.confirm('Вы действительно хотите удалить машину ' + car + '?')
    if (res) {
      deleteDoc(doc(db, 'cars', tid))
      window?.location?.reload()
    }
  }

  const renderCars = useMemo(() => (
    result?.map((el, index) => (
      <div className={styles.row__container} key={`${el.car}_${index}`}>
        <Link to={el.tid} className={styles.table__row}>
          <p>{el.car}</p>
          <p>{el.model}</p>
          <p>{el.color}</p>
          <p>{el.numberPlate}</p>
        </Link>
        <Button
          theme={ThemeButton.OUTLINE}
          onClick={(e) => {
            e.stopPropagation()
            onDelete(el.tid, el.car)
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
        <p>{t('CarsPage')}</p>
        <Link to={'/create-car'}>
          <Button theme={ThemeButton.OUTLINE}>{t('add')}</Button>
        </Link>
      </div>
      <div className={styles.table__content}>
        <div className={styles.table__header}>
          <p>{t('car')}</p>
          <p>{t('model')}</p>
          <p>{t('color')}</p>
          <p>{t('numberPlate')}</p>
        </div>
        <div className={styles.table__rows}>
          {renderCars}
        </div>
      </div>
    </div>
  )
})

export default CarsPage
