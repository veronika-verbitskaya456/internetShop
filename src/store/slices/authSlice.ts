import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../services/types";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPermission: (state, action: PayloadAction<{accessToken: string, user: User}>) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    setToken: (state, action: PayloadAction<{accessToken: string}>) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
  }
});

export const {setPermission, setToken, logout} = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;