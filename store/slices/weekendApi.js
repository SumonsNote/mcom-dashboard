import { apiSlice } from "../api/apiSlice";

export const weekendApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchWeekends: builder.query({
      query: () => "/weekend",
      providesTags: ["weekends"],
    }),
    addWeekend: builder.mutation({
      query: (weekend) => ({
        url: "/weekend",
        method: "POST",
        body: weekend,
      }),
      invalidatesTags: ["weekends"],
    }),
    updateWeekend: builder.mutation({
      query: (weekend) => ({
        url: `/weekend`,
        method: "PUT",
        body: weekend,
      }),
      invalidatesTags: ["weekends"],
    }),

    deleteWeekend: builder.mutation({
      query: (weekendId) => ({
        url: `/weekend`,
        method: "DELETE",
        body: weekendId,
      }),
      invalidatesTags: ["weekends"],
    }),
  }),
});

export const {
  useFetchWeekendsQuery,
  useAddWeekendMutation,
  useUpdateWeekendMutation,
  useDeleteWeekendMutation,
} = weekendApi;
