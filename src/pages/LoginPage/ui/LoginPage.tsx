import { useTranslation } from 'react-i18next'
import styles from './LoginPage.module.scss'
import { LoginForm } from 'features/AuthByUsername'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
        <div className={styles.wrapper}>
            <LoginForm />
        </div>
  )
}

export default LoginPage
