import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Customers", "Businesses"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "customers/",
      providesTags: ["Customers"],
    }),
    getCustomerDetails: builder.query({
      query: (id) => `customers/${id}`,
      providesTags: ["Customers"],
    }),
    createCustomer: builder.mutation({
      query: (data) => ({
        url: "customers/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers"],
    }),
    getBusinesses: builder.query({
      query: () => "businesses/",
      providesTags: ["Businesses"],
    }),
    createBusiness: builder.mutation({
      query: (data) => ({
        url: "businesses/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Businesses", "Customers"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerDetailsQuery,
  useCreateCustomerMutation,
  useGetBusinessesQuery,
  useCreateBusinessMutation,
} = customerApi;
