import { useTranslation } from 'react-i18next'
import styles from './CreateCar.module.scss'
import { CreateCarForm } from 'entities/Car/ui/CreateCarForm/CreateCarForm'

const CreateCarPage = () => {
  const { t } = useTranslation()
  return (
        <div className={styles.wrapper}>
            <CreateCarForm />
        </div>
  )
}

export default CreateCarPage
