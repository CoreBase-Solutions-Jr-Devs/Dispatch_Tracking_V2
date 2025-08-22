import { apiClient } from '@/app/api-client';

export const invoicesApi = apiClient.injectEndpoints({
	endpoints: (builder) => ({
		uploadInvoice: builder.mutation({
			query: (formData) => ({
				url: '/invoices/upload',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['invoices'],
		}),

		getAllInvoices: builder.query({
			query: ({ keyword, pageNumber = 1, pageSize = 10 } = {}) => ({
				url: '/invoices/all',
				method: 'GET',
				params: { keyword, pageNumber, pageSize },
			}),
			providesTags: ['invoices'],
		}),

		deleteInvoices: builder.mutation({
			query: (invoiceIds) => ({
				url: '/invoices/bulk-delete',
				method: 'DELETE',
				body: { invoiceIds },
			}),
			invalidatesTags: ['invoices'],
		}),

		downloadInvoices: builder.mutation({
			query: (invoiceIds) => ({
				url: '/invoices/download',
				method: 'POST',
				body: { invoiceIds },
			}),
		}),
	}),
});

export const {
	useUploadInvoiceMutation,
	useGetAllInvoicesQuery,
	useDeleteInvoicesMutation,
	useDownloadInvoicesMutation,
} = invoicesApi;
