import type { Product, ProductResponse } from "../services/types";

export const transformProduct = (serverProduct: ProductResponse): Product => ({
  id: serverProduct.id,
  title: serverProduct.title ?? "",
  slug: serverProduct.slug ?? "",
  price: serverProduct.price,
  description: serverProduct.description ?? "",
  category: serverProduct.category,
  images: serverProduct.images ?? [],
});
