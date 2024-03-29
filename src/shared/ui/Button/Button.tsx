import { type ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  DEFAULT = 'default'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  clasName?: string
  theme?: ThemeButton
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    clasName,
    children,
    theme,
    ...otherProps
  } = props

  return (
    <button
      className={classNames(styles.Button, {}, [clasName, styles[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
