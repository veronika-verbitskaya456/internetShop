import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/slices/productSlice';
import styles from './CartItem.module.css';
import { Product } from '../../services/types';
import { getSafeImageUrl } from '../../utils/imageUtils';

interface CartItemProps {
  product: Product;
}

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart({ productId: product.id }));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageWrapper}>
        <img
          src={getSafeImageUrl(product.images?.[0])}
          alt={product.title}
          className={styles.productImage}
        />
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        {product.description && (
          <p className={styles.productDescription}>
            {product.description.slice(0, 100)}
            {product.description.length > 100 && '...'}
          </p>
        )}
        <div className={styles.productMeta}>
          <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
          {product.category && (
            <span className={styles.productCategory}>{product.category.name}</span>
          )}
        </div>
      </div>

      <button
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label="Удалить товар"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;