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
// import { Checkbox } from "@/components/ui/checkbox";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function DashboardTable() {
  const dispatch = useAppDispatch();

  const { queryFilter } = useTypedSelector((state) => state.dashboard);

  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 50,
  });

  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllGeneralInvoicesQuery({
      ...filter,
      ...queryFilter,
    });
  const { data: queriedData, isLoading: isQueryLoading } = useQueryInvoiceQuery(
    searchValue,
    {
      skip: !searchValue,
    }
  );

  let invoices = searchValue ? queriedData?.invoices : data?.invoices || [];
  // let pagination = data?.pagination || {};
  let summary = data?.stats || {};
  let totalInvoices = summary?.totalCount || 0;

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
        searchValue={searchValue}
        setSearchValue={handleSearchValue}
      />

      <DataTable
        data={invoices}
        columns={columns}
        selection={false}
        isLoading={isLoading || isQueryLoading}
        emptyTitle="No invoices found"
        isShowPagination={true}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        pagination={{
          pageNumber: filter?.pageNumber,
          pageSize: filter?.pageSize,
          totalItems: invoices.length,
          totalPages:
            Math.ceil(totalInvoices / filter?.pageSize) ||
            Math.ceil(invoices.length / filter?.pageSize),
          // totalPages: Math.ceil(invoices.length / pagination?.pageSize),
          // totalPages: pagination?.totalPages || 1,
        }}
      />
    </div>
  );
}
