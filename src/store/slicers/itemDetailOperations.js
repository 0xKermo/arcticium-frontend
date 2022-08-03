import { createSlice } from "@reduxjs/toolkit";

export const itemDetailOperation = createSlice({
  name: "itemDetailOperation",
  initialState: {
    openMenu: true,
    openMenu1: false,
    openCheckout: false,
    openCheckoutBid: false,
    choosen : 0
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
  },
});

// Action creators are generated for each case reducer function
export const { setOpenMenu, setOpenMenu1, setOpenCheckout, setOpenCheckoutBid,setChoosen } =
itemDetailOperation.actions;

export default itemDetailOperation.reducer;
