import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LoginForm.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { loginActions } from '../../model/slice/LoginSlice'
import { Input } from 'shared/ui/Input/Input'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import {
  loginByEmail
} from 'features/AuthByEmail/model/services/loginByEmail/loginByEmail'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'

interface LoginFormInputs {
  email: string
  password: string
}

export const LoginForm = memo(() => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isRemember, setIsRemember] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  const { email, password, isLoading, error } = useAppSelector(getLoginState)

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<LoginFormInputs> = useCallback(async (data) => {
    const { password, email } = data

    dispatch(loginByEmail({ email, password, isRemember }))
      .then(() => {
        if (!isLoading) {
          navigate('/')
        }
      })
    dispatch(loginActions.setPassword(password))
    dispatch(loginActions.setEmail(email))
  }, [dispatch, email, password, isRemember])

  return (
    <div className={styles.wrapper}>
      <p>{t('login')}</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs__container}>
        <Input
          type="text"
          placeholder="email"
          label="email"
          register={register}
          required
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
        <Input
          type="text"
          placeholder="password"
          label="password"
          register={register}
          required
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
          type='submit'
        >
          {t('login')}
        </Button>
        {error && <Text text={error} theme={TextTheme.ERROR} />}
      </form>
    </div>
  )
})
