import { useTranslation } from 'react-i18next'
import styles from './DriverDetailPage.module.scss'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDriverById, getDriverState } from 'entities/Driver'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import {
  BalanceType,
  changeBalance
} from 'entities/Driver/model/services/changeBalance/changeBalance'
import { Loader } from 'shared/ui/Loader/Loader'

const DriverDetailPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, result } = useAppSelector(getDriverState)
  const navigate = useNavigate()

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

  if (isLoading) return <Loader />
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
      <form>
        Driver Detail Page
      </form>
    </div>
  )
}

export default DriverDetailPage
