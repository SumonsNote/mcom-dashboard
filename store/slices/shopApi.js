import { apiSlice } from "../api/apiSlice";

export const shopsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchShopProducts: builder.query({
      query: (searchTerm) =>
        `/shop?${searchTerm ? `search=${searchTerm}` : ""}`,
      providesTags: ["products"],
    }),
  }),
});

export const { useFetchShopProductsQuery } = shopsApi;
