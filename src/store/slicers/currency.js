import { createSlice } from "@reduxjs/toolkit";

export const currency = createSlice({
  name: "currency",
  initialState: {
    currencyInfo: [
      {
        value: null,
        label: null,
      },
    ],
    currencyAddress: null,
    currencySymbol: null,
  },
  reducers: {
    setCurrencyInfo: (state, action) => {
      state.currencyInfo = action.payload;
    },
    setCurrencyAddress: (state, action) => {
      state.collectionLoading = action.payload;
    },
    setCurrencySymbol: (state, action) => {
      state.collectionError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    setCurrencyInfo,
    setCurrencyAddress,
    setCurrencySymbol,
} = currency.actions;

export default currency.reducer;
