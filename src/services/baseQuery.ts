import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import Cookies from "js-cookie";
import { logout, setToken } from "../store/slices/authSlice";

const PUBLIC_ENDPOINTS = new Set(["login", "createNewUser"]);

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

const refreshAccessToken = async (
  api: Parameters<BaseQueryFn>[1],
  extraOptions: Parameters<BaseQueryFn>[2],
) => {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken?.trim()) {
    return null;
  }

  const refreshResult = await baseQuery(
    {
      url: "auth/refresh-token",
      method: "POST",
      body: { refreshToken },
    },
    api,
    extraOptions,
  );

  if (!refreshResult.data) {
    return null;
  }

  const data = refreshResult.data as {
    access_token: string;
    refresh_token: string;
  };

  api.dispatch(setToken({ accessToken: data.access_token }));
  Cookies.set("refreshToken", data.refresh_token, {
    path: "/",
    expires: 7,
  });

  return data.access_token;
};

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const endpoint = api.endpoint;
  const isPublicEndpoint = PUBLIC_ENDPOINTS.has(endpoint);
  const state = api.getState() as RootState;
  const hasAccessToken = Boolean(state.auth.accessToken);
  const hasRefreshToken = Boolean(Cookies.get("refreshToken")?.trim());

  if (!isPublicEndpoint && !hasAccessToken && hasRefreshToken) {
    const refreshed = await refreshAccessToken(api, extraOptions);

    if (!refreshed) {
      api.dispatch(logout());
      Cookies.remove("refreshToken", { path: "/" });
      return { error: { status: 401, data: "Unauthorized" } };
    }
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !isPublicEndpoint) {
    const refreshed = await refreshAccessToken(api, extraOptions);

    if (refreshed) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      Cookies.remove("refreshToken", { path: "/" });
    }
  }

  return result;
};
