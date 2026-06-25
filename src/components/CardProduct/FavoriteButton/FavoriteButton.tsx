import FavoriteButtonIcon from "../../../assets/icons/FavoriteButtonIcon";
import styles from './FavoriteButton.module.css'
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../services/types";
import { toggleLikedProduct } from "../../../store/slices/productSlice";

const FavoriteButton = ({product}: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const likedProducts = useSelector((state: RootState) => state.products.liked);
  const isFavorited = likedProducts.some(p => p.id === product.id);

  const handleClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLikedProduct({ product }));
  }

  return (
    <button onClick={handleClickFavorite} className={styles.favoriteButton}>
      <FavoriteButtonIcon isFavorited={isFavorited} />
    </button>
  )
}

export default FavoriteButton;