import { Link, useLocation } from 'react-router-dom'
import styles from './SidebarCards.module.scss'
import { type SideBarLink } from 'widgets/Sidebar/constants'
import { useTranslation } from 'react-i18next'
import Arrow from 'shared/assets/icons/Sidebar/arrow.svg'
import ActiveArrow from 'shared/assets/icons/Sidebar/arrow_active.svg'

interface SidebarCardProps {
  roleData: SideBarLink[]
  collapsed: boolean
}

export const SidebarCards: React.FC<SidebarCardProps> = ({ roleData, collapsed }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const path = `/${location.pathname.split('/')[1]}`

  return (
    <div className={styles.card__wrapper}>
      {
        roleData.map((el) => (
          <Link
            to={el.path}
            className={el.path === path ? styles.card_active : styles.card}
            key={`${el.title}_${el.path}`}
          >
            <div className={styles.left__content}>
              {el.path === path ? <el.activeIcon /> : <el.icon />}
              <p
                className={collapsed ? styles.card__title : styles.card__title_hide}>
                {t(`Sidebar.${el.title}`)}
              </p>
            </div>
            <div className={!collapsed && styles.card__arrow_hide}>
              {el.path === path ? <ActiveArrow /> : <Arrow />}
            </div>
          </Link>
        ))
      }
    </div>
  )
}
