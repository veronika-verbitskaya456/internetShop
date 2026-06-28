import FavoriteButtonIcon from "../../assets/icons/FavoriteButtonIcon";
import styles from './AllFavoriteProductButton.module.css'

interface AllFavoriteProductButtonProps {
  onClick: () => void;
}

const AllFavoriteProductButton = ({onClick}: AllFavoriteProductButtonProps) => {
  return (
    <button className={styles.favoriteButton} onClick={onClick}>
      <FavoriteButtonIcon isFavorited={false} />
      <p className={styles.favoriteTitle}>Избранное</p>
    </button>
  )
}

export default AllFavoriteProductButton;