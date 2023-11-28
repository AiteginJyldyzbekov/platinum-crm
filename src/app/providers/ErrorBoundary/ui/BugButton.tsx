import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
  const [error, setError] = useState(false)
  const { t } = useTranslation()

  const toggleThrow = () => { setError(true) }

  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  return (
        <Button onClick={toggleThrow}>{t('through_error')}</Button>
  )
}
