import { useState } from 'react';
import BurgerButtonIcon from '../../assets/icons/BurgerButtonIcon';
import styles from './BurgerButton.module.css'

const BurgerButton = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <button className={styles.burgerButton} onClick={() => setIsOpened(!isOpened)}>
      <BurgerButtonIcon isOpened={isOpened}/>
    </button>
  )
};

export default BurgerButton;