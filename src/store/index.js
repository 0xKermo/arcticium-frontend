import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './slicers/wallet'
import userNftsReducer from './slicers/userNfts'
import profileOperationReducer from './slicers/profileOperations'
import metadataReducer from './slicers/metadata'
import itemDetailOperationReducer from './slicers/itemDetailOperations'
import collectionReducer from './slicers/collections'
import currencyReducer from './slicers/currency'
import targetNftMetadataReducer from './slicers/targetNftMetadata'

export default configureStore({
  reducer: {
    wallet : walletReducer,
    userNfts : userNftsReducer,
    profileOperation : profileOperationReducer,
    itemDetailOperation : itemDetailOperationReducer,
    metadata: metadataReducer,
    collections: collectionReducer,
    currency:currencyReducer,
    targetMetadata:targetNftMetadataReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})