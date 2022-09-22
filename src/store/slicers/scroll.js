import { createSlice } from "@reduxjs/toolkit";

export const scroll = createSlice({
  name: "scroll",
  initialState: {
    _offset: 0,
    _limit: 48,
  },
  reducers: {
    setOffset: (state, action) => {
      state._offset = action.payload;
    },
    setLimit: (state, action) => {
      state._limit = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    setOffset,
    setLimit,
} = scroll.actions;

export default scroll.reducer;
