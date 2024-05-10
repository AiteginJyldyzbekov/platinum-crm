import { useTranslation } from 'react-i18next'
import styles from './DriverDetailPage.module.scss'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDriverById, getDriverState } from 'entities/Driver'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import {
  BalanceType,
  changeBalance
} from 'entities/Driver/model/services/changeBalance/changeBalance'
import { Loader } from 'shared/ui/Loader/Loader'
import ImageView from 'shared/ui/ImageView/ImageView'
import FinancialHistory from 'widgets/FinancialHistory/ui/FinancialHistory'
import DottedLabel from 'shared/ui/DottedLabel/DottedLabel'
import { Status } from 'shared/ui/Status'
import { getCarById, getCarState } from 'entities/Car'
import { type DriverTransactionHistory } from 'entities/Driver/model/types/driverSchema'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { Button, ThemeButton } from 'shared/ui/Button/Button'

const DriverDetailPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, result } = useAppSelector(getDriverState)
  const { isLoading: isCarLoading, result: car } = useAppSelector(getCarState)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDriverById({ tid: id }))
  }, [id])

  useEffect(() => {
    if (result?.car) {
      dispatch(getCarById({ tid: result?.car }))
    }
  }, [result])

  const balanceHandler = (type: BalanceType) => {
    const sum = window?.prompt('Напишите сумму')
    if (sum) {
      dispatch(changeBalance({
        tid: id,
        type,
        currentBalance: result.balance,
        amount: Number(sum)
      }))
        .then(() => {
          alert('Баланс успешно обновлен')
        })
    }
  }

  const addTransaction = async (data: DriverTransactionHistory[]) => {
    const ref = doc(db, 'users', id)
    await updateDoc(ref, { transactionHistory: data })
  }

  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  const todayFormatted = `${dd}/${mm}/${yyyy}`

  if (result) {
    const [day, month, year] = result?.startRentDate.split('/')
    const startRentDate = new Date(`${year}-${month}-${day}`)
    console.log(startRentDate)
  }
  // const set = () => {
  //   if (
  //     today < result?.startRentDate.toDate()
  //   ) {
  //     console.log("дата езе не пришла")
  //   } else {
  //     console.log("пришла")
  //   }
  // }

  if (isLoading && isCarLoading) return <Loader />
  return (
    <div className={styles.wrapper}>
      {/* <button onClick={set}>TEST</button> */}
      <div className={styles.balance__block}>
        <div
          className={styles.balance__minus}
          onClick={() => { balanceHandler(BalanceType.minus) }}
        >-</div>
        <p>{`${t('balance')}: ${result?.balance}`}</p>
        <div
          className={styles.balance__plus}
          onClick={() => { balanceHandler(BalanceType.plus) }}
        >+</div>
      </div>
      <div className={styles.top__content}>
        <div className={styles.car__title}>{result?.name} {result?.lastName}</div>
        <Status status={result?.status} />
      </div>
      <div className={styles.bottom__content}>
        <div className={styles.main__content}>
          <div className={styles.car}>
            <p className={styles.title}>{t('DetailPages.driverInfo')}</p>
            <div className={styles.dotted__labels}>
              <DottedLabel label={'DottedLabels.name'} value={result?.name} />
              <DottedLabel label={'DottedLabels.lastName'} value={result?.lastName} />
              <DottedLabel label={'DottedLabels.phoneNumber'} value={result?.phoneNumber} />
            </div>
          </div>
          <div className={styles.driver}>
            {
              result?.car
                ? (
                  <>
                    <p className={styles.title}>{t('DetailPages.car')}</p>
                    <div className={styles.dotted__labels}>
                      <DottedLabel label={'DottedLabels.numberPlate'} value={car?.numberPlate} />
                      <DottedLabel label={'DottedLabels.brand'} value={car?.brand} />
                      <DottedLabel label={'DottedLabels.model'} value={car?.model} />
                    </div>
                    <Button
                      theme={ThemeButton.DEFAULT}
                      clasName={styles.more__button}
                    >
                      <Link
                        to={`/cars/detail/${result?.car}`}
                        style={{ textDecoration: 'none', color: 'white' }}
                      >
                        {t('DetailPages.moreAboutCar')}
                      </Link>
                    </Button>

                  </>
                  )
                : <p>{t('DetailPages.noCar')}</p>
            }
          </div>
          <div className={styles.car__techPassport}>
            <ImageView image={result?.images[1]} />
          </div>
          <div className={styles.car__techPassport}>
            <ImageView image={result?.images[0]} />
          </div>
        </div>
        <div className={styles.transaction__history}>
          <FinancialHistory history={result?.transactionHistory} handleAdd={addTransaction} />
        </div>
      </div>
    </div>
  )
}

export default DriverDetailPage
