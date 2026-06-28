import BurgerButtonIcon from '../../assets/icons/BurgerButtonIcon';
import styles from './BurgerButton.module.css'

interface BurgerButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
}

const BurgerButton = ({ isOpen = false, onClick }: BurgerButtonProps) => {
  return (
    <button className={styles.burgerButton} onClick={onClick}>
      <BurgerButtonIcon isOpened={isOpen} />
    </button>
  )
};

export default BurgerButton;