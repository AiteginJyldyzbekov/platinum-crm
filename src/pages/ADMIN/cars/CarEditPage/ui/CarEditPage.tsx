import { useTranslation } from 'react-i18next'
import styles from './CarEditPage.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCarById, getCarState, updateCar } from 'entities/Car'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { type Car, type ImageData } from 'entities/Car/model/types/CarSchema'
import { ImageCollage } from 'shared/ui/ImageCollage'

import { Loader } from 'shared/ui/Loader/Loader'
import UploadIcon from 'shared/assets/icons/ImageCollage/UploadIcon.svg'
import DeleteIcon from 'shared/assets/icons/ImageCollage/DeleteIcon.svg'
import {
  type StorageReference,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage'
import { storage } from 'shared/config/firebase/firebase'
import CustomDatePicker from 'shared/ui/CustomDatePicker/CustomDatePicker'

const CarEditPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, result } = useAppSelector(getCarState)
  const navigate = useNavigate()

  const [imageData, setImageData] = useState([])
  const [techPassport, setTechPassport] = useState<ImageData>({
    name: 'techPassport', file: null, url: null, isLoading: false
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm<Car>()

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<Car> = useCallback(async (data) => {
    const updatedImageData = imageData.map(item => {
      const { file, ...rest } = item
      return rest
    })

    const updatedTechPassport = { ...techPassport }
    delete updatedTechPassport.file

    const updatedCarData: Car = {
      tid: id,
      brand: data.brand,
      model: data.model,
      color: data.model,
      numberPlate: data.numberPlate,
      year: data.year,
      status: result.status,
      images: updatedImageData,
      techPassport: updatedTechPassport,
      expenseHistory: result.expenseHistory,
      lastOilChangeDate: data.lastOilChangeDate,
      lastGearChangeDate: data.lastGearChangeDate,
      payment: data.payment,
    }

    dispatch(updateCar(updatedCarData))
    // console.log(imageData)
  }, [result, isLoading, imageData, techPassport])

  useEffect(() => {
    if (!isLoading && result) {
      const {
        brand,
        model,
        color,
        numberPlate,
        year,
        lastOilChangeDate,
        lastGearChangeDate,
        payment
      } = result
      setValue('brand', brand)
      setValue('model', model)
      setValue('color', color)
      setValue('numberPlate', numberPlate)
      setValue('year', year)
      setValue('lastOilChangeDate', lastOilChangeDate)
      setValue('lastGearChangeDate', lastGearChangeDate)
      setValue('payment', payment)
      setImageData(result.images)
      setTechPassport(result.techPassport)
    }
  }, [isLoading, result, setValue])

  useEffect(() => {
    dispatch(getCarById({ tid: id }))
  }, [id])

  const handleDeleteImage = async () => {
    const sureConfirm = window.confirm(t('CreateCar.sureConfirm'))
    if (sureConfirm) {
      if (techPassport.url) {
        const imageRef: StorageReference = ref(storage, techPassport.url)
        try {
          await deleteObject(imageRef)
          setTechPassport(prevState => ({
            ...prevState,
            file: null,
            url: null,
            isLoading: false
          }))
        } catch (error) {
          console.log(error.message, 'error')
        }
      }
    }
  }

  const handleImageChange = (target: HTMLInputElement) => {
    const file = target.files?.[0]
    if (file) {
      const timestamp = new Date().getTime()
      const randomNumber = Math.floor(Math.random() * 10000)
      const fileName = `${timestamp}_${randomNumber}_${file.name}`
      const imageRef = ref(storage, fileName)

      setTechPassport(prevState => ({
        ...prevState,
        isLoading: true
      }))

      uploadBytes(imageRef, file)
        .then(async () => await getDownloadURL(imageRef))
        .then(url => {
          setTechPassport({
            file,
            url,
            isLoading: false,
            name: 'techPassport'
          })
          console.log(techPassport)
        })
        .catch(error => {
          console.log(error.message, 'error')
          setTechPassport(prevState => ({
            ...prevState,
            isLoading: false
          }))
        })
    }
  }

  return (
    <div className={styles.wrapper}>
      <p>{t('createCar')}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder={t('CreateCar.brand')}
          label="brand"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateCar.model')}
          label="model"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateCar.color')}
          label="color"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateCar.numberPlate')}
          label="numberPlate"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateCar.year')}
          label="year"
          register={register}
          required
        />
        <CustomDatePicker
          control={control}
          name='lastOilChangeDate'
          value={result?.lastOilChangeDate}
        />
        <CustomDatePicker
          control={control}
          name='lastGearChangeDate'
          value={result?.lastGearChangeDate}
        />
        <Input
          type="number"
          placeholder={t('CreateCar.payment')}
          label="payment"
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
      <div className={styles.images__container}>
        <div className={styles.car__images}>
          <ImageCollage
            imageData={imageData}
            setImageData={setImageData}
          />
        </div>
      </div>
      <div className={styles.collage__item}>
        {techPassport.isLoading
          ? <Loader />
          : (
            <>
              {
                techPassport.url
                  ? (
                    <DeleteIcon className={styles.delete__icon} onClick={handleDeleteImage} />
                    )
                  : <UploadIcon />
              }
              <input
                className={styles.inputFile}
                type="file"
                onChange={(e) => { handleImageChange(e.target) }}
              />
              {
                techPassport?.url && <img src={techPassport.url} />
              }
            </>
            )}
      </div>
    </div>
  )
}

export default CarEditPage
