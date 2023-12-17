import { useTranslation } from 'react-i18next'
import styles from './LoginPage.module.scss'
import { LoginForm } from 'features/AuthByEmail'

export const LoginPage = () => {
  const { t } = useTranslation()

  return (
        <div className={styles.wrapper}>
            <LoginForm />
        </div>
  )
}
