import { apiClient } from "@/app/api-client";


export const dispatchApi = apiClient.injectEndpoints({
    endpoints: (builder) => ({
        dispatchSearch: builder.mutation({
            query: (formData) => ({
                url: '/dispatch/dispatch-search',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['dispatch_invoices'],
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
    }),
})
