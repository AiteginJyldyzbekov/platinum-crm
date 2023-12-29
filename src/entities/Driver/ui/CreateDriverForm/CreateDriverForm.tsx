import { useTranslation } from 'react-i18next'
import styles from './CreateDriverForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { memo, useCallback } from 'react'
import { createDriver } from '../../model/services/createDriver/createDriver'
import { useNavigate } from 'react-router-dom'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { getCreateDriverState } from 'entities/Driver/model/selectors/getCreateDriverState'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'

interface CreateDriverInputs {
  email: string
  password: string
  name: string
  lastname: string
  surname: string
}

export const CreateDriverForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateDriverInputs>()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading } = useAppSelector(getCreateDriverState)

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<CreateDriverInputs> = useCallback(async (data) => {
    const {
      email,
      password,
      name,
      surname,
      lastname
    } = data

    dispatch(createDriver({
      email,
      password,
      name,
      surname,
      lastname
    })).then(() => {
      if (!isLoading) {
        navigate('/drivers')
      }
    })
  }, [dispatch])

  return (
    <div className={styles.wrapper}>
      <p>{t('createDriver')}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Name"
          label="name"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder="Lastname"
          label="lastname"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder="Surname"
          label="surname"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder="Email"
          label="email"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder="Password"
          label="password"
          register={register}
          required
        />
        <Button
          theme={ThemeButton.OUTLINE}
          type='submit'
        >
          {t('add')}
        </Button>
      </form>
    </div>
  )
})
