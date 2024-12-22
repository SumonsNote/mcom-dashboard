import { apiSlice } from "../api/apiSlice";

export const sliderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSliders: builder.query({
      query: () => "/slider",
      providesTags: ["sliders"],
    }),
    addSlider: builder.mutation({
      query: (slider) => ({
        url: "/slider",
        method: "POST",
        body: slider,
      }),
      invalidatesTags: ["sliders"],
    }),
    updateSlider: builder.mutation({
      query: (slider) => ({
        url: `/slider`,
        method: "PUT",
        body: slider,
      }),
      invalidatesTags: ["sliders"],
    }),

    deleteSlider: builder.mutation({
      query: (sliderId) => ({
        url: `/slider`,
        method: "DELETE",
        body: sliderId,
      }),
      invalidatesTags: ["sliders"],
    }),
  }),
});

export const {
  useFetchSlidersQuery,
  useAddSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderApi;
