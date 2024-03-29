import { useState } from 'react'
import styles from './DatePicker.module.scss'
import { type UseFormRegister } from 'react-hook-form'

interface DatePickerProps {
  register?: UseFormRegister<any>
  label: string
  required?: boolean
  placeholder: string
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    register,
    label,
    required,
    placeholder
  } = props

  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  return (
        <div className={styles.customDatepicker}>
            <p>{placeholder}</p>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className={styles.datepickerInput}
                {...register(label, { required })}
            />
        </div>
  )
}

export default DatePicker
