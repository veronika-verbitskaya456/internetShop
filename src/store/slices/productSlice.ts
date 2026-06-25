import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../services/types";
import { RootState } from "../store";
interface ProductsState {
  liked: Product[];
  // cart: Product[];
}

const saveLikedToStorage = (liked: Product[]) => {
  try {
    localStorage.setItem("likedProducts", JSON.stringify(liked));
  } catch (error) {
    console.error(error);
  }
};

const loadLikedFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem("likedProducts");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const initialState: ProductsState = {
  liked: loadLikedFromStorage(),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLikedProduct: (
      state,
      action: PayloadAction<{ product: Product }>,
    ) => {
      const product = action.payload.product;
      const index = state.liked.findIndex((item) => item.id === product.id);

      if (index === -1) {
        state.liked.push(product);
      } else {
        state.liked.splice(index, 1);
      }
      saveLikedToStorage(state.liked);
    },
    clearLikedProducts: (state) => {
      state.liked = [];
      saveLikedToStorage([]);
    },
    resetProductsState: () => {
      const emptyState = { liked: [] };
      saveLikedToStorage([]);
      return emptyState;
    },
  },
});

export const { toggleLikedProduct, clearLikedProducts, resetProductsState } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
