import { useTranslation } from 'react-i18next'
import styles from './DriverDetailPage.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDriverById, getDriverState, updateDriver } from 'entities/Driver'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import {
  BalanceType,
  changeBalance
} from 'entities/Driver/model/services/changeBalance/changeBalance'
import { type Driver } from 'entities/Driver/model/types/driverSchema'

const DriverDetailPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, result } = useAppSelector(getDriverState)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Driver>()

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<Driver> = useCallback(async (data) => {
    const updatedUserData = {
      tid: '',
      id: '',
      email: '',
      password: '',
      name: '',
      lastName: '',
      phoneNumber: '',
      images: [{ url: '', isLoading: false, name: '' }],
      balance: 1,
      transactionHistory: [
        {
          amount: '',
          date: '',
          amountType: ''
        }
      ],
      startRentDate: '',
      weekendDates: [
        {
          weekends: ['', ''],
          month: ''
        }
      ]
    }

    dispatch(updateDriver(updatedUserData)).then(() => {
      navigate('/drivers')
    })
  }, [])

  useEffect(() => {
    if (!isLoading && result) {
      // const { email, password, name, lastname, surname } = result
      // setValue('email', email)
      // setValue('password', password)
      // setValue('name', name)
      // setValue('lastname', lastname)
      // setValue('surname', surname)
    }
  }, [isLoading, result, setValue])

  useEffect(() => {
    dispatch(getDriverById({ tid: id }))
  }, [id])

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

  return (
    <div className={styles.wrapper}>
      <p>{t('createDriver')}</p>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Name"
          label="name"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder="Lastname"
          label="lastname"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder="Surname"
          label="surname"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder="Email"
          label="email"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder="Password"
          label="password"
          register={register}
          required
        />
        <Button
          theme={ThemeButton.OUTLINE}
          type='submit'
        >
          {t('save')}
        </Button>
      </form>
    </div>
  )
}

export default DriverDetailPage
