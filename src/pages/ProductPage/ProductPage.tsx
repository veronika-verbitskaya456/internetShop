import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CartButtonIcon from "../../assets/icons/CartButtonIcon";
import FavoriteButtonIcon from "../../assets/icons/FavoriteButtonIcon";
import { useGetProductByIdQuery } from "../../services/productsApi";
import type { AppDispatch } from "../../store/store";
import {
  selectIsProductInCart,
  selectIsProductLiked,
  toggleCartProduct,
  toggleLikedProduct,
} from "../../store/slices/productSlice";
import styles from "./ProductPage.module.css";
import { getSafeImageUrl } from "../../utils/imageUtils";
import { useRequireAuth } from "../../hooks/useRequireAuth";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading, isError } = useGetProductByIdQuery(
    productId,
    { skip: !productId || Number.isNaN(productId) },
  );

  const isFavorited = useSelector(selectIsProductLiked(productId));
  const isInCart = useSelector(selectIsProductInCart(productId));
  const { requireAuth } = useRequireAuth();

  if (!productId || Number.isNaN(productId)) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Товар не найден</h2>
          <p>Некорректный идентификатор товара</p>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            Назад
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <p className={styles.loading}>Загрузка товара...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Товар не найден</h2>
          <p>Не удалось загрузить информацию о товаре</p>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            Назад
          </button>
        </div>
      </div>
    );
  }

  const images = product.images.length > 0
    ? product.images.map((image) => getSafeImageUrl(image))
    : [getSafeImageUrl(undefined)];
  const selectedImage = images[selectedImageIndex] ?? images[0];

  const handleToggleFavorite = () => {
    if (isFavorited) {
      dispatch(toggleLikedProduct({ product }));
      return;
    }

    requireAuth(() => dispatch(toggleLikedProduct({ product })));
  };

  const handleToggleCart = () => {
    if (isInCart) {
      dispatch(toggleCartProduct({ product }));
      return;
    }

    requireAuth(() => dispatch(toggleCartProduct({ product })));
  };

  return (
    <div className={styles.pageContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.title}
                className={styles.mainImage}
              />
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`${styles.thumbnail} ${
                    index === selectedImageIndex ? styles.thumbnailActive : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{product.category.name}</span>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.actionButton} ${
                isFavorited ? styles.actionButtonActive : ""
              }`}
              onClick={handleToggleFavorite}
            >
              <span className={styles.iconWrapper}>
                <FavoriteButtonIcon isFavorited={isFavorited} />
              </span>
              {isFavorited ? "В избранном" : "В избранное"}
            </button>

            <button
              type="button"
              className={`${styles.actionButton} ${
                isInCart ? styles.actionButtonActive : ""
              }`}
              onClick={handleToggleCart}
            >
              <span className={styles.iconWrapper}>
                <CartButtonIcon isInCart={isInCart} />
              </span>
              {isInCart ? "В корзине" : "В корзину"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
