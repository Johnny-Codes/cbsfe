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
    getFamily: builder.query({
      query: () => "coins/family/",
    }),
    getDenomination: builder.query({
      query: () => "coins/denominations/",
    }),
    getCoinTypes: builder.query({
      query: () => "coins/cointypes/",
    }),
    getGradingCompanies: builder.query({
      query: () => "coins/gradingservices/",
    }),
  }),
});

export const {
  useGetCoinQuery,
  useGetSkuQuery,
  useGetMintsQuery,
  useGetFamilyQuery,
  useGetDenominationQuery,
  useGetCoinTypesQuery,
  useGetGradingCompaniesQuery,
} = coinApi;
