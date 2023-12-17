import { BugButton } from 'app/providers/ErrorBoundary'
import { useTranslation } from 'react-i18next'
import { Sidebar } from 'widgets/Sidebar'

const MainPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Sidebar />
      <BugButton />
      {t('test')}
    </div>
  )
}

export default MainPage
