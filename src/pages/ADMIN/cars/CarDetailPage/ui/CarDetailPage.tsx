import { useTranslation } from 'react-i18next'
import styles from './CarDetailPage.module.scss'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCarById, getCarState } from 'entities/Car'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { Loader } from 'shared/ui/Loader/Loader'
import { Status } from 'shared/ui/Status'
import DottedLabel from 'shared/ui/DottedLabel/DottedLabel'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { type CarExpenseHistory } from 'entities/Car/model/types/CarSchema'
import ImageCollageView from 'shared/ui/ImageCollageView/ImageCollageView'
import ImageView from 'shared/ui/ImageView/ImageView'
import FinancialHistory from 'widgets/FinancialHistory/ui/FinancialHistory'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { getDriverById, getDriverState } from 'entities/Driver'

const CarDetailPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, result } = useAppSelector(getCarState)
  const { isLoading: isDriverLoading, result: driver } = useAppSelector(getDriverState)

  useEffect(() => {
    dispatch(getCarById({ tid: id }))
  }, [id])

  useEffect(() => {
    if (result?.driver) {
      dispatch(getDriverById({ tid: result?.driver }))
    }
  }, [result])

  const addTransaction = async (data: CarExpenseHistory[]) => {
    const ref = doc(db, 'cars', id)
    await updateDoc(ref, { expenseHistory: data })
  }

  if (isLoading && !result && isDriverLoading) return <Loader />
  return (
        <div className={styles.wrapper}>
            <div className={styles.top__content}>
                <div className={styles.car__title}>{result?.brand} {result?.model}</div>
                <Status status={result?.status} />
            </div>
            <div className={styles.bottom__content}>
                <div className={styles.main__content}>
                    <div className={styles.car}>
                        <p className={styles.title}>{t('DetailPages.carInfo')}</p>
                        <div className={styles.dotted__labels}>
                            <DottedLabel
                                label={'DottedLabels.numberPlate'}
                                value={result?.numberPlate}
                            />
                            <DottedLabel
                                label={'DottedLabels.brand'}
                                value={result?.brand}
                            />
                            <DottedLabel
                                label={'DottedLabels.model'}
                                value={result?.model}
                            />
                            <DottedLabel
                                label={'DottedLabels.createdYear'}
                                value={result?.year}
                            />
                        </div>
                    </div>
                    <div className={styles.driver}>
                        {
                            result?.driver
                              ? (
                                    <>
                                        <p className={styles.title}>{t('DetailPages.driver')}</p>
                                        <div className={styles.dotted__labels}>
                                            <DottedLabel
                                                label={'DottedLabels.name'}
                                                value={`${driver?.name} ${driver?.lastName}`}
                                            />
                                            <DottedLabel
                                                label={'DottedLabels.phoneNumber'}
                                                value={driver?.phoneNumber}
                                            />
                                        </div>
                                        <Button
                                            theme={ThemeButton.DEFAULT}
                                            clasName={styles.more__button}
                                        >
                                            <Link
                                                to={`/drivers/detail/${result?.driver}`}
                                                style={{ textDecoration: 'none', color: 'white' }}
                                            >
                                                {t('DetailPages.moreAboutDriver')}
                                            </Link>
                                        </Button>
                                    </>
                                )
                              : <p>{t('DetailPages.noDriver')}</p>
                        }
                    </div>
                    <div className={styles.car__images}>
                        <ImageCollageView images={result?.images} />
                    </div>
                    <div className={styles.car__techPassport}>
                        <ImageView image={result?.techPassport} />
                    </div>
                </div>
                <div className={styles.transaction__history}>
                    <FinancialHistory history={result?.expenseHistory} handleAdd={addTransaction} />
                </div>
            </div>
        </div>
  )
}

export default CarDetailPage
