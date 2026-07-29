import { statusTrackingClient } from "@/app/api-client";

export const statusProgressApi = statusTrackingClient.injectEndpoints({
    endpoints: (builder) => ({
        getStatusTracker: builder.query({
            query: (token) => ({
                url: `/api/v2/status-tracker`,
                method: "GET",
                params: { token },
            }),
            providesTags: ["status_tracker"],
            // transformResponse: (response) => response.value,
        }),
    }),
});

export const { useGetStatusTrackerQuery } = statusProgressApi;
