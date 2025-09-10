import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  totalWeight: 0,
  storeRemarks: "",
  dateRange: "TODAY",
  // search: "",
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload.invoices;
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
  },
});

export const {
  setInvoices,
  setStartDate,
  setEndDate,
  setDateRange,
  setStoreTotalWeight,
  setStoreRemarks,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
