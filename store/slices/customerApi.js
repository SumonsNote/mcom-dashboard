import { apiSlice } from "../api/apiSlice";

export const customerProfilesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCustomerProfiles: builder.query({
      query: (mobile) =>
        `/customerProfile?${mobile ? `mobile=${mobile}` : ""}}`,
      providesTags: ["customerProfiles"],
    }),
    fetchSingleCustomerProfile: builder.query({
      query: (customerId) => `/customerProfile/${customerId}`,
      providesTags: ["customerProfiles"],
    }),
  }),
});

export const {
  useFetchCustomerProfilesQuery,
  useFetchSingleCustomerProfileQuery,
} = customerProfilesApi;
