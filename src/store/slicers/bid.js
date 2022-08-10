import { createSlice } from "@reduxjs/toolkit";

export const bid = createSlice({
  name: "bid",
  initialState: {
    bidOwner: null,
    bidCollectionAddress: null,
    bidItemId: 0,
    bidCurrencyType: null,
    bidCurrencyAmount: 0,
    bidTradeId: 0,
    biddedItemOwner: null,
    biddedItemCollectionAddress: null,
    biddedItemNftId: 0,
    bidTradeType: 0,
    bidExpiration: null,
    bidId: 0,
  },
  reducers: {
    setBidOwner: (state, action) => {
      state.bidOwner = action.payload;
    },
    setBidCollectionAddress: (state, action) => {
      state.bidCollectionAddress = action.payload;
    },
    setBidItemId: (state, action) => {
      state.bidItemId = action.payload;
    },
    setBidCurrencyType: (state, action) => {
      state.bidCurrencyType = action.payload;
    },
    setBidCurrencyAmount: (state, action) => {
      state.bidCurrencyAmount = action.payload;
    },
    setBidTradeId: (state, action) => {
      state.bidTradeId = action.payload;
    },
    setBiddedItemOwner: (state, action) => {
      state.biddedItemOwner = action.payload;
    },
    setBiddedItemCollectionAddress: (state, action) => {
      state.biddedItemCollectionAddress = action.payload;
    },
    setBidTradeType: (state, action) => {
      state.bidTradeType = action.payload;
    },
    setBidExpiration: (state, action) => {
      state.bidExpiration = action.payload;
    },
    setBidId: (state, action) => {
      state.bidId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBidOwner,
  setBidCollectionAddress,
  setBidCurrencyAmount,
  setBidCurrencyType,
  setBidExpiration,
  setBidId,
  setBidItemId,
  setBidTradeId,
  setBidTradeType,
  setBiddedItemCollectionAddress,
  setBiddedItemOwner,
} = bid.actions;

export default bid.reducer;
