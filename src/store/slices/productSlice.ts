import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../services/types";
import { RootState } from "../store";
interface ProductsState {
  liked: Product[];
  cart: Product[];
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

const saveCartToStorage = (cart: Product[]) => {
  try {
    localStorage.setItem("cartProducts", JSON.stringify(cart));
  } catch (error) {
    console.error(error);
  }
};

const loadCartFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem("cartProducts");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const initialState: ProductsState = {
  liked: loadLikedFromStorage(),
  cart: loadCartFromStorage(),
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
    addToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const product = action.payload.product;
      const existing = state.cart.find((item) => item.id === product.id);

      if (!existing) {
        state.cart.push(product);
        saveCartToStorage(state.cart);
      }
    },
    clearLikedProducts: (state) => {
      state.liked = [];
      saveLikedToStorage([]);
    },
    removeFromCart: (state, action: PayloadAction<{ productId: number }>) => {
      const productId = action.payload.productId;
      state.cart = state.cart.filter((item) => item.id !== productId);
      saveCartToStorage(state.cart);
    },

    toggleCartProduct: (state, action: PayloadAction<{ product: Product }>) => {
      const product = action.payload.product;
      const index = state.cart.findIndex((item) => item.id === product.id);

      if (index === -1) {
        state.cart.push(product);
      } else {
        state.cart.splice(index, 1);
      }
      saveCartToStorage(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      saveCartToStorage([]);
    },
    resetProductsState: () => {
      const emptyState = { liked: [], cart: [] };
      saveLikedToStorage([]);
      saveCartToStorage([]);
      return emptyState;
    },
  },
});

export const {
  toggleLikedProduct,
  clearLikedProducts,
  addToCart,
  removeFromCart,
  toggleCartProduct,
  clearCart,
  resetProductsState,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
export const selectLikedProducts = (state: RootState) => state.products.liked;
export const selectCartProducts = (state: RootState) => state.products.cart;
export const selectCartCount = (state: RootState) => state.products.cart.length;
export const selectIsProductLiked = (productId: number) => (state: RootState) =>
  state.products.liked.some((item) => item.id === productId);
export const selectIsProductInCart =
  (productId: number) => (state: RootState) =>
    state.products.cart.some((item) => item.id === productId);