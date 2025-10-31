import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  pagination: {
    totalCount: 0,
    pageNumber: 1,
    pageSize: 50,
  },
  stats: {
    totalCount: 0,
    pendingCount: 0,
    inProcessCount: 0,
    processedCount: 0,
    averageDurationSeconds: 0,
    inVerificationCount: 0,
    verifiedCount: 0,
  },
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  dateRange: "TODAY",
  selectedFilters: {},
  //
  queryFilter: {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    dateRange: "TODAY",
    status: "",
  },
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload.invoices || [];
      const role = action.payload.role || "store";
      const stats = action.payload.stats || {};
      state.pagination = action.payload.pagination || {
        totalCount: 0,
        pageNumber: 1,
        pageSize: 50,
      };
      state.stats = {
        totalCount: stats.totalCount || 0,
        pendingCount: role === "store" ? stats.pendingCount || 0 : 0,
        inProcessCount: role === "store" ? stats.inProcessCount || 0 : 0,
        processedCount: stats.processedCount || 0,
        averageDurationSeconds: stats.averageDurationSeconds || 0,
        inVerificationCount:
          action.payload.stats?.pendingCount !== "store"
            ? action.payload.stats?.inVerificationCount || 0
            : 0,
        verifiedCount:
          action.payload.stats?.pendingCount !== "store"
            ? action.payload.stats?.verifiedCount || 0
            : 0,
      };
    },
    setStatsStore: (state, action) => {
      state.stats = {
        totalCount: action.payload?.totalCount || 0,
        pendingCount: action.payload?.pendingCount || 0,
        inProcessCount: action.payload?.inProcessCount || 0,
        processedCount: action.payload?.processedCount || 0,
        averageDurationSeconds: action.payload?.averageDurationSeconds || 0,
      };
      console.log("Stats updated:", state.stats);
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload || new Date().toISOString();
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload || new Date().toISOString();
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload || "TODAY";
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload || {};
    },
    setPageNumber: (state, action) => {
      state.pagination.pageNumber = action.payload || 1;
    },
    setPageSize: (state, action) => {
      state.pagination.pageSize = action.payload || 50;
    },
    //
    saveInvoices: (state, action) => {
      state.invoices = action.payload.invoices || [];
    },
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
      const role = action.payload.role || "store";
      const stats = action.payload || {};
      state.stats = {
        totalCount: stats.totalCount || 0,
        // pendingCount: role === "store" ? stats.pendingCount || 0 : 0,
        pendingCount: stats.pendingCount,
        inProcessCount: role === "store" ? stats.inProcessCount || 0 : 0,
        processedCount: stats.processedCount || 0,
        averageDurationSeconds: stats.averageDurationSeconds || 0,
        inVerificationCount: stats?.inVerificationCount || 0,
        verifiedCount: stats?.verifiedCount || 0,
      };
    },
  },
});

export const {
  setInvoices,
  setStartDate,
  setStatsStore,
  setEndDate,
  setDateRange,
  setSelectedFilters,
  setPageNumber,
  setPageSize,
  //
  saveInvoices,
  setQueryFilter,
  clearQueryFilter,
  setSummary,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
