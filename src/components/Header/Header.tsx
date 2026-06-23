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

import { useGetUserProfileQuery } from '../../services/authApi';

const Header = () => {
  const [isOpenProfileInfoModal, setIsOpenProfileInfoModal] = useState(false);
  
  const handleToggleModal = () => {
    setIsOpenProfileInfoModal(!isOpenProfileInfoModal);
  };

  return (
    <>
      <header className={styles.header}>
        <BurgerButton />
        <SearchInput />
        <ProfileButton isOpen={isOpenProfileInfoModal} onClick={handleToggleModal} />
      </header>
      <ProfileInfoModal isOpen={isOpenProfileInfoModal} onToggle={handleToggleModal} />
    </>
  )
}

export default Header;