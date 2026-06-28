import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import type { Categories, Product, ProductResponse, ProductsQueryArgs } from "./types";
import { transformProduct } from "../utils/productsApiUtils";
import { buildProductsQueryParams } from "../utils/buildProductsQueryParams";
import { isValidProductImageUrl } from "../utils/imageUtils";

const filterProductsWithValidImages = (products: Product[]) =>
  products.filter((item) => isValidProductImageUrl(item.images?.[0]));

export const productsApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllProductsWithPagination: builder.query<Product[], ProductsQueryArgs>({
      query: ({ offset = 0, filters = {} }) =>
        `products?${buildProductsQueryParams(offset, filters)}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const filtersKey = JSON.stringify(queryArgs.filters ?? {});
        return `${endpointName}(${filtersKey})`;
      },
      merge: (currentCash, newItems) => {
        const existingIds = new Set(currentCash.map((cash) => cash.id));
        const uniqueItems = newItems.filter(
          (item) => !existingIds.has(item.id),
        );

        currentCash.push(...uniqueItems);
      },
      transformResponse: (response: ProductResponse[]) =>
        filterProductsWithValidImages(response.map(transformProduct)),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      transformResponse: (response: ProductResponse) =>
        transformProduct(response),
    }),
    getAllCategories: builder.query<Categories[], void>({
      query: () => "categories",
    }),
    getAllProductsByCategory: builder.query({
      query: (categoryId) => `categories/${categoryId}/products`,
      transformResponse: (response: ProductResponse[]) =>
        filterProductsWithValidImages(response.map(transformProduct)),
    }),
  }),
});

export const {
  useGetAllProductsWithPaginationQuery,
  useGetProductByIdQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsByCategoryQuery,
} = productsApi;
