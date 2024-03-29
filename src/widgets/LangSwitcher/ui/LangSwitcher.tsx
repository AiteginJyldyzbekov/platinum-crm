import { useTranslation } from 'react-i18next'
import styles from './LangSwitcher.module.scss'
import CloudIcon from 'shared/assets/icons/LangSwitcher/cloud_icon.svg'

interface LangSwitcherProps {
  className?: string
}

const LangSwitcher: React.FC<LangSwitcherProps> = () => {
  const { t, i18n } = useTranslation()
  const langText = i18n.language === 'ru' ? 'en' : 'ru'

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <div
      className={styles.LangSwitcher}
      onClick={toggle}>
      <CloudIcon />
      <p className={styles.text}>
        {t(`LangSwitcher.${langText}`)}
      </p>
    </div>
  )
}

export default LangSwitcher
