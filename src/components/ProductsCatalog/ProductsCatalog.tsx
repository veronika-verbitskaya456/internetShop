import { useEffect, useRef, useState } from "react";
import styles from "./ProductsCatalog.module.css";
import { useGetAllProductsWithPaginationQuery } from "../../services/productsApi";
import type { ProductFilters } from "../../services/types";
import { BACKEND_LIMIT, PAGINATION_LIMIT } from "../../utils/productsConstants";
import CardProduct from "../CardProduct/CardProduct";
import ProductsFilter from "../ProductsFilter/ProductsFilter";

interface ProductsCatalogProps {
  appliedFilters: ProductFilters;
  draftFilters: ProductFilters;
  onDraftFiltersChange: (filters: ProductFilters) => void;
  onApply: () => void;
  onReset: () => void;
  hideCategoryFilter?: boolean;
  excludedFilterKeys?: (keyof ProductFilters)[];
}

const ProductsCatalog = ({
  appliedFilters,
  draftFilters,
  onDraftFiltersChange,
  onApply,
  onReset,
  hideCategoryFilter = false,
  excludedFilterKeys = [],
}: ProductsCatalogProps) => {
  const [page, setPage] = useState(0);
  const [backendOffset, setBackendOffset] = useState(0);

  const { data: products = [], isFetching, error } =
    useGetAllProductsWithPaginationQuery({
      offset: backendOffset,
      filters: appliedFilters,
    });

  const startIndex = page * PAGINATION_LIMIT;
  const endIndex = startIndex + PAGINATION_LIMIT;
  const visibleProducts = products.slice(startIndex, endIndex);
  const catalogScrollRef = useRef<HTMLDivElement>(null);
  const hasActiveFilters = Object.entries(appliedFilters).some(
    ([key, value]) =>
      value !== undefined &&
      value !== "" &&
      !excludedFilterKeys.includes(key as keyof ProductFilters),
  );

  const resetPagination = () => {
    setPage(0);
    setBackendOffset(0);
  };

  const appliedFiltersKey = JSON.stringify(appliedFilters);

  useEffect(() => {
    resetPagination();
  }, [appliedFiltersKey]);

  const handleNext = () => {
    const nextPageNumber = page + 1;
    const requiredItemsCount = (nextPageNumber + 1) * PAGINATION_LIMIT;
    if (products.length < requiredItemsCount && !isFetching) {
      setBackendOffset((prev) => prev + BACKEND_LIMIT);
    }

    setPage(nextPageNumber);
    catalogScrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(0, prev - 1));
    catalogScrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const isInitialLoading = products.length === 0 && isFetching;
  const isEmptyResult = products.length === 0 && !isFetching;

  return (
    <>
      <ProductsFilter
        filters={draftFilters}
        onFiltersChange={onDraftFiltersChange}
        onApply={onApply}
        onReset={onReset}
        hideCategoryFilter={hideCategoryFilter}
      />

      {isInitialLoading && <p className={styles.statusMessage}>Загрузка товаров...</p>}

      {error && isEmptyResult && (
        <p className={styles.statusMessage}>Ошибка загрузки</p>
      )}

      {isEmptyResult && !error && (
        <p className={styles.emptyMessage}>
          {hasActiveFilters
            ? "Товары не найдены. Попробуйте изменить параметры фильтрации."
            : "Товары не найдены."}
        </p>
      )}

      {visibleProducts.length > 0 && (
        <div ref={catalogScrollRef} className={styles.gridContainer}>
          {visibleProducts.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className={styles.pagination}>
          <button
            className={styles.button}
            onClick={handlePrev}
            disabled={page === 0}
          >
            prev
          </button>
          <button className={styles.button} onClick={handleNext}>
            next
          </button>
        </div>
      )}
    </>
  );
};

export default ProductsCatalog;
