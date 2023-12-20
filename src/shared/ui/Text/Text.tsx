import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Text.module.scss'

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
}

export const Text = (props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY
  } = props
  return (
        <div className={classNames(styles.Text, { [styles[theme]]: true }, [className])}>
            {title && <p className={styles.title}>{title}</p>}
            {text && <p className={styles.text}>{text}</p>}
        </div>
  )
}
