import { useTranslation } from 'react-i18next'
import styles from './CarDetail.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCarById, getCarState, updateCar } from 'entities/Car'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { type Car } from 'entities/Car/model/types/CarSchema'

const CarDetailPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, result } = useAppSelector(getCarState)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Car>()

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<Car> = useCallback(async (data) => {
    const updatedCarData: Car = {
      tid: '',
      brand: '',
      model: '',
      color: '',
      numberPlate: '',
      year: '',
      status: '',
      id: '',
      images: [
        {
          file: null,
          url: '',
          isLoading: false,
          name: ''
        }
      ],
      techPassport: {
        file: null,
        url: '',
        isLoading: false,
        name: ''
      },
      expenseHistory: [
        {
          date: '',
          expenseType: '',
          amount: '',
          description: ''
        }
      ],
      lastOilChangeDate: '',
      lastGearChangeDate: ''
    }

    dispatch(updateCar(updatedCarData)).then(() => {
      navigate('/cars')
    })
  }, [])

  useEffect(() => {
    if (!isLoading && result) {
      const { brand, model, color, numberPlate } = result
      setValue('brand', brand)
      setValue('model', model)
      setValue('color', color)
      setValue('numberPlate', numberPlate)
    }
  }, [isLoading, result, setValue])

  useEffect(() => {
    dispatch(getCarById({ tid: id }))
  }, [id])

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
          {t('save')}
        </Button>
      </form>
    </div>
  )
}

export default CarDetailPage
