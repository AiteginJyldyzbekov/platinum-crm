import styles from './DriversTable.module.scss'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { classNames } from 'shared/lib/classNames/classNames'
import ParametersIcon from 'shared/assets/icons/Table/parameters__icon.svg'
import Search from 'shared/ui/Search/ui/Search'
import { DriversTableCell } from 'widgets/Tables/DriversTableCell'
import { type Driver } from 'entities/Driver/model/types/driverSchema'
import { deleteDriver } from 'entities/Driver'
import { useAppDispatch } from 'shared/lib/reduxHooks'

interface DriversTableProps {
  data: Driver[]
}

const DriversTable: React.FC<DriversTableProps> = memo(({ data }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    name: string,
    tid: string,
    email: string,
    password: string
  ) => {
    e.stopPropagation()
    const res = window?.confirm(`Вы действительно хотите удалить водителя ${name}?`)
    if (res) {
      dispatch(deleteDriver({ tid, email, password }))
    }
  }

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
                        <th className={styles.driver}>
                            <p>{t('CarsTable.driver')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.status')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.phoneNumber')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.carbrand')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.dateRent')}</p>
                        </th>
                        <th>
                            <p>{t('CarsTable.edit')}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((el: Driver) => (
                        <DriversTableCell
                            key={`${el.tid}_${el.name}`}
                            driver={el}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
  )
})

export default DriversTable
