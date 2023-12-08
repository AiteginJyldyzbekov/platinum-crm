import { BugButton } from 'app/providers/ErrorBoundary'
// import { Counter } from 'entities/Counter'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <BugButton />
      {/* <Counter /> */}
      {t('test')}
    </div>
  )
}

export default MainPage
