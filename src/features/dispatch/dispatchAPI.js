import { apiClient } from "@/app/api-client";

export const dispatchApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    searchVerifiedOnDispatch: builder.query({
      query: (query) => {
        let params = { searchWord: query };
        // const paramString = params.length ? `?${params.join('&')}` : '';
        return {
          url: `/dispatch/search-verified`,
          method: "GET",
          params,
        };
      },
      providesTags: ["verified_invoices"],
    }),

    dispatchSearch: builder.query({
      query: (query) => {
        let params = { searchWord: query };
        // const paramString = params.length ? `?${params.join('&')}` : '';
        return {
          url: `/dispatch/search-dispatch`,
          method: "GET",
          params,
        };
      },
      providesTags: ["saved_dispatched"],
    }),

    getVerifiedOnDispatch: builder.query({
      query: ({ pageNumber = 1, pageSize = 20 }) => ({
        url: `/dispatch/verified?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["verified_invoices"],
    }),

    saveSelections: builder.mutation({
      query: (formData) => ({
        url: `/dispatch/save-selections`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["selected_invoices"],
    }),

    startDispatchProcess: builder.mutation({
      query: (payload) => ({
        url: `/dispatch/start`,
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["dispatch_invoices"],
    }),

    getDeliveryDriver: builder.query({
      query: (userName) => ({
        url: `/dispatch/delivery-driver?UserName=${userName}`,
        method: "GET",
      }),
      providesTags: ["dispatch_driver"],
    }),

    pushDispatchProcess: builder.mutation({
      query: (formData) => ({
        url: "/dispatch/save-push",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [
        // "dispatch_invoices",
        "dispatch_driver",
      ],
    }),

    getSavedDispatchedInvoices: builder.query({
      query: ({ pageNumber = 1, pageSize = 50 }) => ({
        url: `/dispatch/saved-dispatched?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["saved_dispatched"],
    }),

    getSavedDispatchedDetails: builder.query({
      query: (dispatchNum) => ({
        url: `/dispatch/saved-dispatched-details/${dispatchNum}`,
        method: "GET",
      }),
      providesTags: ["saved_dispatched_details"],
    }),

    getAggregateDispatches: builder.query({
      query: () => ({
        url: `/dispatch/aggregate`,
        method: "GET",
      }),
      providesTags: ["saved_dispatched"],
    }),
    getSelectedInvoices: builder.query({
      query: (query) => ({
        url: `/dispatch/get-selected-invoices?${query}`,
        method: "GET",
      }),
      providesTags: ["selected_invoices"],
    }),
    removeSelectedInvoices: builder.mutation({
      query: (payload) => ({
        url: `/dispatch/remove-selections`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["selected_invoices"],
    }),
    recallInvoices: builder.mutation({
      query: (payload) => ({
        url: `/general/recall-doc`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["verified_invoices"],
    }),
    createDispatches: builder.mutation({
      query: (payload) => ({
        url: `/dispatch/CreateDispatches`,
        method: "POST",
        params: {
          username: payload?.userName,
        },
        body: payload,
      }),
      invalidatesTags: ["selected_invoices"],
    }),
    DeleteDispatchInvoice: builder.mutation({
      query: (dispatchdetnum) => ({
        url: `/dispatch/DeleteDispatchInvoice`,
        method: "DELETE",
        params: {
          dispatchdetnum,
        },
      }),
      invalidatesTags: ["selected_invoices"],
    }),
  }),
});

export const {
  useSearchVerifiedOnDispatchQuery,
  useDispatchSearchQuery,
  useGetDeliveryDriverQuery,
  usePushDispatchProcessMutation,
  useGetVerifiedOnDispatchQuery,
  useSaveSelectionsMutation,
  useStartDispatchProcessMutation,
  useGetSavedDispatchedInvoicesQuery,
  useGetSavedDispatchedDetailsQuery,
  useGetAggregateDispatchesQuery,
  useGetSelectedInvoicesQuery,
  useRemoveSelectedInvoicesMutation,
  useRecallInvoicesMutation,
  useCreateDispatchesMutation,
  useDeleteDispatchInvoiceMutation,
} = dispatchApi;
