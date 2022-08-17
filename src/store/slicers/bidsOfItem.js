import { createSlice } from "@reduxjs/toolkit";

export const bidsOfItem = createSlice({
  name: "bidsOfItem",
  initialState: {
    bidedItemOwner: [],
    bidedItemAddress:[],
    bidedItemImage: [],
    bidedtemBidTime: [],
    bidedItemId:[],
  },
  reducers: {
    setBidedItemOwner: (state, action) => {
      state.bidedItemOwner = action.payload;
    },
    setBidedItemAddress: (state, action) => {
      state.bidedItemAddress = action.payload;
    },
    setBidedItemImage: (state, action) => {
      state.bidedItemImage = action.payload;
    },
    setBidedItemBidTime: (state, action) => {
      state.bidedtemBidTime = action.payload;
    },
    setBidedItemId: (state, action) => {
        state.bidedItemId = action.payload;
      },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBidedItemOwner,
  setBidedItemAddress,
  setBidedItemImage,
  setBidedItemBidTime,
  setBidedItemId
} = bidsOfItem.actions;

export default bidsOfItem.reducer;
