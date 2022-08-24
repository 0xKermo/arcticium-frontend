import { createSlice } from "@reduxjs/toolkit";

export const loader = createSlice({
  name: "loader",
  initialState: {
    itemDetailLoader: false,
  },
  reducers: {
    setItemDetailLoader: (state, action) => {
      state.itemDetailLoader = action.payload;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const {setItemDetailLoader
} = loader.actions;

export default loader.reducer;
