import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Sidebar.module.scss'
import { useState } from 'react'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { Button } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { getUserAuthData, userActions } from 'entities/User'
import { useNavigate } from 'react-router-dom'
import { SidebarCard } from '../SidebarCard/SidebarCard'
import { UserRole } from 'app/providers/router/types'
import { admin, driver } from 'widgets/Sidebar/constants'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { authData } = useAppSelector(getUserAuthData)
  const roleData = authData?.role === UserRole.admin ? admin : driver
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  const onLogout = () => {
    dispatch(userActions.logout())
    navigate('/')
  }

  return (
    <div data-testid="sidebar" className={
      classNames(
        styles.Sidebar,
        { [styles.collapsed]: collapsed },
        [className]
      )}>
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}>
        {t('toggle')}
      </Button>
      <SidebarCard roleData={roleData} />
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} />
        <Button onClick={onLogout}>{t('logout')}</Button>
      </div>
    </div>
  )
}
