import DatePicker from 'react-multi-date-picker'
import styles from './FinancialHistory.module.scss'
import { useCallback, useMemo, useState } from 'react'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import ModalWindow from 'shared/ui/ModalWindow/ModalWindow'
import { type CarExpenseHistory } from 'entities/Car/model/types/CarSchema'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Input } from 'shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
import CustomDatePicker from 'shared/ui/CustomDatePicker/CustomDatePicker'
import { type DriverTransactionHistory } from 'entities/Driver/model/types/driverSchema'

interface FinancialHistoryProps {
  handleAdd: (data: CarExpenseHistory[] | DriverTransactionHistory[]) => Promise<void>
  history: CarExpenseHistory[] | DriverTransactionHistory[]
}

const FinancialHistory: React.FC<FinancialHistoryProps> = ({ handleAdd, history }) => {
  const [values, setValues] = useState<any>([])
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation()

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CarExpenseHistory>()

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<CarExpenseHistory> = useCallback(async (data) => {
    const newData = [...history, data]
    handleAdd(newData).then(() => {
      window.location.reload()
    })
  }, [history])

  function TotalAmountCalculator () {
    let totalAmount = 0
    history?.forEach((transaction: CarExpenseHistory | DriverTransactionHistory) => {
      totalAmount += Number(transaction.amount)
    })
    return totalAmount
  };

  const renderHistory = useMemo(() => {
    return history?.map((el, index) => (
            <li key={`${el.date}_${index}`}>
                <span style={{ flexBasis: '30%' }}>{el.date}</span>
                <span style={{ flexBasis: '50%' }}>{el.expenseType}</span>
                <span style={{ flexBasis: '20%' }}>{el.amount} {t('FinancialHistory.som')}</span>
            </li>
    ))
  }, [history])

  return (
        <div className={styles.wrapper}>
            <p className={styles.title}>{t('FinancialHistory.expenseHistory')}</p>
            <div className={styles.options__container}>
                <DatePicker
                    format={'D/MM/YYYY'}
                    placeholder={t('FinancialHistory.fromTo')}
                    value={values}
                    onChange={setValues}
                    range
                    rangeHover
                />
                <Button
                    theme={ThemeButton.DEFAULT}
                    onClick={handleOpenModal}
                >
                    {t('FinancialHistory.add')}
                </Button>
                <ModalWindow isOpen={isOpen} onClose={handleCloseModal}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomDatePicker control={control} name="date" />
                        <Input
                            type="text"
                            placeholder={t('FinancialHistory.expenseType')}
                            label="expenseType"
                            register={register}
                            required
                        />
                        <Input
                            type="number"
                            placeholder={t('FinancialHistory.amount')}
                            label="amount"
                            register={register}
                            required
                        />
                        <Button
                            theme={ThemeButton.DEFAULT}
                            type="submit">
                            {t('FinancialHistory.add')}
                        </Button>
                    </form>
                </ModalWindow>
            </div>
            <div className={styles.transactiions__container}>
                <div className={styles.transactiions__head}>
                    <span style={{ flexBasis: '30%' }}>{t('FinancialHistory.date')}</span>
                    <span style={{ flexBasis: '50%' }}>{t('FinancialHistory.expenseType')}</span>
                    <span style={{ flexBasis: '20%' }}>{t('FinancialHistory.amount')}</span>
                </div>
                <ul>
                    {renderHistory}
                </ul>
            </div>
            <div className={styles.bottom__content}>
                <p>{t('FinancialHistory.total')}</p>
                <p>{TotalAmountCalculator()} {t('FinancialHistory.som')}</p>
            </div>
        </div>
  )
}

export default FinancialHistory
