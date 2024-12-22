/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api`,
    headers: {
      "X-Website-Origin": "true",
    },
  }),

  tagTypes: [
    "stocks",
    "stock",
    "products",
    "product",
    "customers",
    "customer",
    "orders",
    "order",
    "users",
    "user",
    "customerProfiles",
  ],

  endpoints: (builder) => ({}),
});
