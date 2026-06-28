import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../services/productsApi";
import { getCategoryPath } from "../../../routes";
import styles from "./ProductCategoriesModal.module.css";
import { getSafeImageUrl } from "../../../utils/imageUtils";

interface ProductCategoriesModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProductCategoriesModal = ({
  isOpen,
  onToggle,
}: ProductCategoriesModalProps) => {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery(
    undefined,
    {
      skip: !isOpen,
    },
  );

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onToggle();
    }
  };

  const handleCategoryClick = (slug: string) => {
    navigate(getCategoryPath(slug));
    onToggle();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={styles.categoriesContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalTitle}>Категории</h2>

        {isLoading && (
          <p className={styles.statusMessage}>Загрузка категорий...</p>
        )}

        {isError && (
          <p className={styles.statusMessage}>Не удалось загрузить категории</p>
        )}

        {!isLoading &&
          !isError &&
          categories?.map((category) => (
            <button
              key={category.id}
              type="button"
              className={styles.categoryLink}
              onClick={() => handleCategoryClick(category.slug)}
            >
              <img
                src={getSafeImageUrl(category.image)}
                alt={category.name}
                className={styles.categoryImage}
              />
              <span className={styles.categoryName}>{category.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default ProductCategoriesModal;
