import { apiClient } from "@/app/api-client";


export const dispatchApi = apiClient.injectEndpoints({
    endpoints: (builder) => ({
        dispatchSearch: builder.query({
            query: (userId) => ({
                url: `/dispatch/dispatch-search?userId=${userId}`,
                method: 'GET',
            }),
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
                url: `/dispatch/delivery-driver?userId=${userId}`,
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
            query: (page = 1, pageSize = 50) => ({
                url: `/dispatch/invoices?page=${page}&pageSize=${pageSize}`,
                method: 'GET',
            }),
            providesTags: ['dispatch_invoices'],
        }),
    }),
})

export const {
    useDispatchSearchQuery,
    useSelectDispatchInvoiceMutation,
    useGetDeliveryDriverQuery,
    usePushDispatchProcessMutation,
    useGetDispatchInvoicesQuery,
} = dispatchApi;