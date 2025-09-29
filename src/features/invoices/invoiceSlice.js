import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  pagination: {
    totalCount: 0,
    pageNumber: 1,
    pageSize: 50,
  },
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  totalWeight: 0,
  storeRemarks: "",
  verificationRemarks: "",
  dateRange: "TODAY",
  search: "",
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload.invoices;
      state.pagination = action.payload.pagination;
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
    setStoreTotalWeight: (state, action) => {
      // if (!state.storeDetails) {
      //   state.storeDetails = { totalWeight: 0, storeRemarks: "" };
      // }
      state.totalWeight = action.payload;
    },
    setStoreRemarks: (state, action) => {
      state.storeRemarks = action.payload;
    },
    setVerificationRemarks: (state, action) => {
      state.verificationRemarks = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setInvoices,
  setStartDate,
  setEndDate,
  setDateRange,
  setStoreTotalWeight,
  setStoreRemarks,
  setSearch,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
