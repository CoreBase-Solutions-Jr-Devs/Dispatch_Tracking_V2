 
import { apiClient } from "@/app/api-client";
 
export const VerificationApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getVerificationInvoices: builder.query({
      query: ({ pageNumber = 1, pageSize = 50 } = {}) => ({
        url: "/verification",
        method: "GET",
        params: { pageNumber, pageSize },
      }),
    }),
 
    getFilteredVerificationInvoices: builder.query({
      query: ({
        pageNumber = 1,
        pageSize = 50,
        startDate,
        endDate,
        workflowStatus,
        dateRange,
      } = {}) => ({
        url: "/verification/filtered",
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
      providesTags: ["verification_invoices"],
    }),
 
    searchVerificationInvoices: builder.query({
      query: ({ searchWord }) => ({
        url: "/verification/search",
        method: "GET",
        params: { searchWord },
      }),
      invalidatesTags: ["verification_invoices"],
    }),
 
    getVerificationTracking: builder.query({
      query: (docNum) => ({
        url: `/verification/${docNum}/verification-tracking`,
        method: "GET",
      }),
      providesTags: ["verification_tracking"],
    }),
 // ✅ Start verification process API
    startVerificationProcess: builder.mutation({
      query: ({ docNum, userName }) => ({
        url: `/verification/${docNum}/${userName}/start`,
        method: "POST",
      }),
      invalidatesTags: [
        "verification_tracking",
        "verification_invoices",
        "store_invoices",
      ],
    }),

    // ✅ Push verification invoice to Dispatch stage
    pushVerificationInvoice: builder.mutation({
      query: ({ docNum, userName, totalWeightKg = 0, verificationRemarks = "" }) => ({
        url: `/verification/${docNum}/push`,
        method: "POST",
        body: { docNum, userName, totalWeightKg, verificationRemarks },
      }),
      invalidatesTags: [
        "verification_tracking",
        "verification_invoices",
        "store_invoices",
      ],
    }),
  }),
});
 
export const {
  useGetVerificationInvoicesQuery,
  useGetFilteredVerificationInvoicesQuery,
  useLazyGetFilteredVerificationInvoicesQuery,
  useSearchVerificationInvoicesQuery,
  useGetVerificationTrackingQuery,
   useStartVerificationProcessMutation,
  usePushVerificationInvoiceMutation,
} = VerificationApi;
 