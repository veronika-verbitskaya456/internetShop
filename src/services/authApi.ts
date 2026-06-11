import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import type { LoginRequest, LoginResponse } from "./types";
import { logout, setToken } from "../store/slices/authSlice";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
      transformResponse: (
        response: LoginResponse & {
          accessToken?: string;
          refreshToken?: string;
        },
      ) => ({
        access_token: response.access_token ?? "",
        refresh_token: response.refresh_token ?? "",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken({ accessToken: data.access_token }));
          document.cookie = `refreshToken=${data.refresh_token}`;
        } catch (error) {
          console.warn(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
