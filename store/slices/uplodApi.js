import { apiSlice } from "../api/apiSlice";

export const uploadsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (formData) => ({
        url: "/cloudinary",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => response.secure_url,
    }),
  }),
});

export const { useUploadMutation } = uploadsApi;
