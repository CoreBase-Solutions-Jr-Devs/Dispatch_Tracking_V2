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
  useGetDeliveryInvoicesQuery,
  useSelectDeliveryInvoicesMutation,
  //
  useViewInvoicePDFQuery,
  useGetDeliveryTrackingDetailsQuery,
  useDeliveryCompleteMutation,
  useDeliveryStartMutation,
} = deliveryApi;
