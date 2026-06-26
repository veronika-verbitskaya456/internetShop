import ProfileButtonIcon from '../../assets/icons/ProfileButtonIcon';
import styles from './ProfileButton.module.css'

interface ProfileButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
}

const ProfileButton = ({ isOpen = false, onClick }: ProfileButtonProps) => {
  return (
    <button className={styles.profileButton} onClick={onClick}>
      <ProfileButtonIcon isOpened={isOpen} />
      <p className={styles.profileTitle}>Профиль</p>
    </button>
  )
}

export default ProfileButton;