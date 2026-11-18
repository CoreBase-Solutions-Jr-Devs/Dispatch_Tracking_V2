// import { useState } from "react";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { DataTable } from "@/components/data-table";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import DashboardToolbar from "@/components/invoice-data-table/admin-dashboard-toolbar";
import {
  useCollectionsReconcilationQuery,
  useQueryInvoiceQuery,
} from "@/features/dashboard/dashboardAPI";
import { setSummary } from "@/features/dashboard/dashboardSlice";
import { roleToView } from "@/lib/utils";
import { useEffect, useState } from "react";
import useDebouncedSearch from "@/hooks/use-debounce-search";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function ReconciliationSection() {
  const dispatch = useAppDispatch();

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
    useCollectionsReconcilationQuery(
      {
        ...filter,
        ...queryFilter,
      },
      { skip: !queryFilter.dispatchNumber },
    );

  // const view = roleToView("View All Stages");
  const view = roleToView("SuperAdmin");
  const columns = getInvoiceColumns(view);

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
  const paymentIntents = isSearching
    ? searchData?.paymentIntents || []
    : data?.paymentIntents || [];

  const totals = isSearching ? searchData?.totals || [] : data?.totals || [];
  // let pagination = data?.pagination || {};
  let summary = data?.stats ?? {};
  let totalInvoices = summary?.totalCount ?? 0;

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setSummary(summary));
    }
  }, [isSuccess, data, dispatch]);

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
      <div className="flex flex-col gap-2 text-sm font-medium px-2">
        <div className="flex flex-row gap-2">
          <span className="text-red-600">approvedDisputes:</span>
          <span>{totals.approvedDisputes}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-red-600">balanceMismatchCount:</span>
          <span>{totals.balanceMismatchCount}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-red-600">calculatedBalance:</span>
          <span>{totals.calculatedBalance}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-red-600">expectedCollection:</span>
          <span>{totals.expectedCollection}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-red-600">grossAmount:</span>
          <span>{totals.grossAmount}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-red-600">invoiceCount:</span>
          <span>{totals.invoiceCount}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-red-600">missingStoredBalanceCount:</span>
          <span>{totals.missingStoredBalanceCount}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-red-600">recordedPaid:</span>
          <span>{totals.recordedPaid}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-red-600">storedBalance:</span>
          <span>{totals.storedBalance}</span>
        </div>
      </div>
      {/* <DashboardToolbar
        placeholder="Invoice No, Customer Name"
        searchValue={searchTerm}
        setSearchValue={setSearchTerm}
      /> */}

      {/* <DataTable
        data={invoices}
        columns={columns}
        selection={false}
        isLoading={
          isLoading || isFetching || isSearchLoading || isSearchFetching
        }
        emptyTitle={
          isError || isSearchError
            ? "Failed to load invoices"
            : "No invoices found"
        }
        isShowPagination={true}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        pagination={{
          pageNumber: filter?.pageNumber,
          pageSize: filter?.pageSize,
          totalItems: invoices.length ?? 0,
          totalPages:
            Math.ceil(totalInvoices / (filter?.pageSize || 1)) ||
            Math.ceil(invoices?.length / (filter?.pageSize || 20)),
          // totalPages: Math.ceil(invoices.length / pagination?.pageSize),
          // totalPages: pagination?.totalPages || 1,
        }}
      /> */}
    </div>
  );
}
