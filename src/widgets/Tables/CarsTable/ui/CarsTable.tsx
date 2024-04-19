import styles from './CarsTable.module.scss'
import { type Car } from 'entities/Car/model/types/CarSchema'
import { memo, useCallback, useState } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { CarsTableCell } from 'widgets/Tables/CarsTableCell'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { classNames } from 'shared/lib/classNames/classNames'
import ParametersIcon from 'shared/assets/icons/Table/parameters__icon.svg'
import Search from 'shared/ui/Search/ui/Search'

interface CarsTableProps {
    data: Car[]
}

const CarsTable: React.FC<CarsTableProps> = memo(({ data }) => {
    const { t } = useTranslation()
    const [searchValue, setSearchValue] = useState('')

    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onDelete = useCallback((
        tid: string,
        car: string,
        driver: string
    ) => {
        const res = window?.confirm('Вы действительно хотите удалить машину ' + car + '?')
        if (res) {
            deleteDoc(doc(db, 'cars', tid)).then(() => {
                window?.location?.reload()
            })

            if (driver) {
                const driverRef = doc(db, "users", driver)
                updateDoc(driverRef, { status: "free", car: null })
            }
        }
    }, [db])

    return (
        <div className={styles.wrapper}>
            <div className={styles.table__options}>
                <Button
                    clasName={classNames(styles.options__btn, {}, [])}
                    theme={ThemeButton.CLEAR}
                >
                    <ParametersIcon />
                    <p>{t('CarsTable.otherOptions')}</p>
                </Button>
                <Search value={searchValue} changeHandler={onChangeSearchValue} />
            </div>
            <table>
                <thead className={styles.table__header}>
                    <tr>
                        <th className={styles.id}>
                            <p>{t('CarsTable.id')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.carbrand')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.status')}</p>
                        </th>
                        <th className={styles.description}>
                            <p>{t('CarsTable.description')}</p>
                        </th>
                        <th className={styles.driver}>
                            <p>{t('CarsTable.driver')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.oilDate')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.edit')}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((el: Car, index) => (
                        <CarsTableCell
                            key={el.tid}
                            car={el}
                            index={index}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
})

export default CarsTable
