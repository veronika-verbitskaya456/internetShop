import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductsCatalog from "../../components/ProductsCatalog/ProductsCatalog";
import { useGetAllCategoriesQuery } from "../../services/productsApi";
import type { ProductFilters } from "../../services/types";
import { Routes } from "../../routes";
import styles from "./CategoryPage.module.css";
import { getSafeImageUrl } from "../../utils/imageUtils";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();

  const category = categories?.find(
    (item) => item.slug.toLowerCase() === slug?.toLowerCase(),
  );

  const [draftFilters, setDraftFilters] = useState<ProductFilters>({});
  const [appliedFilters, setAppliedFilters] = useState<ProductFilters>({});

  const categoryFilters = useMemo<ProductFilters>(
    () =>
      category
        ? { categoryId: category.id, categorySlug: category.slug }
        : {},
    [category],
  );

  const mergedDraftFilters = useMemo(
    () => ({ ...draftFilters, ...categoryFilters }),
    [draftFilters, categoryFilters],
  );

  const mergedAppliedFilters = useMemo(
    () => ({ ...appliedFilters, ...categoryFilters }),
    [appliedFilters, categoryFilters],
  );

  useEffect(() => {
    setDraftFilters({});
    setAppliedFilters({});
  }, [slug]);

  if (isLoading || (!categories && !isError)) {
    return (
      <div className={styles.pageContainer}>
        <p className={styles.loading}>Загрузка категории...</p>
      </div>
    );
  }

  if (isError || !category) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Категория не найдена</h2>
          <button
            className={styles.backButton}
            onClick={() => navigate(Routes.MAIN)}
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.imageWrapper}>
          <img
            src={getSafeImageUrl(category.image)}
            alt={category.name}
            className={styles.categoryImage}
          />
        </div>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{category.name}</h1>
          <p className={styles.subtitle}>Товары категории</p>
        </div>
      </header>

      <ProductsCatalog
        appliedFilters={mergedAppliedFilters}
        draftFilters={mergedDraftFilters}
        onDraftFiltersChange={(filters) => {
          const { categoryId: _id, categorySlug: _slug, ...rest } = filters;
          setDraftFilters(rest);
        }}
        onApply={() => setAppliedFilters({ ...draftFilters })}
        onReset={() => {
          setDraftFilters({});
          setAppliedFilters({});
        }}
        hideCategoryFilter
        excludedFilterKeys={["categoryId", "categorySlug"]}
      />
    </div>
  );
};

export default CategoryPage;
