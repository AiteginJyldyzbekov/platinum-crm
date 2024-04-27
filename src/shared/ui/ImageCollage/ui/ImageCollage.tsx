import styles from './ImageCollage.module.scss'
import UploadIcon from 'shared/assets/icons/ImageCollage/UploadIcon.svg'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  type StorageReference,
  deleteObject
} from 'firebase/storage'
import { storage } from 'shared/config/firebase/firebase'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DeleteIcon from 'shared/assets/icons/ImageCollage/DeleteIcon.svg'
import { Loader } from 'shared/ui/Loader/Loader'
import { type ImageData } from 'entities/Car/model/types/CarSchema'

interface ImageCollageProps {
  imageData: ImageData[]
  setImageData: React.Dispatch<React.SetStateAction<ImageData[]>>
}

const ImageCollage: React.FC<ImageCollageProps> = ({ imageData, setImageData }) => {
  const { t } = useTranslation()

  const [imageDataChanged, setImageDataChanged] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>()

  // const handleImageChange = (index: number, target: HTMLInputElement) => {
  //   const newImageData = [...imageData];
  //   const file = target.files?.[0];
  //   if (file) {
  //     const newDataItem = { ...newImageData[index] }; // Создаем глубокую копию объекта
  //     newDataItem.file = file;
  //     newImageData[index] = newDataItem; // Заменяем элемент в массиве новым объектом
  //     setImageData(newImageData);
  //     setImageDataChanged(true);
  //     setCurrentIndex(index);
  //   }
  //   console.log(imageData);
  // }
  const handleImageChange = (index: number, file: File) => {
    const newImageData = [...imageData]
    newImageData[index].file = file
    setImageData(newImageData)
    setImageDataChanged(true)
    uploadImages(index)
  }

  const uploadImages = async (index: number) => {
    const item = imageData[index]
    if (item.file && !item.isLoading) {
      const timestamp = new Date().getTime()
      const randomNumber = Math.floor(Math.random() * 10000)
      const fileName = `${timestamp}_${randomNumber}_${item.file.name}`
      const imageRef = ref(storage, fileName)

      try {
        const newImageData = [...imageData]
        newImageData[index].isLoading = true
        setImageData(newImageData)

        await uploadBytes(imageRef, item.file)
        const url = await getDownloadURL(imageRef)

        setImageData((prevImageData) => {
          const updatedImageData = [...prevImageData]
          updatedImageData[index].url = url
          updatedImageData[index].isLoading = false
          return updatedImageData
        })
      } catch (error) {
        console.log(error.message, 'error')
        const newImageData = [...imageData]
        newImageData[index].isLoading = false
        setImageData(newImageData)
      }
    }
    setImageDataChanged(false)
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

  return (
    <div className={styles.collage}>
      {imageData.map((item, index) => (
        <>
          <div className={styles.collage__item}>
            {item.isLoading
              ? <Loader />
              : (
                <>
                  {
                    item.url
                      ? (
                        <DeleteIcon
                          className={styles.delete__icon}
                          onClick={() => {
                            handleDeleteImage(index)
                          }} />
                        )
                      : <UploadIcon />
                  }
                  <input
                    className={styles.inputFile}
                    key={index}
                    type="file"
                    onChange={(e) => { handleImageChange(index, e.target.files?.[0]) }}
                  />
                  {
                    item?.url && <img src={item.url} />
                  }
                </>
                )}
          </div>
        </>
      ))}
    </div>
  )
}

export default ImageCollage
