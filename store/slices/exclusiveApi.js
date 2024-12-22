import { apiSlice } from "../api/apiSlice";

export const exclusiveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchExclusives: builder.query({
      query: () => "/exclusive",
      providesTags: ["exclusives"],
    }),
    addExclusive: builder.mutation({
      query: (exclusive) => ({
        url: "/exclusive",
        method: "POST",
        body: exclusive,
      }),
      invalidatesTags: ["exclusives"],
    }),
    updateExclusive: builder.mutation({
      query: (exclusive) => ({
        url: `/exclusive`,
        method: "PUT",
        body: exclusive,
      }),
      invalidatesTags: ["exclusives"],
    }),

    deleteExclusive: builder.mutation({
      query: (exclusiveId) => ({
        url: `/exclusive`,
        method: "DELETE",
        body: exclusiveId,
      }),
      invalidatesTags: ["exclusives"],
    }),
  }),
});

export const {
  useFetchExclusivesQuery,
  useAddExclusiveMutation,
  useUpdateExclusiveMutation,
  useDeleteExclusiveMutation,
} = exclusiveApi;
