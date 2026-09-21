import { authClient } from "@/app/api-client";

let { user } = JSON.parse(localStorage.getItem("authState")) ?? {};

export const authApi = authClient.injectEndpoints({
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
        url: `${user?.baseUrl}/Auth/AuthTransaction`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthTransactionMutation } = authApi;
