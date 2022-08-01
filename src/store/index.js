import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './slicers/wallet'
import userNftsReducer from './slicers/userNfts'
import profileOperationReducer from './slicers/profileOperations'
export default configureStore({
  reducer: {
    wallet : walletReducer,
    userNfts : userNftsReducer,
    profileOperation : profileOperationReducer
  },
})