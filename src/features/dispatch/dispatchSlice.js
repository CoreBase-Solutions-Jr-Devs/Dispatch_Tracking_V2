import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    carMake: "",
    carPlate: "",
    collectionType: "",
    customerCourierName: "string",
    customerCourierId: 0,
    customerCourierPhone: "string",
    dispatchId: 0,
    dispatchIds: [],
    dispatchRemarks: "",
    deliveryDriver: null,
    driverName: "",
    driverId: 0,
    invoiceNo: 0,
    invoices: [],
    isPush: true,
    isSelected: true,
    pageNumber: 0,
    pageSize: 0,
    pagination: {
        totalCount: 0,
        pageNumber: 1,
        pageSize: 50,
    },
    routeCode: 0,
    routeName: "",
}

const dispatchSlice = createSlice({
    name: 'dispatch',
    initialState,
    reducers: {
        setInvoices: (state, action) => {
            state.invoices = action.payload.invoices;
            state.pagination = action.payload.pagination;
        },
        setCarMake: (state, action) => {
            state.carMake = action.payload.carMake;
        },
        setCarPlate: (state, action) => {
            state.carPlate = action.payload.carPlate;
        },
        setCollectionType: (state, action) => {
            state.collectionType = action.payload.collectionType;
        },
        setCustomerCourierName: (state, action) => {
            state.customerCourierName = action.payload.customerCourierName;
        },
        setCustomerCourierId: (state, action) => {
            state.customerCourierId = action.payload.customerCourierId;
        },
        setCustomerCourierPhone: (state, action) => {
            state.customerCourierPhone= action.payload.customerCourierPhone;
        },
        setDeliveryDriver: (state, action) => {
            state.deliveryDriver = action.payload.deliveryDriver;
        },
        setDispatchId: (state, action) => {
            state.dispatchId = action.payload.dispatchId;
        },
        setDispatchIds: (state, action) => {
            state.dispatchIds = action.payload.dispatchIds;
        },
        setDispatchRemarks: (state, action) => {
            state.dispatchRemarks = action.payload.dispatchRemarks;
        },
        setDriverName: (state, action) => {
            state.driverName = action.payload.driverName;
        },
        setDriverId: (state, action) => {
            state.driverId = action.payload.driverId;
        },
        setInvoiceNo: (state, action) => {
            state.invoiceNo = action.payload.invoiceNo;
        },
        setIsPush: (state, action) => {
            state.isPush = action.payload.isPush;
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
        setRouteCode: (state, action) => {
            state.routeCode =  action.payload.routeCode;
        },
        setRouteName: (state, action) => {
            state.routeName =  action.payload.routeName;
        },
    }
})

export const {
  setInvoices,setCarMake,setCarPlate,
  setCollectionType,setCustomerCourierName,
  setCustomerCourierId,setCustomerCourierPhone,setDeliveryDriver,
  setDispatchId,setDispatchIds,setDispatchRemarks,
  setDriverName,setDriverId,setInvoiceNo,
  setIsPush,setIsSelected,setPageNumber,
  setPageSize,setRouteCode,setRouteName,
} = dispatchSlice.actions;

export default dispatchSlice.reducer;