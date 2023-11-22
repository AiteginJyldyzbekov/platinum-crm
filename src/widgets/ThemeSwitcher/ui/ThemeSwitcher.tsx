import { classNames } from 'shared/lib/classNames/classNames'
import styles from './ThemeSwitcher.module.scss'
import { useTheme, Theme } from 'app/providers/ThemeProvider'
import LightIcon from 'shared/assets/icons/ThemeSwitcher/light.svg'
import DarkIcon from 'shared/assets/icons/ThemeSwitcher/dark.svg'

import { Button, ThemeButton } from 'shared/ui/Button/Button'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme()

  return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames(styles.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
  )
}
