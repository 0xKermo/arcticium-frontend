import { createSlice } from '@reduxjs/toolkit'

export const metadata = createSlice({
  name: 'metadata',
  initialState: {
    metadata:{
      name: "",
      description: "",
      contract_address: "",
      image: "",
    },
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
  },
})

// Action creators are generated for each case reducer function
export const { setMetadata,setMetadataLoading,setMetadataError } = metadata.actions

export default metadata.reducer