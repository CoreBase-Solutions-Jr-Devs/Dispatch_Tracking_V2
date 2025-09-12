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
      providesTags: ["customerCode"],
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
    deliveryComplete: builder.mutation({
      query: (docNum, payload) => ({
        url: `/invoices/${docNum}/delivery/complete`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["invoices"],
    }),
  }),
});

export const {
  // DELIVERY TRACKING
  useGetSearchDeliveryInvoicesQuery,
  useGetCustomerCodeSuggestionsQuery,
  useViewInvoicePDFQuery,
  useGetDeliveryTrackingDetailsQuery,
  useDeliveryCompleteMutation,
  useDeliveryStartMutation,
} = deliveryApi;
