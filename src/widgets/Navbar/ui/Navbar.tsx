import { useTranslation } from 'react-i18next'

export const Navbar = () => {
  const { t } = useTranslation()
  return (
    <div>
      <p>{t('Navbar')}</p>
    </div>
  )
}
