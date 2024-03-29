import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { Logout } from 'widgets/Logout'

export const Navbar = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t('Navbar')}</p>
      <div className={styles.switchers__container}>
        <ThemeSwitcher />
        <LangSwitcher />
        <Logout />
      </div>
    </div>
  )
}
