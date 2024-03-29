import { createSlice } from "@reduxjs/toolkit";

export const userAssets = createSlice({
  name: "userAssets",
  initialState: {
    userAssets: [],
    userAssetsLoading: true,
    userAssetsError: null,
    profileInfo:null,
    imageIpfsUrl: null,
    nonFilterUserAsset:[]
  },
  reducers: {
    setUserAssets: (state, action) => {
      state.userAssets = action.payload;
    },
    setUserAssetsLoading: (state, action) => {
      state.userAssetsLoading = action.payload;
    },
    setUserAssetsError: (state, action) => {
      state.userAssetsError = action.payload;
    },
    setProfileInfo:(state, action) => {
      state.profileInfo = action.payload;
    },
    setImageIpfsUrl:(state, action) => {
      state.imageIpfsUrl = action.payload;
    },
    setNonFilterUserData:(state, action) => {
      state.nonFilterUserAsset = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const { setUserAssets, setUserAssetsLoading, setUserAssetsError,setProfileInfo ,setImageIpfsUrl,setNonFilterUserData} =
  userAssets.actions;

export default userAssets.reducer;
