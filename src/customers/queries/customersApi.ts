import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["Customers"],
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => "customers/",
            providesTags: ["Customers"],
        }),
        createCustomer: builder.mutation({
            query: (data) => (console.log("data", data),{
                url: "customers/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Customers"],
        }),
    }),
});

export const { useGetCustomersQuery, useCreateCustomerMutation } = customerApi;