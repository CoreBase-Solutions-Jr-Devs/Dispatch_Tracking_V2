// features/verification/verificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Format helper (yyyy-MM-dd)
const formatDate = (date) => new Date(date).toISOString().split("T")[0];

const initialState = {
  verificationInvoices: [],
  pagination: {
    totalCount: 0,
    pageNumber: 1,
    pageSize: 50,
    totalPages: 0,
  },
  startDate: formatDate(new Date()), // 👉 yyyy-MM-dd
  endDate: formatDate(new Date()), // 👉 yyyy-MM-dd
  dateRange: "TODAY",
  workflowStatus: "",
  search: "",
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setVerificationInvoices: (state, action) => {
      state.verificationInvoices = action.payload.items || [];
      state.pagination = action.payload.pagination || {
        totalCount: 0,
        pageNumber: 1,
        pageSize: 50,
        totalPages: 0,
      };
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload
        ? formatDate(action.payload)
        : formatDate(new Date());
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload
        ? formatDate(action.payload)
        : formatDate(new Date());
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload || "TODAY";
    },
    setWorkflowStatus: (state, action) => {
      state.workflowStatus = action.payload || "";
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pagination.pageNumber = action.payload || 1;
    },
    setPageSize: (state, action) => {
      state.pagination.pageSize = action.payload || 50;
    },
  },
});

export const {
  setVerificationInvoices,
  setStartDate,
  setEndDate,
  setDateRange,
  setWorkflowStatus,
  setSearch,
  setPageNumber,
  setPageSize,
} = verificationSlice.actions;

export default verificationSlice.reducer;
