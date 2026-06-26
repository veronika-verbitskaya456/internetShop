import { useSelector } from 'react-redux';
import styles from './FavoriteProductsPage.module.css'
import { selectLikedProducts } from '../../store/slices/productSlice';
import CardProduct from '../../components/CardProduct/CardProduct';

const FavoriteProductsPage = () => {
  const likedProducts = useSelector(selectLikedProducts);
  return (
    <div className={styles.gridFavorites}>
      {likedProducts.map((product) => <CardProduct product={product} />)}
    </div>
  )
}

export default FavoriteProductsPage;