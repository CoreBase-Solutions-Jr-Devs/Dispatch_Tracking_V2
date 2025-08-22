import { apiClient } from '@/app/api-client';

export const reportsApi = apiClient.injectEndpoints({
	endpoints: (builder) => ({
		createReport: builder.mutation({
			query: (name) => ({
				url: '/report/create',
				method: 'POST',
				body: { name },
			}),
			invalidatesTags: ['report'],
		}),

		getAllReports: builder.query({
			query: (params) => {
				const { pageNumber = 1, pageSize = 10 } = params || {};
				return {
					url: '/report/all',
					method: 'GET',
					params: {
						pageNumber,
						pageSize,
					},
				};
			},
			providesTags: ['report'],
		}),

		deleteReport: builder.mutation({
			query: (reportId) => ({
				url: `/report/${reportId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['report'],
		}),
	}),
});

export const {
	useCreateReportMutation,
	useGetAllReportsQuery,
	useDeleteReportMutation,
} = reportsApi;
