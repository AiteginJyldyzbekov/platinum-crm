import { Link } from 'react-router-dom'
import styles from './SidebarCard.module.scss'
import { type SideBarLink } from 'widgets/Sidebar/constants'
import { useTranslation } from 'react-i18next'

interface SidebarCardProps {
  roleData: SideBarLink[]
}

export const SidebarCard: React.FC<SidebarCardProps> = ({ roleData }) => {
  const { t } = useTranslation()
  return (
        <div className={styles.card__wrapper}>
            {
                roleData.map((el) => (
                    <Link to={el.path} className={styles.card}>
                        <p>{t(el.title)}</p>
                    </Link>
                ))
            }
        </div>
  )
}
