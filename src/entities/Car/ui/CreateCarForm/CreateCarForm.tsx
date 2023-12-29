import { useTranslation } from 'react-i18next'
import styles from './CreateCarForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { createCar } from 'entities/Car/model/services/createCar/createCar'
import { getCreateCarState } from 'entities/Car/model/selectors/getCreateCarState'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'

interface CreateCarInputs {
  car: string
  model: string
  color: string
  numberPlate: string
}

export const CreateCarForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCarInputs>()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading } = useAppSelector(getCreateCarState)

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<CreateCarInputs> = useCallback(async (data) => {
    const {
      car,
      model,
      color,
      numberPlate
    } = data

    dispatch(createCar({
      car,
      model,
      color,
      numberPlate
    })).then(() => {
      if (!isLoading) {
        navigate('/cars')
      }
    })
  }, [dispatch])

  return (
        <div className={styles.wrapper}>
            <p>{t('createCar')}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Car"
                    label="car"
                    register={register}
                    required
                />
                <Input
                    type="text"
                    placeholder="Model"
                    label="model"
                    register={register}
                    required
                />
                <Input
                    type="text"
                    placeholder="Color"
                    label="color"
                    register={register}
                    required
                />
                <Input
                    type="text"
                    placeholder="Number plate"
                    label="numberPlate"
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
