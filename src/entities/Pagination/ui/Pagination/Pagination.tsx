import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import styles from './Pagination.module.scss'
import { getPaginationState } from 'entities/Pagination/model/selectors/getPaginationState'
import { paginationActions } from 'entities/Pagination/model/slice/PaginationSlice'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { getCars } from 'entities/Car'
import { getDrivers } from 'entities/Driver'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  collectionName: 'cars' | 'users'
  isLoading: boolean
}

const Pagination: React.FC<PaginationProps> = ({ collectionName, isLoading }) => {
  const dispatch = useAppDispatch()
  // const { isLoading } = useAppSelector(getCarsState)
  const { limit, page, totalPages, lastDoc, firstDoc } = useAppSelector(getPaginationState)
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSearchValue = searchParams.get('search') || ''
  const filterValue = searchParams.get('filter') || ''

  const { t } = useTranslation()

  const handleNextPage = () => {
    dispatch(paginationActions.nextPage())
    if (collectionName === 'users') {
      dispatch(getDrivers({
        limitNumber: limit,
        orderByProp: 'name',
        direction: 'next',
        startAfterDoc: lastDoc,
        searchValue: currentSearchValue,
        filter: filterValue
      }))
    } else if (collectionName === 'cars') {
      dispatch(getCars({
        limitNumber: limit,
        orderByProp: 'brand',
        direction: 'next',
        startAfterDoc: lastDoc,
        searchValue: currentSearchValue,
        filter: filterValue
      }))
    }
  }

  const handlePrevPage = () => {
    dispatch(paginationActions.prevPage())
    if (collectionName === 'users') {
      dispatch(getDrivers({
        limitNumber: limit,
        orderByProp: 'name',
        direction: 'prev',
        endBeforeDoc: firstDoc,
        searchValue: currentSearchValue,
        filter: filterValue
      }))
    } else if (collectionName === 'cars') {
      dispatch(getCars({
        limitNumber: limit,
        orderByProp: 'brand',
        direction: 'prev',
        endBeforeDoc: firstDoc,
        searchValue: currentSearchValue,
        filter: filterValue
      }))
    }
  }

  return (
        <div className={styles.pagination}>
            <Button
                onClick={handlePrevPage}
                disabled={isLoading || page === 1}
                theme={ThemeButton.DEFAULT}
            >
                {t('prev')}
            </Button>
            <p>{page} {t('pageOf')} {totalPages} </p>
            <Button
                onClick={handleNextPage}
                disabled={isLoading || totalPages === page}
                theme={ThemeButton.DEFAULT}
            >
                {t('next')}
            </Button>
        </div>
  )
}

export default Pagination
