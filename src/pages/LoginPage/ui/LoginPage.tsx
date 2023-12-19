import styles from './LoginPage.module.scss'
import { LoginForm } from 'features/AuthByEmail'

export const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  )
}
