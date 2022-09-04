import { createSlice } from "@reduxjs/toolkit";

export const loader = createSlice({
  name: "loader",
  initialState: {
    itemDetailLoader: false,
    userAssetLoader:true,
    tradesLoader:true,
  },
  reducers: {
    setItemDetailLoader: (state, action) => {
      state.itemDetailLoader = action.payload;
    },
    setUserAssetLoader: (state, action) => {
      state.userAssetLoader = action.payload;
    },
    setTradesLoader: (state, action) => {
      state.tradesLoader = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setItemDetailLoader,setUserAssetLoader,setTradesLoader
} = loader.actions;

export default loader.reducer;
