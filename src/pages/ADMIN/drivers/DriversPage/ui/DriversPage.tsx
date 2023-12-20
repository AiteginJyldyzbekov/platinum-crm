import { useTranslation } from 'react-i18next'
import styles from './DriversPage.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Link } from 'react-router-dom'

const DriversPage = () => {
  const { t } = useTranslation()
  return (
        <div className={styles.wrapper}>
            <div className={styles.page__header}>
                <p>{t('DriversPage')}</p>
                <Link to={'/create-driver'}>
                    <Button theme={ThemeButton.OUTLINE}>{t('add')}</Button>
                </Link>
            </div>
            <div className={styles.table__content}>
                <div className={styles.table__header}>
                    <p>{t('name')}</p>
                    <p>{t('lastname')}</p>
                    <p>{t('surname')}</p>
                    <p>{t('phoneNumber')}</p>
                    <p>{t('action')}</p>
                </div>
                <div className={styles.table__rows}>
                    <div className={styles.table__row}>
                        <p>{t('name')}</p>
                        <p>{t('lastname')}</p>
                        <p>{t('surname')}</p>
                        <p>{t('phoneNumber')}</p>
                        <Button theme={ThemeButton.OUTLINE}>
                            <p>{t('delete')}</p>
                        </Button>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default DriversPage
