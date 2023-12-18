import { memo, useCallback } from 'react'
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

  const { email, password, isLoading } = useSelector(getLoginState)

  const onChangeEmail = useCallback((value: string) => {
    dispatch(loginActions.setEmail(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch<any>(loginByEmail({ email, password }))
      .then(() => {
        if (!isLoading) {
          navigate('/')
        }
      })
  }, [dispatch, email, password])

  return (
    <div className={styles.wrapper}>
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
      </div>
      <Button
        theme={ThemeButton.OUTLINE}
        onClick={onLoginClick}
      >
        {t('login')}
      </Button>
    </div>
  )
})
