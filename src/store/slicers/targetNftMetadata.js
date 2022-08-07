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
    }
  },
  reducers: {
    setTargetMetadata: (state,action) => {
      state.targetMetadata  = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTargetMetadata } = targetNftMetadata.actions

export default targetNftMetadata.reducer