import { createSlice } from '@reduxjs/toolkit'

export const targetNftMetadata = createSlice({
  name: 'targetNftMetadata',
  initialState: {
    targetMetadata:{
      name: "",
      description: "",
      contract_address: "",
      image: "",
      attributes: [
        {
          trait_type: "",
          value: "",
        },
      ],
    },
    targetVoyagerLink:""
  },
  reducers: {
    setTargetMetadata: (state,action) => {
      state.targetMetadata  = action.payload
    },
    setTargetVoyagerLink: (state,action) => {
      state.targetVoyagerLink  = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTargetMetadata,setTargetVoyagerLink } = targetNftMetadata.actions

export default targetNftMetadata.reducer