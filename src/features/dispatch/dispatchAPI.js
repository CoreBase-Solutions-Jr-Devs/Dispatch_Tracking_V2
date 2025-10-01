import { apiClient } from "@/app/api-client";


export const dispatchApi = apiClient.injectEndpoints({
    endpoints: (builder) => ({
        dispatchSearch: builder.query({
            query: (query) => {
                let params = { invoiceNo:0, cusCode:"" };
                if(isNaN(Number(query))){
                    params.cusCode = query
                } else {
                    params.invoiceNo = Number(query)
                }
               // const paramString = params.length ? `?${params.join('&')}` : '';
                return {
                    url: `/dispatch/dispatch-search`,
                    method: 'GET',
                    params
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
                url: '/dispatch/save-push',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['dispatch_invoices', 'dispatch_driver'],
        }),
        // getDispatchInvoices: builder.query({
        //     query: ({ page = 1, pageSize = 50 }) => ({
        //         url: `/dispatch/invoices?page=${page}&pageSize=${pageSize}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['dispatch_invoices'],
        // }),
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
            providesTags: ['dispatch_invoices'],
        }),
        startDispatchProcess: builder.mutation({
            query: (payload) => ({
                url: `dispatch/dispatch/start`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['dispatch_invoices'],
        }),
        saveSelectedDispatches: builder.mutation({
            query: (formData) => ({
                url: `/dispatch/save-dispatch`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['dispatch_invoices'],
        }),
        getSavedDispatchedInvoices: builder.query({
            query:({ pageNumber = 1, pageSize = 50 }) => ({
                url: `dispatch/saved-dispatched?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'GET',
            }),
            providesTags: ['saved_invoices', 'dispatched_invoices'],
        }),
        getSavedDispatchedInvoiceDetails: builder.query({
            query: () => ({
                url: `dispatch/saved-dispatched-details/${dispatchNumber}`,
                method: 'GET',
            }),
            providesTags: ['saved_invoice', 'dispatched_invoice'],
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
    useSaveSelectedDispatchesMutation,
    useStartDispatchProcessMutation,
    useGetSavedDispatchedInvoicesQuery,
    useGetSavedDispatchedInvoiceDetailsQuery
} = dispatchApi;