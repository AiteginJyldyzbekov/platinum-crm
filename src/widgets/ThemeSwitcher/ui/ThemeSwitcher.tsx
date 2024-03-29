import styles from './ThemeSwitcher.module.scss'
import { useTheme } from 'app/providers/ThemeProvider'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      <input type='checkbox' checked={theme === 'dark'} />
      <label />
    </div>
  )
}
