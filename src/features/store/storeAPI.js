import { apiClient } from "@/app/api-client";
 
export const StoreApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getStoreInvoices: builder.query({
      query: ({ pageNumber = 1, pageSize = 50 } = {}) => ({
        url: "/store",
        method: "GET",
        params: { pageNumber, pageSize },
      }),
    }),
    //
    getFilteredStoreInvoices: builder.query({
      query: ({
        role,
        pageNumber = 1,
        pageSize = 50,
        startDate,
        endDate,
        workflowStatus,
        dateRange,
      } = {}) => ({
        url:
          role === "verification"
            ? "/verification/filtered"
            : "/store/filtered",
        method: "GET",
        params: {
          pageNumber,
          pageSize,
          startDate: startDate
            ? new Date(startDate).toISOString().split("T")[0]
            : undefined,
          endDate: endDate
            ? new Date(endDate).toISOString().split("T")[0]
            : undefined,
          workflowStatus,
          dateRange,
        },
      }),
      providesTags: ["store_invoices"],
    }),
 
    searchStoreInvoices: builder.query({
      query: ({ searchWord }) => ({
        url: "/store/search",
        method: "GET",
        params: { searchWord },
      }),
      invalidatesTags: ["store_invoices"],
    }),
 
    getStoreTracking: builder.query({
      query: (docNum) => ({
        url: `/store/${docNum}/store-tracking`,
        method: "GET",
      }),
      providesTags: ["store_tracking"],
    }),
 
    startStoreProcess: builder.mutation({
      query: (docNum) => ({
        url: `/store/${docNum}/start`,
        method: "POST",
      }),
      invalidatesTags: ["store_tracking", "store_invoices"],
    }),
 
    pushStoreInvoice: builder.mutation({
      query: ({ docNum, totalWeightKg, storeRemarks }) => ({
        url: `/store/${docNum}/push`,
        method: "POST",
        body: { docNum, totalWeightKg, storeRemarks },
      }),
      invalidatesTags: ["store_invoices", "store_tracking"],
    }),
  }),
});
 
export const {
  useGetStoreInvoicesQuery,
  useGetFilteredStoreInvoicesQuery,
  useLazyGetFilteredStoreInvoicesQuery,
  useSearchStoreInvoicesQuery,
  useGetStoreTrackingQuery,
  useStartStoreProcessMutation,
  usePushStoreInvoiceMutation,
} = StoreApi;
 