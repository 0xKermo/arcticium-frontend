import { createSlice } from "@reduxjs/toolkit";

export const itemDetailOperation = createSlice({
  name: "itemDetailOperation",
  initialState: {
    openMenu: true,
    openMenu1: false,
    openCheckout: false,
    openCheckoutBid: false,
    choosen: 0,
    targetCollectionAddress: 0,
    targetNftId: 0,
    targetNftLink: null,
    voyagerLink: null,
    choosenCurrency: null,
    currencyAmount:0,
    makeOfferBtn:false,
  },
  reducers: {
    setOpenMenu: (state, action) => {
      state.openMenu = action.payload;
    },
    setOpenMenu1: (state, action) => {
      state.openMenu1 = action.payload;
    },
    setOpenCheckout: (state, action) => {
      state.openCheckout = action.payload;
    },
    setOpenCheckoutBid: (state, action) => {
      state.openCheckoutBid = action.payload;
    },
    setChoosen: (state, action) => {
      state.choosen = action.payload;
    },
    setTargetCollectionAddress: (state, action) => {
      state.targetCollectionAddress = action.payload;
    },
    setTargetNftId: (state, action) => {
      state.targetNftId = action.payload;
    },
    setTargetNftLink: (state, action) => {
      state.targetNftLink = action.payload;
    },
    setChoosenCurrency: (state, action) => {
      state.choosenCurrency = action.payload;
    },
    setCurrencyAmount: (state, action) => {
      state.currencyAmount = action.payload;
    },
    setVoyagerLink: (state, action) => {
      state.voyagerLink = action.payload;
    },
    setMakeOfferBtn: (state, action) => {
      state.makeOfferBtn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOpenMenu,
  setOpenMenu1,
  setOpenCheckout,
  setOpenCheckoutBid,
  setChoosen,
  setTargetCollectionAddress,
  setTargetNftId,
  setTargetNftLink,
  setChoosenCurrency,
  setVoyagerLink,
  setCurrencyAmount,
  setMakeOfferBtn
} = itemDetailOperation.actions;

export default itemDetailOperation.reducer;
