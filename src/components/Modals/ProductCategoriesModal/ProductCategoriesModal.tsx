import { useGetAllCategoriesQuery } from "../../../services/productsApi";
import styles from "./ProductCategoriesModal.module.css";

interface ProductCategoriesModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProductCategoriesModal = ({
  isOpen,
  onToggle,
}: ProductCategoriesModalProps) => {
  const { data: categories } = useGetAllCategoriesQuery(undefined, {
    skip: !isOpen,
  });

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onToggle();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.categoriesContainer}>
        {categories?.map((category) => (
          <a href={'/category'} className={styles.category}>{category.name}</a>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoriesModal;
