import { useTranslation } from 'react-i18next'
import styles from './CreateDriverForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { createDriver } from '../../model/services/createDriver/createDriver'
import { useNavigate } from 'react-router-dom'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { getCreateDriverState } from 'entities/Driver/model/selectors/getCreateDriverState'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { type ImageData } from 'entities/Car/model/types/CarSchema'
import {
  type StorageReference,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage'
import { storage } from 'shared/config/firebase/firebase'
import { Loader } from 'shared/ui/Loader/Loader'
import DeleteIcon from 'shared/assets/icons/ImageCollage/DeleteIcon.svg'
import UploadIcon from 'shared/assets/icons/ImageCollage/UploadIcon.svg'
import { type Driver } from 'entities/Driver/model/types/driverSchema'
import { Select } from 'shared/ui/Select'
import { getCarsState } from 'entities/Car'

export const CreateDriverForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Driver>()

  const { isLoading } = useAppSelector(getCreateDriverState)
  const { result } = useAppSelector(getCarsState)
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [imageDataChanged, setImageDataChanged] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>()

  const [imageData, setImageData] = useState<ImageData[]>([
    { name: 'document', file: null, url: null, isLoading: false },
    { name: 'avatar', file: null, url: null, isLoading: false }
  ])

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<Driver> = useCallback(async (data) => {
    const {
      email,
      password,
      name,
      lastName,
      phoneNumber,
      car,
      weekendDates,
      startRentDate
    } = data

    const updatedImageData = imageData.map(item => {
      const { file, ...rest } = item
      return rest
    })

    dispatch(createDriver({
      email,
      password,
      name,
      lastName,
      phoneNumber,
      images: updatedImageData,
      balance: 0,
      startRentDate: '',
      weekendDates: [{ weekends: ['we'], month: '' }],
      car
    })).then(() => {
      if (!isLoading) {
        navigate('/drivers')
      }
    })
  }, [dispatch])

  const handleImageChange = (index: number, target: HTMLInputElement) => {
    const newImageData = [...imageData]
    const file = target.files?.[0]
    if (file) {
      newImageData[index].file = file
      setImageData(newImageData)
      setImageDataChanged(true)
      setCurrentIndex(index)
    }
  }

  const handleDeleteImage = async (index: number) => {
    const imageToDelete = imageData[index]
    const sureConfirm = window.confirm(t('CreateCar.sureConfirm'))
    if (sureConfirm) {
      if (imageToDelete.url) {
        const imageRef: StorageReference = ref(storage, imageToDelete.url)
        try {
          await deleteObject(imageRef)
          const newImageData = [...imageData]
          newImageData[index] = { ...newImageData[index], file: null, url: null, isLoading: false }
          setImageData(newImageData)
          console.log(imageData)
        } catch (error) {
          console.log(error.message, 'error')
        }
      }
    }
  }

  useEffect(() => {
    if (imageDataChanged) {
      imageData.forEach((item, index) => {
        if (item.file && !item.isLoading) {
          const imageRef = ref(storage, item.file.name)
          const newImageData = [...imageData]
          newImageData[currentIndex].isLoading = true
          setImageData(newImageData)

          uploadBytes(imageRef, item.file)
            .then(async () => await getDownloadURL(imageRef))
            .then((url) => {
              const updatedImageData = [...imageData]
              updatedImageData[currentIndex].url = url
              updatedImageData[currentIndex].isLoading = false
              setImageData(updatedImageData)
            })
            .catch((error) => {
              console.log(error.message, 'error')
            })
        }
      })
      setImageDataChanged(false)
    }
  }, [imageDataChanged, imageData])

  const renderImages = useMemo(() => {
    return imageData.map((item, index) => (
      <div className={styles.image__container} key={item.url}>
        {
          item.isLoading
            ? <Loader />
            : (
              <>
                {
                  item.url
                    ? (
                      <DeleteIcon
                        className={styles.delete__icon}
                        onClick={async () => {
                          await handleDeleteImage(index)
                        }} />
                      )
                    : <UploadIcon />
                }
                <input
                  className={styles.inputFile}
                  type="file"
                  onChange={(e) => { handleImageChange(index, e.target) }}
                />
                {
                  item?.url && <img src={item.url} />
                }
              </>
              )
        }
      </div>
    ))
  }, [imageData])

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderImages}
        <Input
          type="text"
          placeholder={t('CreateDrivers.name')}
          label="name"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateDrivers.lastName')}
          label="lastName"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateDrivers.phoneNumber')}
          label="phoneNumber"
          register={register}
          required
        />
        <Select data={result} />
        <Input
          type="text"
          placeholder={t('CreateDrivers.email')}
          label="email"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateDrivers.password')}
          label="password"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateDrivers.startRentDate')}
          label="startRentDate"
          register={register}
          required
        />
        <Input
          type="text"
          placeholder={t('CreateDrivers.weekends')}
          label="weekends"
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
