import styles from './Navbar.module.scss'
import test from 'shared/assets/icons/ThemeSwitcher/test.png'

export const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <img src={test} alt='test' />
    </div>
  )
}
