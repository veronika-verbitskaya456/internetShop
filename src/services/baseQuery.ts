import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import Cookies from "js-cookie";
import { logout, setToken } from "../store/slices/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
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
        //navigation('/login')
      }
    } else {
      api.dispatch(logout());
      //navigation('/login')
    }
  }
  return result;
};