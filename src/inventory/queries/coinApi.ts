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
      query: (data) => ({
        url: "coins/",
        method: "POST",
        body: data,
      }),
      // onError: (error, variables, context) => {
      //   console.log("error", error);
      //   // Check if the error response contains the sku error message
      //   if (error.data && error.data.sku && Array.isArray(error.data.sku)) {
      //     const errorMessage = error.data.sku[0]; // Extract the error message
      //     // Handle the duplicate SKU error here, such as displaying a message to the user
      //     console.error("Duplicate SKU error:", errorMessage);
      //   } else {
      //     // Handle other types of errors
      //     console.error("An error occurred while adding coin:", error);
      //   }
      //   throw error; // Re-throw the error to propagate it to the component
      // },
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
