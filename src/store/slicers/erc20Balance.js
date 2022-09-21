import { createSlice } from "@reduxjs/toolkit";

export const erc20Balance = createSlice({
  name: "erc20Balance",
  initialState: {
    aETH: 0,
    aDAI: 0,
    aSTARK: 0,
    balanceLoading: true,
  },
  reducers: {
    setAETH: (state, action) => {
      state.aETH = action.payload;
    },
    setADAI: (state, action) => {
      state.aDAI = action.payload;
    },
    setASTARK: (state, action) => {
      state.aSTARK = action.payload;
    },
    setBalanceLoading: (state, action) => {
      state.balanceLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAETH, setADAI, setASTARK, setBalanceLoading } =
  erc20Balance.actions;

export default erc20Balance.reducer;
