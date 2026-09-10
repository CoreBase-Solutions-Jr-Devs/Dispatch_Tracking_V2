import { apiClient } from "@/app/api-client";
import { getBcode } from "@/constant";

let bcode = getBcode();

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
      query: ({ searchWord }) => ({
        url: "/general/search",
        method: "GET",
        params: {
          searchWord: searchWord,
          bCode: bcode,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
  }),
});

export const { useGetAllGeneralInvoicesQuery, useQueryInvoiceQuery } =
  dashboardApi;
