import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  LoginResponse,
  NewUserRequest,
  UploadAvatarFileResponse,
  User,
} from "./types";
import { logout, setToken, setUser } from "../store/slices/authSlice";
import { baseQueryWithReauth } from "./baseQuery";
import Cookies from "js-cookie";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
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
          Cookies.set("refreshToken", data.refresh_token, { path: "/", expires: 7 });
        } catch (error) {
          console.warn(error);
        }
      },
    }),
    getUserProfile: builder.query({
      query: () => "auth/profile",
      providesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data }));
        } catch (error) {
          console.warn("Пользователь не авторизован или сессия исткла", error);
          dispatch(logout());
        }
      },
    }),
    uploadAvatarFile: builder.mutation<UploadAvatarFileResponse, FormData>({
      query: (formData) => ({
        method: "POST",
        url: "files/upload",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // можно обновить профиль пользователя
        } catch (error) {
          console.warn(error);
        }
      },
    }),
    createNewUser: builder.mutation<User, NewUserRequest>({
      query: (newUser) => ({
        method: "POST",
        url: "users/",
        body: newUser,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useUploadAvatarFileMutation,
  useCreateNewUserMutation,
} = authApi;
