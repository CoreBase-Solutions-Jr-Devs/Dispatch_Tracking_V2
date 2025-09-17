import { apiClient } from "@/app/api-client";


export const dispatchApi = apiClient.injectEndpoints({
    endpoints: (builder) => ({
        dispatchSearch: builder.query({
            query: ({ invoiceNo, cusCode }) => {
                let params = [];
                if (invoiceNo) params.push(`invoiceNo=${invoiceNo}`);
                if (cusCode) params.push(`cusCode=${cusCode}`);
                const paramString = params.length ? `?${params.join('&')}` : '';
                return {
                    url: `/dispatch/dispatch-search${paramString}`,
                    method: 'GET',
                };
            },
            providesTags: ['dispatch_invoices'],
        }),
        selectDispatchInvoice: builder.mutation({
            query: (formData) => ({
                url: '/dispatch/select-invoice',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['dispatch_invoices'],
        }),
        getDeliveryDriver: builder.query({
            query: (userId) => ({
                url: `/dispatch/delivery-driver?UserId=${userId}`,
                method: 'GET',
            }),
            providesTags: ['dispatch_driver'],
        }),
        pushDispatchProcess: builder.mutation({
            query: (formData) => ({
                url: '/dispatch/push-process',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['dispatch_invoices', 'dispatch_driver'],
        }),
        getDispatchInvoices: builder.query({
            query: ({ page = 1, pageSize = 50 }) => ({
                url: `/dispatch/invoices?page=${page}&pageSize=${pageSize}`,
                method: 'GET',
            }),
            providesTags: ['dispatch_invoices'],
        }),
        getVerifiedOnDispatch: builder.query({
            query: ({ pageNumber = 1, pageSize = 20 }) => ({
                url: `/dispatch/verified?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'GET',
            }),
            providesTags: ['verified_invoices'],
        }),
        saveSelections: builder.mutation({
            query: (formData) => ({
                url: `/dispatch/save-selections`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['dispatch_invoices'],
        }),
        selectedCusCode: builder.query({
            query: ({ pageNumber = 1, pageSize = 20 }) => ({
                url: `/dispatch/selected-cuscode?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'GET',
            }),
            providesTags: ['selected_dispatch_invoices'],
        }),

    }),
})

export const {
    useDispatchSearchQuery,
    useSelectDispatchInvoiceMutation,
    useGetDeliveryDriverQuery,
    usePushDispatchProcessMutation,
    useGetDispatchInvoicesQuery,
    useGetVerifiedOnDispatchQuery,
    useSaveSelectionsMutation,
    useSelectedCusCodeQuery,
} = dispatchApi;