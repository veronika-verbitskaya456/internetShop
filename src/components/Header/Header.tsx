import { useState } from 'react';
import BurgerButton from '../BurgerButton/BurgerButton';
import ProfileButton from '../ProfileButton/ProfileButton';
import SearchInput from '../SearchInput/SearchInput';
import styles from './Header.module.css'
import ProfileInfoModal from '../Modals/ProfileInfoModal/ProfileInfoModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';

const Header = () => {
  const [isOpenProfileInfoModal, setIsOpenProfileInfoModal] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();
  const isAuth = !!accessToken;

  const handleToggleModal = () => {
    setIsOpenProfileInfoModal(!isOpenProfileInfoModal);
  };

  const handleToSignInPage = () => {
    navigate(Routes.SIGN_IN);
  };

  return (
    <>
      <header className={styles.header}>
        <BurgerButton />
        <SearchInput />
        {isAuth && <ProfileButton isOpen={isOpenProfileInfoModal} onClick={handleToggleModal} />}
        {!isAuth && <button className={styles.buttonLogIn} onClick={handleToSignInPage}>ВОЙТИ</button>}
      </header>
      <ProfileInfoModal isOpen={isOpenProfileInfoModal} onToggle={handleToggleModal} />
    </>
  )
}

export default Header;