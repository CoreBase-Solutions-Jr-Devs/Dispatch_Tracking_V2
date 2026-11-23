import { getBcode } from "@/constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: {},
  queryFilter: {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    dateRange: "TODAY",
    status: "",
    dispatchNumber: "",
    adminKind: "",
    kind: "",
    stage: "",
    finishedStage: "",
    number: "",
    _module: "Store",
    minimumMinutes: "",
    bCode: "",
    branches: [],
    adminRole: "",
    staffDate: new Date().toISOString(),
  },
};

const dashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    setQueryFilter: (state, action) => {
      state.queryFilter = {
        startDate: new Date(action.payload.startDate).toISOString(),
        endDate: new Date(action.payload.endDate).toISOString(),
        dateRange: action.payload.dateRange,
        status: action.payload.status,
        dispatchNumber: action.payload.dispatchNumber,
        kind: action.payload.kind,
        adminKind: action.payload.adminKind,
        stage: action.payload.stage,
        finishedStage: action.payload.finishedStage,
        number: action.payload.number,
        minimumMinutes: action.payload.minimumMinutes,
        _module: action.payload._module,
        branches: action.payload.branches,
        bCode: action.payload.bcode,
        adminRole: action.payload.adminRole,
        staffDate: new Date(action.payload.staffDate).toISOString(),
      };
    },
    clearQueryFilter: (state, action) => {
      state.queryFilter = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        dateRange: "TODAY",
        status: "",
        dispatchNumber: "",
        bCode: "",
        kind: "",
        adminKind: "",
        stage: "",
        finishedStage: "",
        number: "",
        minimumMinutes: "",
        _module: "",
        branches: [],
        adminRole: "",
        staffDate: new Date().toISOString(),
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
