import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Sidebar.module.scss'
import { useState } from 'react'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { Button } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  const onLogout = () => {
    dispatch(userActions.logout())
    navigate('/login')
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
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} />
        <Button onClick={onLogout}>{t('logout')}</Button>
      </div>
    </div>
  )
}
