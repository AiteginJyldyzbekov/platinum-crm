import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Input.module.scss'
import { type InputHTMLAttributes, memo } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
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
            />
        </div>
  )
})
