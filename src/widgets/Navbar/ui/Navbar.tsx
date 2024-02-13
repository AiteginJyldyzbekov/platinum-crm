import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { Button } from 'shared/ui/Button/Button'
import { useAppDispatch } from 'shared/lib/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { userActions } from 'entities/User'

export const Navbar = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(userActions.logout())
    navigate('/')
  }

  return (
    <div className={styles.wrapper}>
      {t('Navbar')}
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} />
        <Button onClick={onLogout}>{t('logout')}</Button>
      </div>
    </div>
  )
}
