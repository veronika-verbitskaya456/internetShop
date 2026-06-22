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
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "auth/refresh-token",
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const { accessToken } = refreshResult.data as { accessToken: string };
        api.dispatch(setToken({ accessToken: accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        // window.location.href = Routes.SIGN_IN;
      }
    } else {
      api.dispatch(logout());
      // window.location.href = Routes.SIGN_IN;
    }
  }
  return result;
};
