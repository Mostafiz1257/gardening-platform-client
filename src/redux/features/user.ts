import { baseApi } from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/auth/all-users",
        method: "GET",
      }),
      providesTags: ["user", "post"],
    }),
    followUser: builder.mutation({
      query: ({ followInfo }) => {
        return {
          url: `/auth/follow`,
          method: "POST",
          body: followInfo,
        };
      },
      invalidatesTags: ["user", "post"],
    }),

    updateProfile: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/auth/${userId}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["user", "post"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/auth/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user", "post"],
    }),

    getUpdateUser: builder.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/forget-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: ({ data, userId, token }) => {
        return {
          url: `/auth/reset-password/${token}/${userId}`, 
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useFollowUserMutation,
  useDeleteUserMutation,
  useUpdateProfileMutation,
  useGetUpdateUserQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation
} = userApi;
