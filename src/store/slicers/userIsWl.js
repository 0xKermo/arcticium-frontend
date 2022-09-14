import { createSlice } from '@reduxjs/toolkit'

export const userIsWl = createSlice({
  name: 'userIsWl',
  initialState: {
    userIsWl: false
  },
  reducers: {
    setUserIsWl: (state,action) => {
      state.userIsWl  = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserIsWl } = userIsWl.actions

export default userIsWl.reducer