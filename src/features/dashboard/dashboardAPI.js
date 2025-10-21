import { apiClient } from "@/app/api-client";

export const dashboardApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAllGeneralInvoices: builder.query({
      query: (params) => ({
        url: "/general/all",
        method: "GET",
        params,
      }),
      providesTags: ["all_invoices"],
    }),
  }),
});

export const { useGetAllGeneralInvoicesQuery } = dashboardApi;
