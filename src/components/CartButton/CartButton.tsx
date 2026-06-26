import { useSelector } from 'react-redux';
import CartButtonIcon from '../../assets/icons/CartButtonIcon';
import ProfileButtonIcon from '../../assets/icons/CartButtonIcon';
import styles from './CartButton.module.css'
import { selectCartCount } from '../../store/slices/productSlice';

interface CartButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
}

const CartButton = ({ isOpen = false, onClick }: CartButtonProps) => {
  const countCartProducts = useSelector(selectCartCount);
  return (
    <button className={styles.cartButton} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <CartButtonIcon isInCart={countCartProducts > 0} />
        {countCartProducts > 0 && (
          <span className={styles.badge}>{countCartProducts}</span>
        )}
      </div>
      <p className={styles.cartTitle}>Корзина</p>
    </button>
  )
}

export default CartButton;