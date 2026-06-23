import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import Cookies from "js-cookie";
import { logout, setToken } from "../store/slices/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1/",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (endpoint === "uploadAvatarFile") {
      headers.delete("Content-Type");
    } else {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
    headers.set("X-Requested-With", "XMLHttpRequest");
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    const isAuth = state.auth.isAuthenticated;
    if (!isAuth) {
      return result;
    }

    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken && refreshToken.trim() !== "") {
      const refreshResult = await baseQuery(
        {
          url: "auth/refresh-token",
          method: "POST",
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as {
          access_token: string;
          refresh_token: string;
        };

        const currentState = api.getState() as RootState;
        if (currentState.auth.isAuthenticated) {
          api.dispatch(setToken({ accessToken: data.access_token }));
          Cookies.set("refreshToken", data.refresh_token, {
            path: "/",
            expires: 7,
          });
          result = await baseQuery(args, api, extraOptions);
        }
      } else {
        api.dispatch(logout());
        Cookies.remove("refreshToken", { path: "/" });
        return result;
      }
    } else {
      api.dispatch(logout());
      Cookies.remove("refreshToken", { path: "/" });
      return result;
    }
  }
  return result;
};
