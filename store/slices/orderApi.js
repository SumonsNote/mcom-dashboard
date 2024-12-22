import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: () => "/order",
      providesTags: ["orders"],
    }),
    fetchSingleOrders: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: ["order"],
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: "/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),

    updateOrder: builder.mutation({
      query: (order) => ({
        url: `/order/${order._id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ["orders", "order"],
    }),
  }),
});

export const {
  useFetchOrdersQuery,
  useFetchSingleOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
} = ordersApi;
