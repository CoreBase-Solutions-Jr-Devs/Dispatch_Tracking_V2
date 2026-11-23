import { apiClient } from "@/app/api-client";
import { getBcode } from "@/constant";

// let bcode = getBcode();

export const dashboardApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAllGeneralInvoices: builder.query({
      query: (params) => ({
        url: "/general/filtered",
        method: "GET",
        params,
      }),
      providesTags: ["all_invoices"],
    }),
    queryInvoice: builder.query({
      query: ({ searchWord }) => ({
        url: "/general/search",
        method: "GET",
        params: {
          searchWord: searchWord,
          bCode: getBcode(),
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    //
    collectionsReconcilation: builder.query({
      query: ({ dispatchNumber, bCode }) => ({
        url: "/admin/collections/reconciliation",
        method: "GET",
        params: {
          dispatchNumber: Number(dispatchNumber),
          bCode: bCode,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    adminExecptions: builder.query({
      query: ({ kind, pageNumber, pageSize, bCode }) => ({
        url: "/admin/exceptions",
        method: "GET",
        params: {
          kind: kind,
          pageNumber: pageNumber,
          pageSize: pageSize,
          bCode: bCode,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    adminAging: builder.query({
      query: ({ stage, minimumMinutes, pageNumber, pageSize, bCode }) => ({
        url: "/admin/aging",
        method: "GET",
        params: {
          bCode: bCode,
          pageNumber: pageNumber,
          pageSize: pageSize,
          stage: stage,
          minimumMinutes: Number(minimumMinutes),
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    adminDashboard: builder.query({
      query: ({ startDate, endDate, bCode }) => ({
        url: "/admin/dashboard",
        method: "GET",
        params: {
          from: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(startDate)),
          to: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(endDate)),
          bCode: bCode,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    adminInsights: builder.query({
      query: ({ startDate, endDate, bCode }) => ({
        url: "/admin/insights",
        method: "GET",
        params: {
          from: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(startDate)),
          to: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(endDate)),
          bCode: bCode,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    adminReport: builder.query({
      query: ({ _module, startDate, endDate, bCode }) => ({
        url: `/admin/reports/${_module}`,
        method: "GET",
        params: {
          module: _module,
          from: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(startDate)),
          to: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(endDate)),
          bCode: bCode,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    adminSearch: builder.query({
      query: ({ adminKind, number, pageNumber, pageSize, bCode }) => ({
        url: `/admin/search`,
        method: "GET",
        params: {
          kind: adminKind,
          number: Number(number),
          pageNumber: pageNumber,
          pageSize: pageSize,
          bCode: bCode,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    finishedInvoices: builder.query({
      query: ({ branches, finishedStage, pageNumber, pageSize }) => ({
        url: `/admin/search/finished-invoices?${branches}`,
        method: "GET",
        params: {
          stage: finishedStage,
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      }),
      // providesTags: ["all_invoices"],
    }),
    staffRoster: builder.query({
      query: ({ bCode, adminRole, staffDate }) => ({
        url: `/admin/branches/${bCode}/staff-roster/${adminRole}`,
        method: "GET",
        params: {
          role: adminRole,
          bcode: bCode,
          date: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(staffDate)),
        },
      }),
      providesTags: ["staff_roles"],
    }),
    updateStaffRoster: builder.mutation({
      query: ({ bCode, adminRole, staffs, weekday, date, reason }) => ({
        url: `/admin/branches/${bCode}/staff-roster/${adminRole}`,
        method: "PUT",
        params: {
          role: adminRole,
          bcode: bCode,
        },
        body: {
          usernames: staffs,
          weekday: weekday,
          date: !date
            ? ""
            : new Intl.DateTimeFormat("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(date)),
          reason: reason,
        },
      }),
      invalidatesTags: ["staff_roles"],
    }),
  }),
});

export const {
  useGetAllGeneralInvoicesQuery,
  useQueryInvoiceQuery,
  //
  useCollectionsReconcilationQuery,
  useAdminExecptionsQuery,
  useAdminAgingQuery,
  useAdminDashboardQuery,
  useAdminInsightsQuery,
  useAdminReportQuery,
  useAdminSearchQuery,
  useFinishedInvoicesQuery,
  useStaffRosterQuery,
  useUpdateStaffRosterMutation,
} = dashboardApi;
