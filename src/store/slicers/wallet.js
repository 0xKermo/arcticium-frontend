import { createSlice } from '@reduxjs/toolkit'

export const wallet = createSlice({
  name: 'wallet',
  initialState: {
    walletAddress: null,
    account: null,
    provider : null
  },
  reducers: {
    setWalletAddress: (state,action) => {
      state.walletAddress  = action.payload
    },
    setAccount: (state,action) => {
      state.account  = action.payload
    },
    setProvider: (state,action) => {
        state.provider  = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setWalletAddress, setProvider,setAccount } = wallet.actions

export default wallet.reducer