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
import { useEffect, useState } from 'react'
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
                    onChange={(e) => { handleImageChange(index, e.target) }}
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
