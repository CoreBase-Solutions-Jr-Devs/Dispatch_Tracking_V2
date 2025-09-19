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
 
  }),
});

export const { useGetDispatchSearchQuery, useGetDispatchInvoicesQuery } =
  dispatchApi;
