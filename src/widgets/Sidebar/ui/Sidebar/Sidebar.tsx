import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Sidebar.module.scss'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getUserAuthData } from 'entities/User'
import { SidebarCards } from '../SidebarCard/SidebarCards'
import { UserRole } from 'app/providers/router/types'
import { admin, driver } from 'widgets/Sidebar/constants'
import { useAppSelector } from 'shared/lib/reduxHooks'
import Logo from '../../images/logo.svg'
import ArrowDown from '../../images/arrow_down.svg'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { authData } = useAppSelector(getUserAuthData)

  const roleData = authData?.role === UserRole.admin ? admin : driver

  const { t } = useTranslation()

  return (
    <div data-testid="sidebar" className={
      classNames(
        styles.Sidebar,
        { [styles.collapsed]: !collapsed },
        [className]
      )}
      onMouseEnter={() => { setCollapsed(true) }}
      onMouseLeave={() => { setCollapsed(false) }}
    >
      <div className={styles.sidebar__content_top}>
        <div className={styles.logo}>
          <Logo />
          <p className={styles.logo__title}>{t('Sidebar.dashboard')}</p>
        </div>
        <SidebarCards roleData={roleData} collapsed={collapsed} />
      </div>
      <div className={styles.sidebar__content_bottom}>
        <div className={styles.user__info}>
          <div className={styles.avatar}></div>
          <div className={styles.text}>
            <p className={styles.name}>{t('Sidebar.name')}</p>
            <p className={styles.email}>{t('Sidebar.email')}</p>
          </div>
        </div>
        <ArrowDown />
      </div>
    </div>
  )
}
