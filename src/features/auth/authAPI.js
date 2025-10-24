import { apiClient } from "@/app/api-client";

export const authApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    authTransaction: builder.mutation({
      query: (formData) => ({
        url: "/auth/AuthTransaction",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthTransactionMutation } = authApi;
