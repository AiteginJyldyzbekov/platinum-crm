import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Input.module.scss'
import { type InputHTMLAttributes, memo } from 'react'
import { type UseFormRegister } from 'react-hook-form'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  register?: UseFormRegister<any>
  label?: string
  onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    label,
    register,
    required,
    ...otherProps
  } = props

  const onChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={classNames(styles.Input, {}, [className])}>
      <input
        type={type}
        value={value}
        onChange={onChageHandler}
        {...otherProps}
        {...register(label, { required })}
      />
    </div>
  )
})
