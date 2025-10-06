import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carMake: "",
  carPlate: "",
  clientName: "",
  clientId: "",
  collectionType: "",
  customerCourierName: "",
  customerCourierId: 0,
  customerCourierPhone: "",
  dispatchId: 0,
  dispatchIds: [],
  dispatchRemarks: "",
  deliveryDriver: null,
  driverName: "",
  driverId: 0,
  driverLicenseNo: "",
  email: "",
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
  personalId: "",
  phoneNo: "",
  regNo: "",
  routeCode: 0,
  routeName: "",
  //
  driverDetails: {},
  courierDetails: {},
  clientDetails: {},
  //
  updatedDispatches: [],
};

const dispatchSlice = createSlice({
  name: "dispatch",
  initialState,
  reducers: {
    setDispatch: (state, action) => {
      state.dispatchIds = action.payload.dispatchIds;
      state.collectionType = action.payload.collectionType;
      state.routeCode = action.payload.routeCode;
      state.routeName = action.payload.routeName;
      state.driverName = action.payload.driverName;
      state.driverId = action.payload.driverId;
      state.carMake = action.payload.carMake;
      state.carPlate = action.payload.carPlate;
      state.customerCourierName = action.payload.customerCourierName;
      state.customerCourierId = action.payload.customerCourierId;
      state.customerCourierPhone = action.payload.customerCourierPhone;
      state.dispatchRemarks = action.payload.dispatchRemarks;
      state.isPush = action.payload.isPush;
    },
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
      state.customerCourierPhone = action.payload.customerCourierPhone;
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
      state.pageSize = action.payload.pageSize;
    },
    setRouteCode: (state, action) => {
      state.routeCode = action.payload.routeCode;
    },
    setRouteName: (state, action) => {
      state.routeName = action.payload.routeName;
    },
    //
    setDriverDetails: (state, action) => {
      state.driverDetails = action.payload;
      // state.driverId = action.payload?.driverId;
      // state.driverName = action.payload?.driverName;
      // state.personalId = action.payload?.personalId;
      // state.driverLicenseNo = action.payload?.driverLicenseNo;
      // state.phoneNo = action.payload?.phoneNo;
      // state.email = action.payload?.email;
      // state.carMake = action.payload?.carMake;
      // state.regNo = action.payload?.regNo;
    },
    setSelectedDipatches: (state, action) => {
      state.updatedDispatches = action.payload;
    },
    setCourierDetails: (state, action) => {
      state.courierDetails = action.payload;
    },
    setClientDetails: (state, action) => {
      state.clientDetails = action.payload;
    },
  },
});

export const {
  setInvoices,
  setCarMake,
  setCarPlate,
  setCollectionType,
  setCustomerCourierName,
  setCustomerCourierId,
  setCustomerCourierPhone,
  setDeliveryDriver,
  setDispatchId,
  setDispatchIds,
  setDispatchRemarks,
  setDriverName,
  setDriverId,
  setInvoiceNo,
  setIsPush,
  setIsSelected,
  setPageNumber,
  setPageSize,
  setRouteCode,
  setRouteName,
  setDispatch,
  //
  setSelectedDipatches,
  setDriverDetails,
  setCourierDetails,
  setClientDetails,
} = dispatchSlice.actions;

export default dispatchSlice.reducer;
