import { apiSlice } from "../api/apiSlice";

export const dealApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDeals: builder.query({
      query: () => "/deal",
      providesTags: ["deals"],
    }),
    addDeal: builder.mutation({
      query: (deal) => ({
        url: "/deal",
        method: "POST",
        body: deal,
      }),
      invalidatesTags: ["deals"],
    }),
    updateDeal: builder.mutation({
      query: (deal) => ({
        url: `/deal`,
        method: "PUT",
        body: deal,
      }),
      invalidatesTags: ["deals"],
    }),
    deleteDeal: builder.mutation({
      query: (id) => ({
        url: `/deal`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["deals"],
    }),
  }),
});

export const {
  useFetchDealsQuery,
  useAddDealMutation,
  useUpdateDealMutation,
  useDeleteDealMutation,
} = dealApi;
