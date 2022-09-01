import { createSlice } from "@reduxjs/toolkit";

export const itemDetailOperation = createSlice({
  name: "itemDetailOperation",
  initialState: {
    openMenu: true,
    openMenu1: false,
    openCheckout: false,
    openCheckoutBid: false,
    listType: 0,
    targetCollectionAddress: null,
    targetNftId: null,
    targetNftLink: null,
    voyagerLink: null,
    choosenCurrency: null,
    currencyAmount:null,
    makeOfferBtn:false,
    itemOwner:0  // beginng = 0, 1 = owner on page, 2 = owner on page and item listed, 3 = anyone on page
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
    setListType: (state, action) => {
      state.listType = action.payload;
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
    setItemOwner: (state, action) => {
      state.itemOwner = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOpenMenu,
  setOpenMenu1,
  setOpenCheckout,
  setOpenCheckoutBid,
  setListType,
  setTargetCollectionAddress,
  setTargetNftId,
  setTargetNftLink,
  setChoosenCurrency,
  setVoyagerLink,
  setCurrencyAmount,
  setMakeOfferBtn,
  setItemOwner
} = itemDetailOperation.actions;

export default itemDetailOperation.reducer;
