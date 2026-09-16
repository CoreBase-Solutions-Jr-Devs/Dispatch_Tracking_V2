// import { useState } from "react";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { DataTable } from "@/components/data-table";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import DashboardToolbar from "@/components/invoice-data-table/dashboard-toolbar";
import {
  useGetAllGeneralInvoicesQuery,
  useQueryInvoiceQuery,
} from "@/features/dashboard/dashboardAPI";
import { setSummary } from "@/features/dashboard/dashboardSlice";
import { roleToView } from "@/lib/utils";
import { useEffect, useState } from "react";
import useDebouncedSearch from "@/hooks/use-debounce-search";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function DashboardTable() {
  const dispatch = useAppDispatch();

  const { queryFilter } = useTypedSelector((state) => state.dashboard);

  const { debouncedTerm, searchTerm, setSearchTerm } = useDebouncedSearch("", {
    delay: 500,
  });
  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 50,
  });

  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetAllGeneralInvoicesQuery({
      ...filter,
      ...queryFilter,
    });

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
  const invoices = isSearching
    ? searchData?.invoices || []
    : data?.invoices || [];
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
      <DashboardToolbar
        placeholder="Invoice No, Customer Name"
        searchValue={searchTerm}
        setSearchValue={setSearchTerm}
      />

      <DataTable
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
      />
    </div>
  );
}
