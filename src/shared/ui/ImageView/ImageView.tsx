import { PhotoProvider, PhotoView } from "react-photo-view";
import styles from "./ImageView.module.scss"
import { ImageData } from "entities/Car/model/types/CarSchema";
import ViewIcon from "shared/assets/icons/ImageView/ViewIcon.svg"

interface ImageViewProps {
    image: ImageData;
}

const ImageView: React.FC<ImageViewProps> = ({ image }) => {
    return (
            <PhotoProvider>
                <PhotoView src={image?.url}>
                    <div className={styles.image}>
                        <img
                            src={image?.url}
                            alt={`Collage Image`}
                        />
                        <ViewIcon className={styles.view__icon} />
                    </div>
                </PhotoView>
            </PhotoProvider>
    )
}

export default ImageView;