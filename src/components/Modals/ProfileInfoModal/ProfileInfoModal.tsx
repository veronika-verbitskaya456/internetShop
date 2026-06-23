import styles from './ProfileInfoModal.module.css'
import { authApi, useGetUserProfileQuery } from "../../../services/authApi";
import { getProxyImageUrl } from '../../../utils/authApiUtils';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import Cookies from "js-cookie";
import { logout } from '../../../store/slices/authSlice';

interface ProfileInfoModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProfileInfoModal = ({ isOpen, onToggle }: ProfileInfoModalProps) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuth = !!accessToken;

  const hasRefreshToken = Boolean(Cookies.get("refreshToken"));
  const { data: user, isLoading, isError, refetch } = useGetUserProfileQuery(undefined, {
    skip: !isOpen || !isAuth || !hasRefreshToken,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) {
    return null;
  }

  const handleToSignInPage = () => {
    navigate(Routes.SIGN_IN);
    onToggle();
  };

  const handleToSignOutPage = () => {
    Cookies.remove('refreshToken', { path: "/" });
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
    onToggle();
  };

  const handleRefetchProfile = () => {
    refetch();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.buttonClose} onClick={onToggle}>x</button>
        {isLoading && <p className={styles.loadingMessage}>Загрузка профиля...</p>}

        {isError && (
          <div className={styles.errorContainer}>
            Ошибка загрузки профиля
            <button className={styles.buttonRefresh} onClick={handleRefetchProfile}>ОБНОВИТЬ</button>
          </div>
        )}

        {!isAuth && (
          <div className={styles.userInfoContainer}>
            <button className={styles.buttonLogIn} onClick={handleToSignInPage}>ВОЙТИ</button>
          </div>
        )}

        {isAuth && user && (
          <div className={styles.userInfoContainer}>
            {user.avatar && <img src={getProxyImageUrl(user.avatar)} alt="userAvatar" className={styles.userAvatar} />}
            <p className={styles.userInfo}>{user.name}</p>
            <p className={styles.userInfo}>{user.email}</p>
            <button className={styles.buttonLogIn} onClick={handleToSignOutPage}>ВЫЙТИ</button>
          </div>
        )}

      </div>
    </div>
  )
};

export default ProfileInfoModal;