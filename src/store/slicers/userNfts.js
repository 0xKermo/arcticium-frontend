import { createSlice } from '@reduxjs/toolkit'

export const userNfts = createSlice({
  name: 'userNfts',
  initialState: {
    _nfts: []
  },
  reducers: {
    setUserNfts: (state,action) => {
      state._nfts  = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserNfts } = userNfts.actions

export default userNfts.reducer