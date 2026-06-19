import BurgerButton from '../BurgerButton/BurgerButton';
import ProfileButton from '../ProfileButton/ProfileButton';
import SearchInput from '../SearchInput/SearchInput';
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <BurgerButton/>
      <SearchInput/>
      <ProfileButton/>
    </header>
  )
}

export default Header;