
    import { apiClient } from '@/app/api-client';

export const filterApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    filterInvoices: builder.mutation({
      query: ({
        startDate,
        endDate,
        dateRange,
        search,
        filters,
        pageNumber,
        pageSize,
      }) => ({
        url: '/invoices/filter',
        method: 'POST',
        body: {
          startDate,
          endDate,
          dateRange,
          search,
          filters,
          pageNumber,
          pageSize,
        },
      }),
      invalidatesTags: ['invoices'],
    }),
  }),
});

export const { useFilterInvoicesMutation } = filterApi;
