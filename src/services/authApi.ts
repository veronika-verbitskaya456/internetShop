import { createApi } from "@reduxjs/toolkit/query/react";
import type { LoginRequest, LoginResponse } from "./types";
import { setToken } from "../store/slices/authSlice";
import { baseQueryWithReauth } from "./baseQuery";

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
    getUserProfile: builder.query({
      query: () => "auth/profile",
    }),
  }),
});

export const { useLoginMutation, useGetUserProfileQuery } = authApi;
