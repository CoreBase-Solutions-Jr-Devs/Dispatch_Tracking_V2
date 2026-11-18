import { createSlice } from "@reduxjs/toolkit";
let bcode = localStorage.getItem("bcode");

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
    number: "",
    stage: "",
    _module: "Store",
    minimumMinutes: "",
    bCode: bcode,
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
        number: action.payload.number,
        minimumMinutes: action.payload.minimumMinutes,
        _module: action.payload._module,
        bCode: action.payload.bCode,
      };
    },
    clearQueryFilter: (state, action) => {
      state.queryFilter = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        dateRange: "TODAY",
        status: "",
        dispatchNumber: "",
        bCode: 0,
        kind: "",
        adminKind: "",
        stage: "",
        number: "",
        minimumMinutes: "",
        _module: "",
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
