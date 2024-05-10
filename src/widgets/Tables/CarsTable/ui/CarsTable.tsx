import styles from './CarsTable.module.scss'
import { type Car } from 'entities/Car/model/types/CarSchema'
import { memo, useCallback, useMemo, useState } from 'react'
import { db } from 'shared/config/firebase/firebase'
import { CarsTableCell } from 'widgets/Tables/CarsTableCell'
import { useTranslation } from 'react-i18next'
import Search from 'shared/ui/Search/ui/Search'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { deleteCar } from 'entities/Car/model/services/deleteCar/deleteCar'
import { useSearchParams } from 'react-router-dom'
import { paginationActions } from 'entities/Pagination/model/slice/PaginationSlice'
import { getCars } from 'entities/Car'
import { getPaginationState } from 'entities/Pagination/model/selectors/getPaginationState'
import FilterSelect from 'shared/ui/FilterSelect/ui/FilterSelect'

interface CarsTableProps {
  data: Car[]
}

const CarsTable: React.FC<CarsTableProps> = memo(({ data }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { limit } = useAppSelector(getPaginationState)

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
      dispatch(getCars({
        limitNumber: limit,
        orderByProp: 'brand',
        searchValue: currentSearchValue
      }))
        .then(() => {
          dispatch(paginationActions.setPage(1))
        })
    }, 300)
  }, [currentSearchValue])

  const handleFilterChange = () => {
    dispatch(getCars({
      limitNumber: limit,
      orderByProp: 'brand',
      filter: filterValue
    }))
  }

  useMemo(() => {
    handleFilterChange()
  }, [filterValue])

  const onDelete = useCallback((
    car: Car
  ) => {
    const res = window?.confirm(`Вы действительно хотите удалить машину ${car.brand} ${car.model}?`)
    if (res) {
      dispatch(deleteCar({ car }))
        .then(() => { window?.location?.reload() })
    }
  }, [db])

  return (
        <div className={styles.wrapper}>
            <div className={styles.table__options}>
                <FilterSelect />
                <Search value={currentSearchValue} changeHandler={onChangeSearchValue} />
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
