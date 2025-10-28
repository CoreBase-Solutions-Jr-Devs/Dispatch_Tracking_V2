import { apiClient } from "@/app/api-client";

export const deliveryApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // DELIVERY TRACKING
    getSearchDeliveryInvoices: builder.query({
      query: ({ customerCode }) => ({
        url: "/delivery/delivery-search",
        method: "GET",
        params: {
          customerCode,
        },
      }),
      providesTags: ["searched_invoices"],
    }),
    getCustomerCodeSuggestions: builder.query({
      query: ({ input, maxResults = 10 }) => ({
        url: "/delivery/customer-codes/suggestions",
        method: "GET",
        params: {
          input,
          maxResults,
        },
      }),
      providesTags: ["customer_codes"],
    }),
    getDeliveryInvoices: builder.query({
      query: ({ pageNumber = 1, pageSize = 20 }) => ({
        url: "/delivery/invoices",
        method: "GET",
        params: {
          pageNumber,
          pageSize,
        },
      }),
      providesTags: ["delivery_invoices"],
    }),
    selectDeliveryInvoices: builder.mutation({
      query: (formData) => ({
        url: "/delivery/select-invoice",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["selected_deliveries"],
    }),
    //
    viewInvoicePDF: builder.query({
      query: ({ docNum } = {}) => ({
        url: `/invoices/${docNum}/delivery/pdf`,
        method: "GET",
      }),
      providesTags: ["invoices"],
    }),
    getDeliveryTrackingDetails: builder.query({
      query: ({ docNum } = {}) => ({
        url: `/invoices/${docNum}/delivery-tracking`,
        method: "GET",
      }),
      providesTags: ["delivery_details"],
    }),
    deliveryStart: builder.mutation({
      query: (docNum) => ({
        url: `/invoices/${docNum}/delivery/start`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["invoices"],
    }),
    // V2 API
    GetDispatchesForDeliveryHD: builder.query({
      query: (searchtext) => ({
        url: "/delivery/GetDispatchesForDeliveryHD",
        method: "GET",
        params: {
          bcode: 0,
          searchtext,
        },
      }),
      providesTags: ["dipatch_deliveries"],
    }),
    GetDispatchesForDeliveryDT: builder.query({
      query: (params) => ({
        url: "/delivery/GetDispatchesForDeliveryDT",
        method: "GET",
        params,
      }),
      providesTags: ["dipatch_deliveries_details"],
    }),
    deliveryComplete: builder.mutation({
      query: (payload) => ({
        url: `/delivery/DeliveredInvoices`,
        method: "POST",
        params: {
          Comments: payload?.remarks,
        },
        body: payload,
      }),
      invalidatesTags: ["dipatch_deliveries", "dipatch_deliveries_details"],
    }),
    GenerateOTPForDeliveredInvoices: builder.mutation({
      query: (payload) => ({
        url: `/delivery/GenerateOTPForDeliveredInvoices`,
        method: "POST",
        params: {
          dispatchnum: payload?.dispatchnum,
          bcode: payload?.bcode,
          saleinv_num: payload?.saleinv_num,
        },
        body: {},
      }),
      invalidatesTags: ["dipatch_deliveries", "dipatch_deliveries_details"],
    }),
    ValidateOTPForDeliveredInvoices: builder.mutation({
      query: (payload) => ({
        url: `/delivery/ValidateOTPForDeliveredInvoices`,
        method: "POST",
        params: {
          dispatchnum: payload?.dispatchnum,
          bcode: payload?.bcode,
          saleinv_num: payload?.saleinv_num,
          otp: payload?.otp,
        },
        body: {},
      }),
      invalidatesTags: ["dipatch_deliveries", "dipatch_deliveries_details"],
    }),
    MakeMpesaSTKPushForDeliveredInvoices: builder.mutation({
      query: (payload) => ({
        url: `/delivery/MakeMpesaSTKPushForDeliveredInvoices`,
        method: "POST",
        params: {
          dispatchnum: payload?.dispatchnum,
          bcode: payload?.bcode,
          cuscode: payload?.cuscode,
          phonenumber: payload?.phonenumber,
          amount: payload?.amount,
        },
        body: {},
      }),
      invalidatesTags: ["dipatch_deliveries", "dipatch_deliveries_details"],
    }),
    DisputedAmountsInvoices: builder.mutation({
      query: (payload) => ({
        url: `/delivery/DisputedAmountsInvoices`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["dipatch_deliveries", "dipatch_deliveries_details"],
    }),
  }),
});

export const {
  // DELIVERY TRACKING
  useGetSearchDeliveryInvoicesQuery,
  useGetCustomerCodeSuggestionsQuery,
  useGetDeliveryInvoicesQuery,
  useSelectDeliveryInvoicesMutation,
  //
  useViewInvoicePDFQuery,
  useGetDeliveryTrackingDetailsQuery,
  useDeliveryStartMutation,
  // V2 API
  useGetDispatchesForDeliveryHDQuery,
  useGetDispatchesForDeliveryDTQuery,
  useDeliveryCompleteMutation,
  useGenerateOTPForDeliveredInvoicesMutation,
  useValidateOTPForDeliveredInvoicesMutation,
  useMakeMpesaSTKPushForDeliveredInvoicesMutation,
  useDisputedAmountsInvoicesMutation,
} = deliveryApi;
