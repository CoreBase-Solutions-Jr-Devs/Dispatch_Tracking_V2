import * as React from "react";
import { DataTable } from "@/components/data-table";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import { rightsToView } from "@/lib/utils";
import { useGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
import {
  setInvoices,
  setStatsStore,
  setSummary,
} from "@/features/invoices/invoiceSlice";
import { useAppDispatch, useTypedSelector } from "@/app/hook";

export default function StorePage() {
  const { user } = useTypedSelector((state) => state.auth);
  // const {
  //   invoices,
  //   startDate, endDate, dateRange
  // } = useTypedSelector((state) => state.invoice);
  const { queryFilter } = useTypedSelector((state) => state.invoice);
  const dispatch = useAppDispatch();

  // const [pageNumber, setPageNumber] = React.useState(1);
  // const [pageSize, setPageSize] = React.useState(50);
  const [searchValue, setSearchValue] = React.useState("");
  const [filter, setFilter] = React.useState({
    pageNumber: 1,
    pageSize: 50,
  });

  const rights = user?.userrights?.map((item) => item?.moduleCode) || [];
  const view = rightsToView(rights);
  const columns = getInvoiceColumns(view);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetFilteredStoreInvoicesQuery({
      role: view,
      ...queryFilter,
      ...filter,
      workflowStatus: queryFilter?.status,
      // startDate: new Date(startDate).toISOString(),
      // endDate: new Date(endDate).toISOString(),
      // dateRange,
      // pageNumber,
      // pageSize,
    });

  let invoices = data?.invoices || [];
  let summary = data?.stats ?? {};
  let totalInvoices = summary?.totalCount || 0;

  // console.log("🧾 Store invoices API response:", data);

  // const invoices = data?.invoices || [];
  // const pagination = data?.pagination || {
  //   totalCount: invoices.length,
  //   totalPages: 1,
  // };

  const filteredInvoices = invoices.filter((invoice) => {
    const search = searchValue.toLowerCase().trim();
    return Object.values(invoice).some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(search)
    );
  });

  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({ ...prev, pageNumber }));
  };

  const handlePageSizeChange = (pageSize) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

  // React.useEffect(() => {
  //   if (data) {
  //     dispatch(
  //       setInvoices({
  //         invoices: data.invoices,
  //         pagination: data.pagination,
  //         stats: { ...data?.stats, role: view },
  //       })
  //     );
  //     // dispatch(setStatsStore(data?.stats || {}));
  //   }
  // }, [data, dispatch]);

  React.useEffect(() => {
    if (isSuccess && data) {
      dispatch(setSummary({ ...data?.stats, role: view }));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className="space-y-4">
      <InvoiceToolbar
        role={view}
        placeholder="Invoice No, Customer Name"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <DataTable
        // data={invoices}
        data={filteredInvoices}
        columns={columns}
        selection={false}
        isLoading={isLoading || isFetching}
        emptyTitle={
          isError ? "Failed to load store invoices" : "No store invoices found"
        }
        isShowPagination
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        pagination={{
          // pageNumber,
          // pageSize,
          // totalItems: pagination.totalCount,
          // totalPages: pagination.totalPages,
          pageNumber: filter?.pageNumber,
          pageSize: filter?.pageSize,
          totalItems: totalInvoices ?? 0,
          totalPages:
            Math.ceil(totalInvoices / (filter?.pageSize || 1)) ||
            Math.ceil(invoices?.length / (filter?.pageSize || 20)),
        }}
      />
    </div>
  );
}
