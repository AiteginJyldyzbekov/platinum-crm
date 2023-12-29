import { useTranslation } from 'react-i18next'
import styles from './DriverDetailPage.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDriverById, getDriverState, updateDriver } from 'entities/Driver'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'

interface DriverDetailPageProps {
  email: string
  password: string
  name: string
  lastname: string
  surname: string
}

const DriverDetailPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, result } = useAppSelector(getDriverState)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<DriverDetailPageProps>()

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<DriverDetailPageProps> = useCallback(async (data) => {
    const updatedUserData = {
      tid: id,
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
      lastname: data.lastname
    }

    dispatch(updateDriver(updatedUserData)).then(() => {
      navigate('/drivers')
    })
  }, [])

  useEffect(() => {
    if (!isLoading && result) {
      const { email, password, name, lastname, surname } = result
      setValue('email', email)
      setValue('password', password)
      setValue('name', name)
      setValue('lastname', lastname)
      setValue('surname', surname)
    }
  }, [isLoading, result, setValue])

  useEffect(() => {
    dispatch(getDriverById({ tid: id }))
  }, [id])

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
          {t('save')}
        </Button>
      </form>
    </div>
  )
}

export default DriverDetailPage
