import { useSelector } from 'react-redux';
import CartButtonIcon from '../../assets/icons/CartButtonIcon';
import styles from './CartButton.module.css'
import { selectCartCount } from '../../store/slices/productSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';

const CartButton = () => {
  const countCartProducts = useSelector(selectCartCount);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuth = !!accessToken && isAuthenticated;
  const navigate = useNavigate();

  return (
    <button className={styles.cartButton} onClick={() => navigate(Routes.CART)}>
      <div className={styles.iconWrapper}>
        <CartButtonIcon isInCart={countCartProducts > 0} />
        {isAuth && countCartProducts > 0 && (
          <span className={styles.badge}>{countCartProducts}</span>
        )}
      </div>
      <p className={styles.cartTitle}>Корзина</p>
    </button>
  )
}

export default CartButton;