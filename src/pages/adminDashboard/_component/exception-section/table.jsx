// import { useState } from "react";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { DataTable } from "@/components/data-table";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import DashboardToolbar from "@/components/invoice-data-table/admin-dashboard-toolbar";
import {
  useAdminExecptionsQuery,
  useQueryInvoiceQuery,
} from "@/features/dashboard/dashboardAPI";
import { roleToView } from "@/lib/utils";
import { useState } from "react";
import useDebouncedSearch from "@/hooks/use-debounce-search";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function ExceptionSection() {
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
    useAdminExecptionsQuery({
      ...filter,
      ...queryFilter,
    });

  // const view = roleToView("View All Stages");
  const view = roleToView("SuperAdmin");
  const columns = getInvoiceColumns("kind");

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
  const invoices = isSearching ? searchData?.items || [] : data?.items || [];
  // let pagination = data?.pagination || {};
  let totalInvoices = data?.totalCount ?? 0;

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
        placeholder="Search..."
        searchValue={searchTerm}
        setSearchValue={setSearchTerm}
        enabled={false}
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
