import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import type { Categories, Product, ProductResponse } from "./types";
import { transformProduct } from "../utils/productsApiUtils";

export const productsApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllProductsWithPagination: builder.query<Product[], number>({
      query: (offset = 0) => `products?offset=${offset}&limit=50`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCash, newItems) => {
        const existingIds = new Set(currentCash.map((cash) => cash.id));
        const uniqueItems = newItems.filter(
          (item) => !existingIds.has(item.id),
        );

        currentCash.push(...uniqueItems);
      },
      transformResponse: (response: ProductResponse[]) => {
        return response.map(transformProduct).filter((item) => {
          const firstImage = item.images?.[0];
          return (
            typeof firstImage === "string" &&
            (firstImage.startsWith("https://i.imgur.com") ||
              firstImage.startsWith("https://imgur.com"))
          );
        });
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getProductById: builder.query({
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
        response.map(transformProduct),
    }),
  }),
});

export const {
  useGetAllProductsWithPaginationQuery,
  useGetProductByIdQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsByCategoryQuery,
} = productsApi;
