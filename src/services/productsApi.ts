import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import type { Product, ProductResponse } from "./types";
import { transformProduct } from "../utils/productsApiUtils";

export const productsApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "products",
      transformResponse: (response: ProductResponse[]) =>
        response.map(transformProduct),
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      transformResponse: (response: ProductResponse) =>
        transformProduct(response),
    }),
    getAllProductsByCategory: builder.query({
      query: (categoryId) => `categories/${categoryId}/products`,
      transformResponse: (response: ProductResponse[]) =>
        response.map(transformProduct),
    }),
  }),
});
