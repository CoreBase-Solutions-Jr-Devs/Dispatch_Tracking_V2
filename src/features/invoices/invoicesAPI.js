import { apiClient } from '@/app/api-client';

export const invoicesApi = apiClient.injectEndpoints({
	endpoints: (builder) => ({
		filterInvoices: builder.mutation({
			query: (formData) => ({
				url: '/invoices/filter',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['invoices'],
		}),

		getAllInvoices: builder.query({
			query: ({
				StartDate,
				EndDate,
				docNumber,
				cuscode,
				PageNumber = 1,
				PageSize = 10,
			} = {}) => ({
				url: '/invoices',
				method: 'GET',
				params: {
					StartDate,
					EndDate,
					docNumber,
					cuscode,
					PageNumber,
					PageSize,
				},
			}),
			providesTags: ['invoices'],
		}),

		filterOptions: builder.query({
			query: () => ({
				url: '/invoices/filter-options',
				method: 'GET',
			}),
			providesTags: ['filter_options'],
		}),
		// STORE TRACKING
		filterStoreInvoices: builder.mutation({
			query: (formData) => ({
				url: '/invoices/store-filter',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['store_invoices'],
		}),

		getStoreTrackingDetails: builder.query({
			query: ({ docNum } = {}) => ({
				url: `/invoices/${docNum}/store-tracking`,
				method: 'GET',
			}),
			providesTags: ['store_details'],
		}),

		storeStart: builder.mutation({
			query: (docNum) => ({
				url: `/invoices/${docNum}/store/start`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: ['invoices'],
		}),

		storePush: builder.mutation({
			query: (payload) => ({
				url: `/invoices/${payload.docNum}/store/push`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['invoices'],
		}),
		// VERIFICATION TRACKING
		getVerificationTrackingDetails: builder.query({
			query: ({ docNum } = {}) => ({
				url: `/invoices/${docNum}/verification-tracking`,
				method: 'GET',
			}),
			providesTags: ['verification_details'],
		}),

		verificationStart: builder.mutation({
			query: (docNum) => ({
				url: `/invoices/${docNum}/verification/start`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: ['invoices'],
		}),

		verificationPush: builder.mutation({
			query: (payload) => ({
				url: `/invoices/${payload.docNum}/verification/push`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['invoices'],
		}),

		// COLLECTION TRACKING
		getCollectionTrackingDetails: builder.query({
			query: ({ docNum } = {}) => ({
				url: `/invoices/${docNum}/collection-tracking`,
				method: 'GET',
			}),
			providesTags: ['collection_details'],
		}),

		collectionStart: builder.mutation({
			query: (docNum) => ({
				url: `/invoices/${docNum}/collection/start`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: ['invoices'],
		}),

		collectionPush: builder.mutation({
			query: (payload) => ({
				url: `/invoices/${payload.docNum}/collection/push`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['invoices'],
		}),

		collectionRecall: builder.mutation({
			query: (docNum) => ({
				url: `/invoices/${docNum}/collection/recall`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: ['invoices'],
		}),

		// DELIVERY TRACKING

		viewInvoicePDF: builder.query({
			query: ({ docNum } = {}) => ({
				url: `/invoices/${docNum}/delivery/pdf`,
				method: 'GET',
			}),
			providesTags: ['invoices'],
		}),
		getDeliveryTrackingDetails: builder.query({
			query: ({ docNum } = {}) => ({
				url: `/invoices/${docNum}/delivery-tracking`,
				method: 'GET',
			}),
			providesTags: ['delivery_details'],
		}),
		deliveryStart: builder.mutation({
			query: (docNum) => ({
				url: `/invoices/${docNum}/delivery/start`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: ['invoices'],
		}),
		deliveryComplete: builder.mutation({
			query: (docNum, payload) => ({
				url: `/invoices/${docNum}/delivery/complete`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['invoices'],
		}),
	}),
});

export const {
	useFilterInvoicesMutation,
	useGetAllInvoicesQuery,
	useFilterOptionsQuery,
	// STORE TRACKING
	useFilterStoreInvoicesMutation,
	useGetStoreTrackingDetailsQuery,
	useStoreStartMutation,
	useStorePushMutation,
	// VERIFICATION TRACKING
	useGetVerificationTrackingDetailsQuery,
	useVerificationStartMutation,
	useVerificationPushMutation,
	// COLLECTION TRACKING
	useGetCollectionTrackingDetailsQuery,
	useCollectionStartMutation,
	useCollectionRecallMutation,
	useCollectionPushMutation,
	// DELIVERY TRACKING
	
	useViewInvoicePDFQuery,  
	useGetDeliveryTrackingDetailsQuery,
	useDeliveryCompleteMutation,
	useDeliveryStartMutation,
} = invoicesApi;
