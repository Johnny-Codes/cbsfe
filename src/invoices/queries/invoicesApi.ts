import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Invoice"],
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "invoices/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
} = invoicesApi;