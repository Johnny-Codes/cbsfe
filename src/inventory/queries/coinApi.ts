import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coinApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Coins"],
  endpoints: (builder) => ({
    getCoin: builder.query({
      query: (id) => `coins/${id}/`,
      providesTags: ["Coins"],
    }),
    updateCoin: builder.mutation({
      query: (data) => {
        return {
          url: `coins/${data.id}/`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["Coins"],
    }),
    getCoinsByType: builder.query({
      query: (id) => `coins/cointypes/${id}/`,
      providesTags: ["Coins"],
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
      query: (data) => ({
        url: "coins/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coins"],
    }),
    getPcgsCoinInfo: builder.mutation({
      query: (data) => {
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
  useUpdateCoinMutation,
  useGetCoinsByTypeQuery,
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