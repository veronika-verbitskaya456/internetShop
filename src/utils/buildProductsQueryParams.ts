import type { ProductFilters } from "../services/types";
import { BACKEND_LIMIT } from "./productsConstants";

export const buildProductsQueryParams = (
  offset: number,
  filters: ProductFilters = {},
): string => {
  const params = new URLSearchParams({
    offset: String(offset),
    limit: String(BACKEND_LIMIT),
  });

  if (filters.title?.trim()) {
    params.set("title", filters.title.trim());
  }
  if (filters.price !== undefined && filters.price !== null) {
    params.set("price", String(filters.price));
  }
  if (filters.price_min !== undefined && filters.price_min !== null) {
    params.set("price_min", String(filters.price_min));
  }
  if (filters.price_max !== undefined && filters.price_max !== null) {
    params.set("price_max", String(filters.price_max));
  }
  if (filters.categoryId !== undefined && filters.categoryId !== null) {
    params.set("categoryId", String(filters.categoryId));
  }
  if (filters.categorySlug?.trim()) {
    params.set("categorySlug", filters.categorySlug.trim());
  }

  return params.toString();
};
