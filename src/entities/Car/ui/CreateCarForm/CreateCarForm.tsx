import { useTranslation } from 'react-i18next'
import styles from './CreateCarForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { createCar } from 'entities/Car/model/services/createCar/createCar'
import { getCreateCarState } from 'entities/Car/model/selectors/getCreateCarState'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { ImageCollage } from 'shared/ui/ImageCollage'
import { type Car, type ImageData } from 'entities/Car/model/types/CarSchema'
import UploadIcon from 'shared/assets/icons/ImageCollage/UploadIcon.svg'
import DeleteIcon from 'shared/assets/icons/ImageCollage/DeleteIcon.svg'
import { Loader } from 'shared/ui/Loader/Loader'
import {
  type StorageReference,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage'
import { storage } from 'shared/config/firebase/firebase'
import { classNames } from 'shared/lib/classNames/classNames'
import DatePicker from 'react-multi-date-picker'

export const CreateCarForm = memo(() => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Car>()

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading } = useAppSelector(getCreateCarState)

  const [imageData, setImageData] = useState<ImageData[]>([
    { name: 'front', file: null, url: null, isLoading: false },
    { name: 'back', file: null, url: null, isLoading: false },
    { name: 'right', file: null, url: null, isLoading: false },
    { name: 'left', file: null, url: null, isLoading: false },
    { name: 'frontInside', file: null, url: null, isLoading: false },
    { name: 'backInside', file: null, url: null, isLoading: false }
  ])

  const [techPassport, setTechPassport] = useState<ImageData>({
    name: 'techPassport', file: null, url: null, isLoading: false
  })

  const handleImageChange = (target: HTMLInputElement) => {
    const file = target.files?.[0]
    if (file) {
      const imageRef = ref(storage, file.name)

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

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<Car> = useCallback(async (data) => {
    const {
      brand,
      model,
      color,
      numberPlate,
      year,
      lastOilChangeDate,
      lastGearChangeDate
    } = data

    const updatedImageData = imageData.map(item => {
      const { file, ...rest } = item
      return rest
    })

    const updatedTechPassport = { ...techPassport }
    delete updatedTechPassport.file

    dispatch(createCar({
      brand,
      model,
      color,
      numberPlate,
      year,
      lastOilChangeDate: lastOilChangeDate.format?.("D/MM/YYYY"),
      lastGearChangeDate: lastGearChangeDate.format?.("D/MM/YYYY"),
      images: updatedImageData,
      techPassport: updatedTechPassport,
      expenseHistory: [],
    })).then(() => {
      if (!isLoading) {
        navigate('/cars')
      }
    })
  }, [dispatch, techPassport])

  return (
    <div className={styles.wrapper}>
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
        <Controller
          control={control}
          name="lastOilChangeDate"
          rules={{ required: true }}
          render={({
            field: { onChange, name, value },
            fieldState: { invalid, isDirty },
            formState: { errors },
          }) => (
            <>
              <DatePicker
                format={"D/MM/YYYY"}
                onChange={(date) => {
                  onChange(date);
                }}
              />
              {errors && errors[name] && errors[name].type === "required" && (
                <span>your error message !</span>
              )}
            </>
          )}
        />
         <Controller
          control={control}
          name="lastGearChangeDate"
          rules={{ required: true }}
          render={({
            field: { onChange, name, value },
            fieldState: { invalid, isDirty },
            formState: { errors },
          }) => (
            <>
              <DatePicker
                format={"D/MM/YYYY"}
                onChange={(date) => {
                  onChange(date);
                }}
              />
              {errors && errors[name] && errors[name].type === "required" && (
                <span>your error message !</span>
              )}
            </>
          )}
        />
        <div className={styles.addButton__container}>
          <Button
            theme={ThemeButton.OUTLINE}
            type='submit'
            clasName={classNames(styles.addButton, {}, [])}
          >
            {t('Add')}
          </Button>
        </div>
      </form>
      <div className={styles.images__container}>
        <div className={styles.car__images}>
          <ImageCollage imageData={imageData} setImageData={setImageData} />
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
})
