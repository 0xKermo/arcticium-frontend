import { createSlice } from "@reduxjs/toolkit";

export const openTrades = createSlice({
  name: "openTrades",
  initialState: {
    _openTrades: null,
  },
  reducers: {
    setOpenTrades: (state, action) => {
      state._openTrades  = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    setOpenTrades,
} = openTrades.actions;

export default openTrades.reducer;
