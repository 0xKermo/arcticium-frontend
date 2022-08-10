import { createSlice } from "@reduxjs/toolkit";

export const bidsOfItem = createSlice({
  name: "bidsOfItem",
  initialState: {
    bidItemOwner: [],
    bidItemCollectionAddress:["0x123"],
    bidItemImage: [],
    bidtemBidTime: [],
    bidItemTokenId:[],
  },
  reducers: {
    setBidItemOwner: (state, action) => {
      state.bidItemOwner = action.payload;
    },
    setBidItemCollectionAddress: (state, action) => {
      state.bidItemCollectionAddress = action.payload;
    },
    setBidItemImage: (state, action) => {
      state.bidItemImage = action.payload;
    },
    setBidItemBidTime: (state, action) => {
      state.bidItemBidTime = action.payload;
    },
    setBidItemTokenId: (state, action) => {
        state.bidItemTokenId = action.payload;
      },
  },
});

// Action creators are generated for each case reducer function
export const {
    setBidItemOwner,
    setBidItemCollectionAddress,
    setBidItemImage,
    setBidItemBidTime,
    setBidItemTokenId
} = bidsOfItem.actions;

export default bidsOfItem.reducer;
