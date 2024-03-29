import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './slicers/wallet'
import userNftsReducer from './slicers/userNfts'
import profileOperationReducer from './slicers/profileOperations'
import metadataReducer from './slicers/metadata'
import itemDetailOperationReducer from './slicers/itemDetailOperations'
import collectionReducer from './slicers/collections'
import currencyReducer from './slicers/currency'
import targetNftMetadataReducer from './slicers/targetNftMetadata'
import bidReducer from './slicers/bid'
import bidsOfItemReducer from './slicers/bidsOfItem'
import userAssetsReducer from './slicers/userAssets'
import loaderReducer from './slicers/loader'
import  openTradesReducer  from './slicers/openTradesData'
import userIsWlReducer from './slicers/userIsWl'
import erc20BalanceReducer from './slicers/erc20Balance'
import scrollReducer from './slicers/scroll'

export default configureStore({
  reducer: {
    wallet : walletReducer,
    userNfts : userNftsReducer,
    profileOperation : profileOperationReducer,
    itemDetailOperation : itemDetailOperationReducer,
    metadata: metadataReducer,
    collections: collectionReducer,
    currency:currencyReducer,
    targetMetadata:targetNftMetadataReducer,
    bid:bidReducer,
    bidsOfItem:bidsOfItemReducer,
    userAssets:userAssetsReducer,
    loader:loaderReducer,
    openTrades: openTradesReducer,
    userIsWl:userIsWlReducer,
    erc20Balance:erc20BalanceReducer,
    scroll:scrollReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})