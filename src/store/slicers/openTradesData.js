import { createSlice } from "@reduxjs/toolkit";

export const openTrades = createSlice({
  name: "openTrades",
  initialState: {
    _openTrades: null,
    _openTradesNonFilter:null,
  },
  reducers: {
    setOpenTrades: (state, action) => {
      state._openTrades  = action.payload;
    },
    setOpenTradesNonFilter: (state, action) => {
      state._openTradesNonFilter  = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    setOpenTrades,
    setOpenTradesNonFilter
} = openTrades.actions;

export default openTrades.reducer;
