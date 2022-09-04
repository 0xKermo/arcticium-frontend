import { createSlice } from "@reduxjs/toolkit";

export const activities = createSlice({
  name: "activities",
  initialState: {
    activities: false,
  },
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setActivities
} = activities.actions;

export default activities.reducer;
