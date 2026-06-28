import { Link } from 'react-router-dom';
import { Product } from '../../services/types';
import { getProductPath } from '../../routes';
import styles from './CardProduct.module.css';
import { getSafeImageUrl } from '../../utils/imageUtils';
import CartButtonCard from './CartButtonCard/CartButtonCard';
import FavoriteButtonCard from './FavoriteButtonCard/FavoriteButtonCard';

interface CardProductProps {
  product: Product;
}

const CardProduct = ({ product }: CardProductProps) => {
  const productPath = getProductPath(product.id);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <Link to={productPath} className={styles.imageLink}>
          <img src={getSafeImageUrl(product.images[0])} alt="productImage" className={styles.image} />
        </Link>
        <FavoriteButtonCard product={product}/>
      </div>
      <div className={styles.infoProductContainer}>
        <Link to={productPath} className={styles.titleLink}>
          <p className={styles.title}>{product.title}</p>
        </Link>
        <p className={styles.price}>${product.price}</p>
        <CartButtonCard product={product} className={styles.cartButtonCard}/>
      </div>

    </div>
  )
}

export default CardProduct;