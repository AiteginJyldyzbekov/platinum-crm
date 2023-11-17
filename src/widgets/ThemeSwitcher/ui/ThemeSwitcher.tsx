import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ThemeSwitcher.module.scss"
import { useTheme } from "app/providers/ThemeProvider";
import LightIcon from "shared/assets/icons/ThemeSwitcher/light.svg";
import DarkIcon from "shared/assets/icons/ThemeSwitcher/dark.svg";
import { Theme } from "app/providers/ThemeProvider";
import { Button, ThemeButton } from "shared/ui/Button/Button";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.ClEAR}
            className={classNames(styles.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    )
}