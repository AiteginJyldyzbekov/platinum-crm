import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'

export const Navbar = () => {
  return (
        <div>
            <ThemeSwitcher />
        </div>
  )
}
