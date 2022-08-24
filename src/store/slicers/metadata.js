import { createSlice } from '@reduxjs/toolkit'

export const metadata = createSlice({
  name: 'metadata',
  initialState: {
    metadata:null,
    ownerWallet:null,
    metadataLoading:true,
    metadataError:null 
  },
  reducers: {
    setMetadata: (state,action) => {
      state.metadata  = action.payload
    },
    setMetadataLoading: (state,action) => {
        state.metadataLoading  = action.payload
      },
      setMetadataError: (state,action) => {
        state.metadataError  = action.payload
      },
      setOwnerWallet: (state,action) => {
        state.ownerWallet  = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setMetadata,setMetadataLoading,setMetadataError,setOwnerWallet } = metadata.actions

export default metadata.reducer