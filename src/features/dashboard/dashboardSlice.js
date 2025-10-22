import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: {},
  queryFilter: {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    dateRange: "TODAY",
    status: "",
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setQueryFilter: (state, action) => {
      state.queryFilter = {
        startDate: new Date(action.payload.startDate).toISOString(),
        endDate: new Date(action.payload.endDate).toISOString(),
        dateRange: action.payload.dateRange,
        status: action.payload.status,
      };
    },
    clearQueryFilter: (state, action) => {
      state.queryFilter = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        dateRange: "TODAY",
        status: "",
      };
    },
    setSummary: (state, action) => {
      state.summary = { ...action.payload };
    },
  },
});

export const { setSummary, setQueryFilter, clearQueryFilter } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
