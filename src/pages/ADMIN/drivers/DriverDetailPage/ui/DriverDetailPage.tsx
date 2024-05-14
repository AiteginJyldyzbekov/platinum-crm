import { useTranslation } from 'react-i18next'
import styles from './DriverDetailPage.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import { type Driver, type DriverTransactionHistory } from 'entities/Driver/model/types/driverSchema'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import ModalWindow from 'shared/ui/ModalWindow/ModalWindow'
import { Select } from 'shared/ui/Select'
import CustomDatePicker from 'shared/ui/CustomDatePicker/CustomDatePicker'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { type Car } from 'entities/Car/model/types/CarSchema'

const DriverDetailPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, result } = useAppSelector(getDriverState)
  const { isLoading: isCarLoading, result: car } = useAppSelector(getCarState)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [cars, setCars] = useState([])
  const [newCar, setNewCar] = useState<string>()

  useEffect(() => {
    dispatch(getDriverById({ tid: id }))
  }, [id])

  useEffect(() => {
    if (result?.car) {
      dispatch(getCarById({ tid: result?.car }))
    }
  }, [result])

  useEffect(() => {
    const getCars = async () => {
      const q = query(collection(db, 'cars'), where('status', '==', 'free'))
      const querySnapshot = await getDocs(q)
      const carsArray: Car[] = []
      querySnapshot.forEach((doc) => {
        carsArray.push({ tid: doc.id, ...doc.data() } as Car)
      })
      setCars(carsArray)
    }

    getCars()
  }, [dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<Driver>()

  const onSubmit: SubmitHandler<Driver> = useCallback(async (data) => {
    const { weekendDates, startRentDate } = data
    const formattedWeekendDates = weekendDates.map((date: any) => date?.format?.('D/MM/YYYY'))
    console.log(newCar)
    const driverRef = doc(db, 'users', id)
    await updateDoc(driverRef, {
      status: 'atWork',
      weekendDates: formattedWeekendDates,
      startRentDate,
      car: newCar
    })

    const carRef = doc(db, 'cars', newCar)
    await updateDoc(carRef, {
      status: 'atWork',
      driver: id
    }).then(() => {
      window.location.reload()
    })
  }, [result, isLoading, newCar])

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

  const stopRent = async () => {
    const driverRef = doc(db, 'users', id)
    const carRef = doc(db, 'cars', result?.car)

    await updateDoc(driverRef, { status: 'free', car: null })
    await updateDoc(carRef, { status: 'free', driver: null })
      .then(() => {
        window.location.reload()
      })
  }

  const startRent = async () => {
    setIsModalOpen(true)
  }

  if (isLoading && isCarLoading) return <Loader />
  return (
    <div className={styles.wrapper}>
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
        <Button
          theme={result?.car ? ThemeButton.RED : ThemeButton.GREEN}
          onClick={result?.car ? stopRent : startRent}
        >
          {
            result?.car ? t('DriverDetailPage.stopRent') : t('DriverDetailPage.startRent')
          }
        </Button>
      </div>
      <ModalWindow
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false) }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select data={cars} setState={setNewCar} />
          <CustomDatePicker
            control={control}
            name='startRentDate'
          />
          <Controller
            control={control}
            name="weekendDates"
            rules={{ required: true }}
            render={({
              field: { onChange }
            }) => (
              <DatePicker
                multiple
                format={'DD/MM/YYYY'}
                onChange={(date) => {
                  onChange(date)
                }}
                plugins={[
                  <DatePanel key={1} />
                ]}
              />
            )}
          />
          <Button theme={ThemeButton.DEFAULT}>Submit</Button>
        </form>
      </ModalWindow>
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
