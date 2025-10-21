import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
  },
});

export const { setSummary } = dashboardSlice.actions;

export default dashboardSlice.reducer;
