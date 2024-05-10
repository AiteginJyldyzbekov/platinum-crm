import styles from './DriversTable.module.scss'
import { memo, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Search from 'shared/ui/Search/ui/Search'
import { DriversTableCell } from 'widgets/Tables/DriversTableCell'
import { type Driver } from 'entities/Driver/model/types/driverSchema'
import { deleteDriver, getDrivers } from 'entities/Driver'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { getPaginationState } from 'entities/Pagination/model/selectors/getPaginationState'
import { paginationActions } from 'entities/Pagination/model/slice/PaginationSlice'
import { useSearchParams } from 'react-router-dom'
import FilterSelect from 'shared/ui/FilterSelect/ui/FilterSelect'

interface DriversTableProps {
  data: Driver[]
}

const DriversTable: React.FC<DriversTableProps> = memo(({ data }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { limit } = useAppSelector(getPaginationState)
  const { lastDoc, firstDoc } = useAppSelector(getPaginationState)

  const [searchValue, setSearchValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSearchValue = searchParams.get('search') || ''
  const filterValue = searchParams.get('filter') || ''

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useMemo(() => {
    setSearchParams({ search: searchValue })
  }, [searchValue])

  useMemo(() => {
    setTimeout(() => {
      dispatch(getDrivers({
        limitNumber: limit,
        orderByProp: 'name',
        searchValue: currentSearchValue
      }))
        .then(() => {
          dispatch(paginationActions.setPage(1))
        })
    }, 300)
  }, [currentSearchValue])

  const handleFilterChange = () => {
    dispatch(getDrivers({ limitNumber: limit, orderByProp: 'name', filter: filterValue }))
  }

  useMemo(() => {
    handleFilterChange()
  }, [filterValue])

  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    driver: Driver
  ) => {
    e.stopPropagation()
    const res = window?.confirm(`Вы действительно хотите удалить водителя ${driver.name}?`)
    if (res) {
      dispatch(deleteDriver({ driver }))
        .then(() => { window.location.reload() })
    }
  }

  return (
        <div className={styles.wrapper}>
            <div className={styles.table__options}>
                {/* <Button
                    clasName={classNames(styles.options__btn, {}, [])}
                    theme={ThemeButton.CLEAR}
                >
                    <ParametersIcon />
                    <p>{t('CarsTable.otherOptions')}</p>
                </Button> */}
                <FilterSelect />
                <Search value={currentSearchValue} changeHandler={onChangeSearchValue} />
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
                    {data.map((el: Driver, index) => (
                        <DriversTableCell
                            key={`${el.tid}_${el.name}`}
                            driver={el}
                            index={index}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
                {/* <Pagination /> */}
            </table>
        </div>
  )
})

export default DriversTable
