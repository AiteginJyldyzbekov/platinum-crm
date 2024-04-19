import { useTranslation } from 'react-i18next'
import styles from './CreateDriverForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { createDriver } from '../../model/services/createDriver/createDriver'
import { useNavigate } from 'react-router-dom'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { getCreateDriverState } from 'entities/Driver/model/selectors/getCreateDriverState'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { type Car, type ImageData } from 'entities/Car/model/types/CarSchema'
import {
  type StorageReference,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage'
import { db, storage } from 'shared/config/firebase/firebase'
import { Loader } from 'shared/ui/Loader/Loader'
import DeleteIcon from 'shared/assets/icons/ImageCollage/DeleteIcon.svg'
import UploadIcon from 'shared/assets/icons/ImageCollage/UploadIcon.svg'
import { type Driver } from 'entities/Driver/model/types/driverSchema'
import { Select } from 'shared/ui/Select'
import { getCars, getCarsState } from 'entities/Car'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"

export const CreateDriverForm = memo(() => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Driver>()

  const { isLoading } = useAppSelector(getCreateDriverState)
  const { result, isLoading: carsLoading } = useAppSelector((getCarsState))
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [imageDataChanged, setImageDataChanged] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>()

  const [car, setCar] = useState<string>('')

  const [imageData, setImageData] = useState<ImageData[]>([
    { name: 'document', file: null, url: null, isLoading: false },
    { name: 'avatar', file: null, url: null, isLoading: false }
  ])

  useEffect(() => {
    dispatch(getCars())
  }, [dispatch])

  /* eslint-disable @typescript-eslint/no-misused-promises */
  const onSubmit: SubmitHandler<Driver> = useCallback(async (data) => {
    const {
      email,
      password,
      name,
      lastName,
      phoneNumber,
      weekendDates,
      startRentDate
    } = data

    const formattedWeekendDates = weekendDates.map((date: any) => date?.format?.("D/MM/YYYY"));
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
      startRentDate: startRentDate?.format?.("D/MM/YYYY"),
      weekendDates: formattedWeekendDates,
      car,
    })).then(() => {
      if (!isLoading) {
        navigate('/drivers');
      }
    })
  }, [dispatch, car])

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
      for (let index = 0; index < imageData.length; index++) {
        const item = imageData[index];
        if (item.file && !item.isLoading) {
          const imageRef = ref(storage, item.file.name);
          const newImageData = [...imageData];
          newImageData[index].isLoading = true;
          setImageData(newImageData);
  
          uploadBytes(imageRef, item.file)
            .then(async () => await getDownloadURL(imageRef))
            .then((url) => {
              const updatedImageData = [...imageData];
              updatedImageData[index].url = url;
              updatedImageData[index].isLoading = false;
              setImageData(updatedImageData);
            })
            .catch((error) => {
              console.log(error.message, 'error');
            });
        }
      }
      setImageDataChanged(false);
    }
  }, [imageDataChanged, imageData]);

  const renderImages = useMemo(() => {
    return imageData.map((item, index) => (
      <div className={styles.image__container} key={`${item.url}_${index}`}>
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

  if (carsLoading) return <Loader />

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
        <Select data={result} setState={setCar} />
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
        <Controller
          control={control}
          name="weekendDates"
          rules={{ required: true }}
          render={({
            field: { onChange, name, value },
            fieldState: { invalid, isDirty },
            formState: { errors },
          }) => (
            <>
              <DatePicker
                multiple
                format={"MM/DD/YYYY"}
                onChange={(date) => {
                  onChange(date);
                }}
                plugins={[
                  <DatePanel />
                ]}
              />
              {errors && errors[name] && errors[name].type === "required" && (
                <span>your error message !</span>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="startRentDate"
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
