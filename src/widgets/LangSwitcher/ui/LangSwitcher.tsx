import { useTranslation } from "react-i18next"
import styles from "./LangSwitcher.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ThemeButton } from "shared/ui/Button/Button";

interface LangSwitcherProps {
    className?: string;
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({ className }) => {
    const { t, i18n } = useTranslation()

    const toggle = () => {
        i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
    }

    return (
            <Button
                className={classNames(styles.LangSwitcher, {}, [className])}
                theme={ThemeButton.ClEAR}
                onClick={toggle}>
                {t('language')}
            </Button>
    )
}

export default LangSwitcher