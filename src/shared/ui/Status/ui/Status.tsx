import { useTranslation } from 'react-i18next'
import styles from './Status.module.scss'

interface StatusProps {
  status: string
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const { t } = useTranslation()
  const statusClassname = `${styles.status} ${styles[status]}`

  return (
    <div className={statusClassname}>
      <p>{t(`Status.${status}`)}</p>
    </div>
  )
}

export default Status
