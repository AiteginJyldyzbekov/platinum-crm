import { useState } from 'react'
import styles from './FilterSelect.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const FilterSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterValue = searchParams.get('filter') || ''
  const [isActive, setIsActive] = useState(false)

  const { t } = useTranslation()

  const options = ['free', 'atWork', 'atRepair']

  const handleFilterChange = (status: string) => {
    setSearchParams({ filter: status })
    setIsActive(!isActive)
  }

  return (
        <div className={styles.filterSelect}>
            <button
                className={`${styles.filterSelect__button} ${isActive && styles.active}`}
                onClick={() => { setIsActive(!isActive) }}
            >
                {filterValue || 'Status'}
            </button>
            <div className={`${styles.filterSelect__options} ${isActive && styles.active}`}>
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={styles.filterSelect__option}
                        onClick={() => { handleFilterChange(option) }}
                    >
                        {option}
                    </div>
                ))}
                <div
                    className={styles.filterSelect__option}
                    onClick={() => { handleFilterChange('') }}
                >
                    {t('FilterSelect.reset')}
                </div>
            </div>
        </div>
  )
}

export default FilterSelect
