import { apiSlice } from "../api/apiSlice";

export const countdownApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCountdowns: builder.query({
      query: () => "/countdown",
      providesTags: ["countdowns"],
    }),
    addCountdown: builder.mutation({
      query: (countdown) => ({
        url: "/countdown",
        method: "POST",
        body: countdown,
      }),
      invalidatesTags: ["countdowns"],
    }),
    updateCountdown: builder.mutation({
      query: (countdown) => ({
        url: `/countdown`,
        method: "PUT",
        body: countdown,
      }),
      invalidatesTags: ["countdowns"],
    }),

    deleteCountdown: builder.mutation({
      query: (countdownId) => ({
        url: `/countdown`,
        method: "DELETE",
        body: countdownId,
      }),
      invalidatesTags: ["countdowns"],
    }),
  }),
});

export const {
  useFetchCountdownsQuery,
  useAddCountdownMutation,
  useUpdateCountdownMutation,
  useDeleteCountdownMutation,
} = countdownApi;
