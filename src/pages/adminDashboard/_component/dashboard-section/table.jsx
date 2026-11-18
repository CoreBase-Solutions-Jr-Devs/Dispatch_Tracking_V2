// import { useState } from "react";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { DataTable } from "@/components/data-table";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import DashboardToolbar from "@/components/invoice-data-table/admin-dashboard-toolbar";
import {
  useAdminDashboardQuery,
  useQueryInvoiceQuery,
} from "@/features/dashboard/dashboardAPI";
import { roleToView } from "@/lib/utils";
import { useEffect, useState } from "react";
import useDebouncedSearch from "@/hooks/use-debounce-search";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function DashboardSection() {
  const { queryFilter } = useTypedSelector((state) => state.adminDashboard);

  const { debouncedTerm, searchTerm, setSearchTerm } = useDebouncedSearch("", {
    delay: 500,
  });
  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 50,
  });

  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useAdminDashboardQuery({
      ...filter,
      ...queryFilter,
    });

  // const view = roleToView("View All Stages");
  const view = roleToView("SuperAdmin");
  const notificationColumns = getInvoiceColumns("dashboardnotifications");
  const workflowColumns = getInvoiceColumns("dashboardworkflows");

  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({ ...prev, pageNumber }));
  };

  const handlePageSizeChange = (pageSize) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

  const handleSearchValue = (value) => {
    console.log(value);
    setSearchValue(value);
  };

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    isError: isSearchError,
  } = useQueryInvoiceQuery(
    { searchWord: debouncedTerm.trim(), role: view },
    { skip: !debouncedTerm.trim() || debouncedTerm.length < 3 },
  );

  const isSearching = Boolean(debouncedTerm.trim());
  const notifications = isSearching
    ? searchData?.notifications || []
    : data?.notifications || [];
  const workflow = isSearching
    ? searchData?.workflow || []
    : data?.workflow || [];
  // let pagination = data?.pagination || {};
  let totalnotifications = notifications?.length ?? 0;
  let totalworkflow = workflow?.length ?? 0;

  if (isError) {
    return (
      <div className="text-center text-red-500">
        {error?.data?.message ||
          error?.data?.title ||
          "Failed to load store tracking details."}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DashboardToolbar
        placeholder="Invoice No, Customer Name"
        searchValue={searchTerm}
        setSearchValue={setSearchTerm}
        enabled={false}
      />

      <div className="flex gap-3">
        <div className="basis-1/2">
          <h6>Notifications</h6>
          <DataTable
            data={notifications}
            columns={notificationColumns}
            selection={false}
            isLoading={
              isLoading || isFetching || isSearchLoading || isSearchFetching
            }
            emptyTitle={
              isError || isSearchError
                ? "Failed to load invoices"
                : "No invoices found"
            }
            isShowPagination={false}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            pagination={{
              pageNumber: filter?.pageNumber,
              pageSize: filter?.pageSize,
              totalItems: notifications.length ?? 0,
              totalPages:
                Math.ceil(totalnotifications / (filter?.pageSize || 1)) ||
                Math.ceil(notifications?.length / (filter?.pageSize || 20)),
              // totalPages: Math.ceil(invoices.length / pagination?.pageSize),
              // totalPages: pagination?.totalPages || 1,
            }}
          />
        </div>
        <div className="basis-1/2">
          <h6>Workflow</h6>
          <DataTable
            data={workflow}
            columns={workflowColumns}
            selection={false}
            isLoading={
              isLoading || isFetching || isSearchLoading || isSearchFetching
            }
            emptyTitle={
              isError || isSearchError
                ? "Failed to load invoices"
                : "No invoices found"
            }
            isShowPagination={false}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            pagination={{
              pageNumber: filter?.pageNumber,
              pageSize: filter?.pageSize,
              totalItems: workflow.length ?? 0,
              totalPages:
                Math.ceil(totalworkflow / (filter?.pageSize || 1)) ||
                Math.ceil(workflow?.length / (filter?.pageSize || 20)),
              // totalPages: Math.ceil(invoices.length / pagination?.pageSize),
              // totalPages: pagination?.totalPages || 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}
