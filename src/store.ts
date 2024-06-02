import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { coinApi } from "./inventory/queries/coinApi";
import { customerApi } from "./customers/queries/customersApi";
import { invoicesApi } from "./invoices/queries/invoicesApi";

export const store = configureStore({
  reducer: {
    [coinApi.reducerPath]: coinApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      coinApi.middleware, 
      customerApi.middleware, 
      invoicesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
