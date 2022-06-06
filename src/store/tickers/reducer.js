import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickersList: [],
};

const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    setTickers: (state, action) => {
      const tickersWithId = action.payload.map((ticker, i) => ({
        ...ticker,
        change: ticker.change.startsWith("-")
          ? ticker.change
          : "+" + ticker.change,
      }));
      state.tickersList = tickersWithId;
    },
    removeTicker: (state, action) => {
      const newArr = state.tickersList.filter(
        (ticker) => ticker.ticker !== action.payload
      );
      state.tickersList = newArr;
    },
  },
});

export const { setTickers, removeTicker } = tickersSlice.actions;

export default tickersSlice.reducer;
