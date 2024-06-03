import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Invoice"],
  endpoints: (builder) => ({
    createSalesInvoice: builder.mutation({
      query: (data) => ({
        url: "sales/invoice/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useCreateSalesInvoiceMutation,
} = invoicesApi;