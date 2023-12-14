import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LoginForm.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from '../../model/slice/LoginSlice'
import { Input } from 'shared/ui/Input/Input'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import {
  loginByUsername
} from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'

const LoginForm = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { username, password } = useSelector(getLoginState)

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch<any>(loginByUsername({ username, password }))
  }, [dispatch, username, password])

  return (
        <div className={styles.wrapper}>
            <div className={styles.inputs__container}>
                <Input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={onChangeUsername}
                />
                <Input
                    type='text'
                    placeholder='password'
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

export default LoginForm
