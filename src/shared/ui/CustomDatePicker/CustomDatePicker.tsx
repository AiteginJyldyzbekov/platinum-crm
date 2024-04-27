import { Controller, type UseFormRegister } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'

interface DatePickerProps {
  register?: UseFormRegister<any>
  name: string
  required?: boolean
  control: any
  value?: string
}

const CustomDatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    name,
    required,
    control,
    value
  } = props

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({
        field: { onChange, name }
      }) => (
        <DatePicker
          format={'D/MM/YYYY'}
          value={value && value}
          onChange={(date: any) => {
            onChange(date.format?.('D/MM/YYYY'))
          }}
        />
      )}
    />
  )
}

export default CustomDatePicker
