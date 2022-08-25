import { createSlice } from "@reduxjs/toolkit";

export const loader = createSlice({
  name: "loader",
  initialState: {
    itemDetailLoader: false,
    userAssetLoader:true,
  },
  reducers: {
    setItemDetailLoader: (state, action) => {
      state.itemDetailLoader = action.payload;
    },
    setUserAssetLoader: (state, action) => {
      state.userAssetLoader = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setItemDetailLoader,setUserAssetLoader
} = loader.actions;

export default loader.reducer;
