import { useState } from 'react';
import ProfileButtonIcon from '../../assets/icons/ProfileButtonIcon';
import styles from './ProfileButton.module.css'

const ProfileButton = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <button className={styles.profileButton} onClick={() => setIsOpened(!isOpened)}>
      <ProfileButtonIcon isOpened={isOpened} />
    </button>
  )
}

export default ProfileButton;