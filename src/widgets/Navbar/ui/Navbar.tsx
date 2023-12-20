import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      {t('Navbar')}
    </div>
  )
}
