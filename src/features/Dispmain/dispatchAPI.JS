import { apiClient } from "@/app/api-client";

export const dispatchApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getDispatchSearch: builder.query({
      query: ({ invoiceNo, cusCode }) => ({
        url: `/dispatch/dispatch-search`,
        method: "GET",
        params: {
          invoiceNo,
          cusCode,
        },
      }),
      providesTags: ["dispatch_invoices"],
    }),

   
    getSavedDispatched: builder.query({
      query: ({ pageNumber = 1, pageSize = 50 }) => ({
        url: `/dispatch/saved-dispatched`,
        method: "GET",
        params: {
          pageNumber,
          pageSize,
        },
      }),
      providesTags: ["saved_dispatched"],
    }),

 
    getSavedDispatchedDetails: builder.query({
      query: (dispatchNumber) => ({
        url: `/dispatch/saved-dispatched-details/${dispatchNumber}`,
        method: "GET",
      }),
      providesTags: ["saved_dispatched_details"],
    }),
  }),
});

export const {
  useGetDispatchSearchQuery,
  useGetSavedDispatchedQuery,
  useGetSavedDispatchedDetailsQuery, 
} = dispatchApi;
