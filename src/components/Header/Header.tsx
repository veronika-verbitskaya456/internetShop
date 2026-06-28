import { useState } from 'react';
import BurgerButton from '../BurgerButton/BurgerButton';
import ProfileButton from '../ProfileButton/ProfileButton';
import SearchInput from '../SearchInput/SearchInput';
import styles from './Header.module.css'
import ProfileInfoModal from '../Modals/ProfileInfoModal/ProfileInfoModal';
import CartButton from '../CartButton/CartButton';
import AllFavoriteProductButton from '../AllFavoriteProductButton/AllFavoriteProductButton';
import ProductCategoriesModal from '../Modals/ProductCategoriesModal/ProductCategoriesModal';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';
import MainPageButton from '../MainPageButton/MainPageButton';

const Header = () => {
  const [isOpenProfileInfoModal, setIsOpenProfileInfoModal] = useState(false);
  const [isOpenCategoriesModal, setIsOpenCategoriesModal] = useState(false);
  const navigate = useNavigate();

  const handleToggleProfileModal = () => {
    setIsOpenProfileInfoModal(!isOpenProfileInfoModal);
  };

  const handleToggleCategoriesModal = () => {
    setIsOpenCategoriesModal(!isOpenCategoriesModal);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <BurgerButton isOpen={isOpenCategoriesModal} onClick={handleToggleCategoriesModal}/>
          <MainPageButton/>
        </div>
        <div className={styles.headerSearch}>
          <SearchInput />
        </div>
        <div className={styles.headerButtonsWrapper}>
          <AllFavoriteProductButton onClick={() => navigate(Routes.FAVORITES)}/>
          <CartButton />
          <ProfileButton isOpen={isOpenProfileInfoModal} onClick={handleToggleProfileModal} />
        </div>
      </header>
      <ProfileInfoModal isOpen={isOpenProfileInfoModal} onToggle={handleToggleProfileModal} />
      <ProductCategoriesModal isOpen={isOpenCategoriesModal} onToggle={handleToggleCategoriesModal}/>
    </>
  )
}

export default Header;