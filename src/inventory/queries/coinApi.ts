import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coinApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    getCoin: builder.query({
      query: (id) => `coins/${id}/`,
    }),
    getSku: builder.query({
      query: () => "sku/random/",
    }),
    getMints: builder.query({
      query: () => "coins/mints/",
    }),
  }),
});

export const { useGetCoinQuery, useGetSkuQuery, useGetMintsQuery } = coinApi;
