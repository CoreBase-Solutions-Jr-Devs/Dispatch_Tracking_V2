import { apiClient } from '@/app/api-client';

export const storeApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getStoreTracking: builder.query({
      query: (docNum) => ({
        url: `/invoices/${docNum}/store-tracking`,
        method: 'GET',
      }),
      providesTags: ['invoices'],
    }),

    startStoreProcess: builder.mutation({
      query: (docNum) => ({
        url: `/invoices/${docNum}/store/start`,
        method: 'POST',
      }),
      invalidatesTags: ['invoices'],
    }),

    pushToVerification: builder.mutation({
      query: ({ docNum, totalWeightKg, storeRemarks }) => ({
        url: `/invoices/${docNum}/store/push`,
        method: 'POST',
        body: { docNum, totalWeightKg, storeRemarks },
      }),
      invalidatesTags: ['invoices'],
    }),
  }),
});

export const {
  useGetStoreTrackingQuery,
  useStartStoreProcessMutation,
  usePushToVerificationMutation,
} = storeApi;
