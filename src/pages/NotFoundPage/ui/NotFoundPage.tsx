import { useTranslation } from "react-i18next";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = () => {
    const { t } = useTranslation();
    return (
        <div>{t("notFound")}</div>
    )
}