import { createSlice } from "@reduxjs/toolkit";

export const profileOperation = createSlice({
  name: "profileOperation",
  initialState: {
    openMenu: true,
    openMenu1: false,
    openMenu2: false,
    openMenu3: false,
  },
  reducers: {
    setOpenMenu: (state, action) => {
      state.openMenu = action.payload;
    },
    setOpenMenu1: (state, action) => {
      state.openMenu1 = action.payload;
    },
    setOpenMenu2: (state, action) => {
      state.openMenu2 = action.payload;
    },
    setOpenMenu3: (state, action) => {
      state.openMenu3 = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenMenu, setOpenMenu1, setOpenMenu2, setOpenMenu3 } =
profileOperation.actions;

export default profileOperation.reducer;
