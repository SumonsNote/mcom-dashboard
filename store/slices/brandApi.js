import { apiSlice } from "../api/apiSlice";

export const brandsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBrands: builder.query({
      query: () => "/product/brand",
      providesTags: ["brands"],
    }),
    fetchBrandsByCategory: builder.query({
      query: (category) => `/product/brand?category=${category}`,
      providesTags: ["brands"],
    }),
    addBrand: builder.mutation({
      query: (brand) => ({
        url: "/product/brand",
        method: "POST",
        body: brand,
      }),
      invalidatesTags: ["brands"],
    }),

    updateBrand: builder.mutation({
      query: (brand) => ({
        url: `/product/brand`,
        method: "PUT",
        body: brand,
      }),
      invalidatesTags: ["brands"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useFetchBrandsQuery,
  useUpdateBrandMutation,
  useFetchBrandsByCategoryQuery,
} = brandsApi;
