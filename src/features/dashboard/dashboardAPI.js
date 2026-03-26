import { apiClient } from "@/app/api-client";

export const dashboardApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAllGeneralInvoices: builder.query({
      query: (params) => ({
        url: "/general/filtered",
        method: "GET",
        params,
      }),
      providesTags: ["all_invoices"],
    }),
    queryInvoice: builder.query({
      query: (payload) => ({
        url: "/general/search",
        method: "GET",
        params: {
          searchWord: payload,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
  }),
});

export const { useGetAllGeneralInvoicesQuery, useQueryInvoiceQuery } =
  dashboardApi;
