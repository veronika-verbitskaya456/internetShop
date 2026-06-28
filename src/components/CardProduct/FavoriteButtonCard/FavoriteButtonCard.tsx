import FavoriteButtonIcon from "../../../assets/icons/FavoriteButtonIcon";
import styles from './FavoriteButtonCard.module.css'
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../services/types";
import { selectIsProductLiked, toggleLikedProduct } from "../../../store/slices/productSlice";
import { useRequireAuth } from "../../../hooks/useRequireAuth";


const FavoriteButtonCard = ({product}: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFavorited = useSelector(selectIsProductLiked(product.id));
  const { requireAuth } = useRequireAuth();

  const handleClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorited) {
      dispatch(toggleLikedProduct({ product }));
      return;
    }

    requireAuth(() => dispatch(toggleLikedProduct({ product })));
  }

  return (
    <button onClick={handleClickFavorite} className={styles.favoriteButton}>
      <FavoriteButtonIcon isFavorited={isFavorited} />
    </button>
  )
}

export default FavoriteButtonCard;