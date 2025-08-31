import { apiClient } from "@/app/api-client";

export const overviewAPI = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/overview",
        method: "GET"
      }),
    }),
  }),
});

export const { useGetOverviewQuery } = overviewAPI;
