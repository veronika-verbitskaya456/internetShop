import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { authApi } from "../services/authApi";
import { productsApi } from "../services/productsApi";
import { productsReducer } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
