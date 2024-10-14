import { baseApi } from "../api/baseApi";


const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation({
      query: (paymentObject) => {
        // console.log("Sending payment object to API:", paymentObject);
        return {
          url: `/payment/create`, // Ensure the correct endpoint
          method: "POST",
          body: paymentObject, // Send the likeObject as the body
        };
      },
      invalidatesTags: ["payment"], // Cache invalidation
    }),

    getAllLikes: build.query({
      query: () => {
        return {
          url: '/likes',
          method: "GET",
        };
      },
      providesTags: ["like"],
    }),
  }),
});


export const { useCreatePaymentMutation, useGetAllLikesQuery } = paymentApi;