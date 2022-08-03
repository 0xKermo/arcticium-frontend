import { createSlice } from '@reduxjs/toolkit'

export const collection = createSlice({
  name: 'collection',
  initialState: {
    collections:[],
    collectionLoading:true,
    collectionError:null ,
    collectionName:null
  },
  reducers: {
    setCollections: (state,action) => {
      state.collections  = action.payload
    },
    setCollectionLoading: (state,action) => {
        state.collectionLoading  = action.payload
      },
      setCollectionError: (state,action) => {
        state.collectionError  = action.payload
      },
      setCollectionName: (state,action) => {
        state.collectionName  = action.payload
      },
    
  },
})

// Action creators are generated for each case reducer function
export const { setCollections,setCollectionLoading,setCollectionError,setCollectionName } = collection.actions

export default collection.reducer