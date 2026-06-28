import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../services/types";
import { RootState } from "../store";

interface Order {
  products: Product[];
  date: string;
  total: number;
}

interface ProductsState {
  liked: Product[];
  cart: Product[];
  orders: Order[];
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

const saveOrdersToStorage = (orders: Order[]) => {
  try {
    localStorage.setItem("orders", JSON.stringify(orders));
  } catch (error) {
    console.error(error);
  }
};

const loadOrdersFromStorage = (): Order[] => {
  try {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const initialState: ProductsState = {
  liked: loadLikedFromStorage(),
  cart: loadCartFromStorage(),
  orders: loadOrdersFromStorage(),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLikedProduct: (state, action: PayloadAction<{ product: Product }>) => {
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
    addToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const product = action.payload.product;
      const existing = state.cart.find((item) => item.id === product.id);

      if (!existing) {
        state.cart.push(product);
        saveCartToStorage(state.cart);
      }
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
    createOrder: (state, action: PayloadAction<{ products: Product[] }>) => {
      const { products } = action.payload;
      
      if (products.length === 0) return;

      const total = products.reduce((sum, product) => sum + product.price, 0);
      
      const newOrder: Order = {
        products: products,
        date: new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        total: total,
      };

      state.orders.unshift(newOrder);
      saveOrdersToStorage(state.orders);
      
      state.cart = [];
      saveCartToStorage([]);
    },

    clearOrders: (state) => {
      state.orders = [];
      saveOrdersToStorage([]);
    },

    resetProductsState: () => {
      const emptyState = { liked: [], cart: [], orders: [] };
      saveLikedToStorage([]);
      saveCartToStorage([]);
      saveOrdersToStorage([]);
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
  createOrder,
  clearOrders,
  resetProductsState,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
export const selectLikedProducts = (state: RootState) => state.products.liked;
export const selectCartProducts = (state: RootState) => state.products.cart;
export const selectCartCount = (state: RootState) => state.products.cart.length;
export const selectOrders = (state: RootState) => state.products.orders;
export const selectOrdersCount = (state: RootState) => state.products.orders.length;
export const selectIsProductLiked = (productId: number) => (state: RootState) =>
  state.products.liked.some((item) => item.id === productId);
export const selectIsProductInCart = (productId: number) => (state: RootState) =>
  state.products.cart.some((item) => item.id === productId);