import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { coinApi } from "./inventory/queries/coinApi";
import { customerApi } from "./customers/queries/customersApi";

export const store = configureStore({
  reducer: {
    [coinApi.reducerPath]: coinApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinApi.middleware, customerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
