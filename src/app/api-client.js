import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const auth = getState().auth;
		if (auth?.accessToken) {
			headers.set('Authorization', `Bearer ${auth.accessToken}`);
		}
		return headers;
	},
});

const statusTrackingBaseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_STATUS_TRACKING_URL,
	credentials: 'include',
	prepareHeaders: (headers) => {
		const accessKey = import.meta.env.VITE_CLIENT_ACCESS_KEY;
		if (accessKey) headers.set('accesskey', accessKey);
		headers.set('accept', 'text/plain');
		return headers;
	},
});

export const apiClient = createApi({
	reducerPath: 'api', // Add API client reducer to root reducer
	baseQuery: baseQuery,
	refetchOnMountOrArgChange: true, // Refetch on mount or arg change
	tagTypes: ['invoices', 'analytics', 'report'], // Tag types for RTK Query
	endpoints: () => ({}), // Endpoints for RTK Query
});

export const statusTrackingClient = createApi({
	reducerPath: 'statusTrackingApi',
	baseQuery: statusTrackingBaseQuery,
	tagTypes: ['status_tracker'],
	endpoints: () => ({}),
});
