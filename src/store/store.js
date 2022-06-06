import { configureStore } from "@reduxjs/toolkit";

import tickersReducer from "./tickers/reducer";

export const store = configureStore({
  reducer: {
    tickers: tickersReducer,
  },
});
