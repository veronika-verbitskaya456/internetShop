import styles from './ProfileInfoModal.module.css'
import { useGetUserProfileQuery } from "../../../services/authApi";
import { getProxyImageUrl } from '../../../utils/authApiUtils';

interface ProfileInfoModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProfileInfoModal = ({ isOpen, onToggle }: ProfileInfoModalProps) => {
  const { data: user, isLoading, isError, refetch } = useGetUserProfileQuery(undefined, {
    skip: !isOpen,
  });

  if (!isOpen) {
    return null;
  }

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

        {user && (
          <div className={styles.userInfoContainer}>
            {user.avatar && <img src={getProxyImageUrl(user.avatar)} alt="userAvatar" className={styles.userAvatar} />}
            <p className={styles.userInfo}>{user.name}</p>
            <p className={styles.userInfo}>{user.email}</p>
          </div>
        )}
      </div>
    </div>
  )
};

export default ProfileInfoModal;