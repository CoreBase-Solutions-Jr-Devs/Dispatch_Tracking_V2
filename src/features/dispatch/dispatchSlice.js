import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dispatchId: 0,
    deliveryDriver: null,
    invoiceNo: 0,
    invoices: [],
    isSelected: true,
    pageNumber: 0,
    pageSize: 0,
    pagination: {
        totalCount: 0,
        pageNumber: 1,
        pageSize: 50,
    },
}

const dispatchSlice = createSlice({
    name: 'dispatch',
    initialState,
    reducers: {
        setInvoices: (state, action) => {
            state.invoices = action.payload.invoices;
            state.pagination = action.payload.pagination;
        },
        setDeliveryDriver: (state, action) => {
            state.deliveryDriver = action.payload.deliveryDriver;
        },
        setDispatchId: (state, action) => {
            state.dispatchId = action.payload.dispatchId;
        },
        setInvoiceNo: (state, action) => {
            state.invoiceNo = action.payload.invoiceNo;
        },
        setIsSelected: (state, action) => {
            state.isSelected = action.payload.isSelected;
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload.pageNumber;
        },
        setPageSize: (state, action) => {
            state.pageSize =  action.payload.pageSize;
        },
    }
})

export const {
    setInvoices,
    setDeliveryDriver,
    setDispatchId, setInvoiceNo,
    setIsSelected, setPageNumber, setPageSize
} = dispatchSlice.actions;

export default dispatchSlice.reducer;