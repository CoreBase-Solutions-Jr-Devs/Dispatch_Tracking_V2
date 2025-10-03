import { apiClient } from "@/app/api-client";

export const VerificationApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getVerificationInvoices: builder.query({
      query: ({ pageNumber = 1, pageSize = 50 } = {}) => ({
        url: "/verification",
        method: "GET",
        params: { pageNumber, pageSize },
      }),
      providesTags: ["verification_invoices"],
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
          // format as yyyy-MM-dd
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
      providesTags: ["verification_invoices"],
    }),

    getVerificationTracking: builder.query({
      query: (docNum) => ({
        url: `/verification/${docNum}/verification-tracking`, // ✅ matches API spec
        method: "GET",
      }),
      providesTags: ["verification_tracking"],
    }),

    startVerificationProcess: builder.mutation({
      query: (docNum) => ({
        url: `/verification/${docNum}/verification/start`,
        method: "POST",
      }),
      invalidatesTags: ["verification_tracking", "verification_invoices"],
    }),

    pushVerificationInvoice: builder.mutation({
      query: ({ docNum, totalWeightKg = 0, verificationRemarks = "" }) => ({
        url: `/verification/${docNum}/verification/push`,
        method: "POST",
        body: { docNum, totalWeightKg, verificationRemarks },
      }),
      invalidatesTags: ["verification_invoices", "verification_tracking"],
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
