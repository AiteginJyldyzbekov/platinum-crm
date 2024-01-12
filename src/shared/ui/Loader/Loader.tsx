import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Loader.module.scss'

interface LoaderProps {
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
        <div className={classNames(styles.loader, {}, [className])}></div>
  )
}
