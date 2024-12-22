import { apiSlice } from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => "/category",
      providesTags: ["categories"],
    }),
    fetchSingleCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: (category) => ({
        url: `/category`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useFetchSingleCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesApi;
