import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LoginPage.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'

const LoginPage = () => {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
        <div className={styles.wrapper}>
            <div className={styles.inputs__container}>
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                />
                <input
                    type='text'
                    placeholder='password'
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </div>
            <Button theme={ThemeButton.OUTLINE}>{t('login')}</Button>
        </div>
  )
}

export default LoginPage
