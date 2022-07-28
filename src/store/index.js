import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './slicers/wallet'
import userNftsReducer from './slicers/userNfts'

export default configureStore({
  reducer: {
    wallet : walletReducer,
    userNfts : userNftsReducer
  },
})