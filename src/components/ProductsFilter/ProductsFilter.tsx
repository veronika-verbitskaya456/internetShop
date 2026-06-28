import { useGetAllCategoriesQuery } from "../../services/productsApi";
import type { ProductFilters } from "../../services/types";
import styles from "./ProductsFilter.module.css";

interface ProductsFilterProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onApply: () => void;
  onReset: () => void;
  hideCategoryFilter?: boolean;
}

const ProductsFilter = ({
  filters,
  onFiltersChange,
  onApply,
  onReset,
  hideCategoryFilter = false,
}: ProductsFilterProps) => {
  const { data: categories = [] } = useGetAllCategoriesQuery(undefined, {
    skip: hideCategoryFilter,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply();
  };

  const handleNumberChange = (
    field: "price" | "price_min" | "price_max",
    value: string,
  ) => {
    const parsed = value === "" ? undefined : Number(value);
    onFiltersChange({
      ...filters,
      [field]: Number.isNaN(parsed) ? undefined : parsed,
    });
  };

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>Фильтры</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="filter-title">
            Название
          </label>
          <input
            id="filter-title"
            className={styles.input}
            type="text"
            placeholder="Например, Chair"
            value={filters.title ?? ""}
            onChange={(e) =>
              onFiltersChange({ ...filters, title: e.target.value })
            }
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="filter-price">
            Точная цена
          </label>
          <input
            id="filter-price"
            className={styles.input}
            type="number"
            min="0"
            placeholder="100"
            value={filters.price ?? ""}
            onChange={(e) => handleNumberChange("price", e.target.value)}
          />
        </div>

        {!hideCategoryFilter && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="filter-category">
              Категория
            </label>
            <select
              id="filter-category"
              className={styles.select}
              value={filters.categoryId ?? ""}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  categoryId: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                  categorySlug: undefined,
                })
              }
            >
              <option value="">Все категории</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="filter-price-min">
            Цена от
          </label>
          <input
            id="filter-price-min"
            className={styles.input}
            type="number"
            min="0"
            placeholder="900"
            value={filters.price_min ?? ""}
            onChange={(e) => handleNumberChange("price_min", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="filter-price-max">
            Цена до
          </label>
          <input
            id="filter-price-max"
            className={styles.input}
            type="number"
            min="0"
            placeholder="1000"
            value={filters.price_max ?? ""}
            onChange={(e) => handleNumberChange("price_max", e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.applyButton}>
            Применить
          </button>
          <button type="button" className={styles.resetButton} onClick={onReset}>
            Сбросить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsFilter;
