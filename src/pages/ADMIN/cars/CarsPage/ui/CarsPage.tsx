import { useTranslation } from 'react-i18next'

const CarsPage = () => {
  const { t } = useTranslation()
  return (
    <div>{t('CarsPage')}</div>
  )
}

export default CarsPage
