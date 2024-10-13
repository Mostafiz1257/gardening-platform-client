import { baseApi } from "../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ commentObject, postId }) => {

        return {
          url: `/comment/${postId}`,
          method: "POST",
          body: commentObject,
        };
      },
      invalidatesTags: ["post", "comment","user"],
    }),
    updateComment: builder.mutation({
      query: (updateComment) => {
        return {
          url: `/comment/update`,
          method: "PATCH",
          body: updateComment,
        };
      },
      invalidatesTags: ["comment", "post"],
    }),

    deleteComment: builder.mutation({
      query: (commentInfo) => ({
        url: `/comment/delete`,
        method: "DELETE",
        body: commentInfo,
      }),
      invalidatesTags: ["comment", "post"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
