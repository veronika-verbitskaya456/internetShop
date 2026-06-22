import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  LoginResponse,
  NewUserRequest,
  UploadAvatarFileResponse,
  User,
} from "./types";
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
