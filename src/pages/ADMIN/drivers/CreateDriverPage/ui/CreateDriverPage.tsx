import { useTranslation } from 'react-i18next'
import styles from './CreateDriverPage.module.scss'
import { CreateDriverForm } from 'features/CreateDriver'

const CreateDriverPage = () => {
  const { t } = useTranslation()
  return (
        <div className={styles.wrapper}>
            <CreateDriverForm />
        </div>
  )
}

export default CreateDriverPage
