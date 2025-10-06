import { apiClient } from "@/app/api-client";

export const dispatchApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET SELECTED INVOICE FOR DISPATCH
    getSavedDispatched: builder.query({
      query: ({ pageNumber = 1, pageSize = 50 }) => ({
        url: `/dispatch/saved-dispatched`,
        method: "GET",
        params: {
          pageNumber,
          pageSize,
        },
      }),
      providesTags: ["saved_dispatched"],
    }),
    // GET VERIFIED INVOICE FOR SELECTION
    getVerifiedOnDispatch: builder.query({
      query: ({ pageNumber = 1, pageSize = 20 }) => ({
        url: `/dispatch/verified?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["verified_invoices"],
    }),
    getDispatchDriver: builder.query({
      query: (userId) => ({
        url: `/dispatch/delivery-driver?UserId=${userId}`,
        method: "GET",
      }),
      providesTags: ["dispatch_driver"],
    }),
    startDispatchProcess: builder.mutation({
      query: (payload) => ({
        url: `dispatch/dispatch/start`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["dispatch_invoices"],
    }),
    pushDispatchProcess: builder.mutation({
      query: (formData) => ({
        url: "/dispatch/save-push",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["dispatch_invoices", "dispatch_driver"],
    }),
    dispatchSearch: builder.query({
      query: (query) => {
        let params = { searchWord: query };
        // const paramString = params.length ? `?${params.join('&')}` : '';
        return {
          url: `/dispatch/search`,
          method: "GET",
          params,
        };
      },
      providesTags: ["verified_invoices"],
    }),

    //

    getSavedDispatchedDetails: builder.query({
      query: (dispatchNumber) => ({
        url: `/dispatch/saved-dispatched-details/${dispatchNumber}`,
        method: "GET",
      }),
      providesTags: ["saved_dispatched_details"],
    }),
  }),
});

export const {
  useGetSavedDispatchedQuery,
  useGetVerifiedOnDispatchQuery,
  useGetDispatchDriverQuery,
  useStartDispatchProcessMutation,
  usePushDispatchProcessMutation,
  useDispatchSearchQuery,
  //
  // useGetDispatchSearchQuery,
  useGetSavedDispatchedDetailsQuery,
} = dispatchApi;
