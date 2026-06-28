import styles from './CartButtonCard.module.css'
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../services/types";
import { selectIsProductInCart, toggleCartProduct } from "../../../store/slices/productSlice";
import CartButtonIcon from "../../../assets/icons/CartButtonIcon";
import { AppDispatch } from '../../../store/store';
import { useRequireAuth } from "../../../hooks/useRequireAuth";

interface CartButtonProps {
  product: Product;
  className?: string;
}

const CartButtonCard = ({ product, className }: CartButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isInCart = useSelector(selectIsProductInCart(product.id));
  const { requireAuth } = useRequireAuth();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isInCart) {
      dispatch(toggleCartProduct({ product }));
      return;
    }

    requireAuth(() => dispatch(toggleCartProduct({ product })));
  };

  return (
    <button className={styles.cartButton} onClick={handleToggle}>
      <CartButtonIcon
        isInCart={isInCart}
        className={className}
      />
    </button>
  );
}

export default CartButtonCard;