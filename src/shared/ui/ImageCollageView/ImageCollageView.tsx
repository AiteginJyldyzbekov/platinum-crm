import styles from './ImageCollageView.module.scss'
import { type ImageData } from 'entities/Car/model/types/CarSchema'
import ViewIcon from 'shared/assets/icons/ImageView/ViewIcon.svg'
import { PhotoProvider, PhotoView } from 'react-photo-view'

interface ImageViewProps {
  images: ImageData[]
}
const ImageCollageView: React.FC<ImageViewProps> = ({ images }) => {
  const renderImages = () => {
    return images?.map((image, index) => (
            <PhotoView src={image.url} key={image.url}>
                <div className={styles.collage__item}>
                    <img
                        key={index}
                        src={image.url}
                        alt={`Collage Image ${index + 1}`}
                    />
                    <ViewIcon className={styles.view__icon} />
                </div>
            </PhotoView>
    ))
  }

  return (
        <div className={styles.collage}>
            <PhotoProvider>
                {renderImages()}
            </PhotoProvider>
        </div>
  )
}

export default ImageCollageView
