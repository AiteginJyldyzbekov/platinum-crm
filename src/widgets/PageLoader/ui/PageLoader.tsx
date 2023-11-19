import { classNames } from 'shared/lib/classNames/classNames'
import styles from './PageLoader.module.scss'
import { Loader } from 'shared/ui/Loader/Loader'

interface PageLoaderProps {
  className?: string
}

export const PageLoader: React.FC<PageLoaderProps> = ({ className }) => {
  return (
        <div className={classNames(styles.PageLoader, {}, [className])}>
            <Loader />
        </div>
  )
}
