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
      providesTags: ["saved_dispatched"],
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
      invalidatesTags: ["dispatch_invoices"],
    }),
    startDispatchProcess: builder.mutation({
      query: (payload) => ({
        url: `dispatch/dispatch/start`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["dispatch_invoices"],
    }),
    getDeliveryDriver: builder.query({
      query: (userId) => ({
        url: `/dispatch/delivery-driver?UserId=${userId}`,
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
      invalidatesTags: ["dispatch_invoices", "dispatch_driver"],
    }),
    getSavedDispatchedInvoices: builder.query({
      query: ({ pageNumber = 1, pageSize = 50 }) => ({
        url: `/dispatch/saved-dispatched?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["selected_dispatch_invoices"],
    }),
    getSavedDispatchedDetails: builder.query({
      query: (dispatchNumber) => ({
        url: `/dispatch/saved-dispatched-details/${dispatchNumber}`,
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
} = dispatchApi;
