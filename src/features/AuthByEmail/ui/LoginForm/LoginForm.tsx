import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LoginForm.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from '../../model/slice/LoginSlice'
import { Input } from 'shared/ui/Input/Input'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import {
  loginByEmail
} from 'features/AuthByEmail/model/services/loginByEmail/loginByEmail'
import { useNavigate } from 'react-router-dom'

export const LoginForm = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isRemember, setIsRemember] = useState(false)

  const { email, password, isLoading } = useSelector(getLoginState)

  const onChangeEmail = useCallback((value: string) => {
    dispatch(loginActions.setEmail(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch<any>(loginByEmail({ email, password, isRemember }))
      .then(() => {
        if (!isLoading) {
          navigate('/')
        }
      })
  }, [dispatch, email, password, isRemember])

  return (
    <div className={styles.wrapper}>
      <p>{t('login')}</p>
      <div className={styles.inputs__container}>
        <Input
          type="text"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
        />
        <Input
          type="text"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
        <div className={styles.checkbox__container}>
          <input
            type="checkbox"
            id="remember-me"
            className={styles.checkbox}
            checked={isRemember}
            onClick={() => { setIsRemember(!isRemember) }}
          />
          <label
            htmlFor="remember-me"
            className={styles.checkbox__label}
          >
            {t('rememberMe')}
          </label>
        </div>
        <Button
          theme={ThemeButton.OUTLINE}
          onClick={onLoginClick}
        >
          {t('login')}
        </Button>
      </div>
    </div>
  )
})
