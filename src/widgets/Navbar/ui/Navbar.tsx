import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss"
import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

export const Navbar = () => {
    return (
        <div className={""}>
            <ThemeSwitcher />
            <Link to={"/"}>Главная</Link>
            <Link to={"/about"}>О сайте</Link>
        </div>
    )
}