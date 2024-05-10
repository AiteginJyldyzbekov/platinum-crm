import { useTranslation } from 'react-i18next'
import styles from './Search.module.scss'
import SearchIcon from 'shared/assets/icons/Table/search__icon.svg'

interface SearchProps {
  value: string
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<SearchProps> = ({ value, changeHandler }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.search}>
      <SearchIcon />
      <input
        type="text"
        value={value}
        onChange={changeHandler}
        placeholder={t('search')}
      />
    </div>
  )
}

export default Search
