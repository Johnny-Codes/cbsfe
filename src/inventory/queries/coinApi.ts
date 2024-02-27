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
    getCoinGrades: builder.query({
      query: () => "coins/coingrades/",
    }),
    getCoinStrikes: builder.query({
      query: () => "coins/strike/",
    }),
    addCoin: builder.mutation({
      query: (data) => {
        console.log("submit data", data);
        return {
          url: "coins/",
          method: "POST",
          body: data,
        };
      },
    }),
    getPcgsCoinInfo: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: "coins/pcgs_coin_data/",
          method: "POST",
          body: data,
        };
      },
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
  useGetCoinGradesQuery,
  useGetCoinStrikesQuery,
  useAddCoinMutation,
  useGetPcgsCoinInfoMutation,
} = coinApi;
