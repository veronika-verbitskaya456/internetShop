import { Product } from '../../services/types';
import styles from './CardProduct.module.css';
import FavoriteButton from './FavoriteButton/FavoriteButton';

interface CardProductProps {
  product: Product;
}

const CardProduct = ({ product }: CardProductProps) => {
  return (
    <div key={product.id} className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img src={product.images[0]} alt="productImage" className={styles.image} crossOrigin="anonymous" />
        <FavoriteButton product={product}/>
      </div>
      <div className={styles.infoProductContainer}>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.price}>${product.price}</p>
        {/* <CartButton/> */}
      </div>

    </div>
  )
}

export default CardProduct;