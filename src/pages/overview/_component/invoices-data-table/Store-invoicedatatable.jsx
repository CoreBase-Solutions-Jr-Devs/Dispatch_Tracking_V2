import * as React from "react";
import { DataTable } from "@/components/data-table";
import { useSelector } from "react-redux";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import { rightsToView } from "@/lib/utils";
import { useGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
import { setInvoices, setStatsStore } from "@/features/invoices/invoiceSlice";
import { useAppDispatch } from "@/app/hook";

export default function StorePage() {
  const { user } = useSelector((state) => state.auth);
  const { invoices, startDate, endDate, dateRange } = useSelector(
    (state) => state.invoice
  );
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const [searchValue, setSearchValue] = React.useState("");

  const rights = user?.userrights?.map((item) => item?.moduleCode) || [];
  const view = rightsToView(rights);
  const columns = getInvoiceColumns(view);

  const { data, isLoading, isFetching, isError } =
    useGetFilteredStoreInvoicesQuery({
      role: view,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      dateRange,
      pageNumber,
      pageSize,
    });

  console.log("🧾 Store invoices API response:", data);

  // const invoices = data?.invoices || [];
  const pagination = data?.pagination || {
    totalCount: invoices.length,
    totalPages: 1,
  };

  // const filteredInvoices = invoices.filter((invoice) => {
  //   const search = searchValue.toLowerCase().trim();
  //   return Object.values(invoice).some((value) =>
  //     String(value || "")
  //       .toLowerCase()
  //       .includes(search)
  //   );
  // });

  React.useEffect(() => {
    if (data) {
      dispatch(
        setInvoices({
          invoices: data.invoices,
          pagination: data.pagination,
          stats: { ...data?.stats, role: view },
        })
      );
      // dispatch(setStatsStore(data?.stats || {}));
    }
  }, [data, dispatch]);

  return (
    <div className="space-y-4">
      <InvoiceToolbar
        role={view}
        placeholder="Invoice No, Customer Name"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <DataTable
        data={invoices}
        columns={columns}
        selection={false}
        isLoading={isLoading || isFetching}
        emptyTitle={
          isError ? "Failed to load store invoices" : "No store invoices found"
        }
        isShowPagination
        onPageSizeChange={setPageSize}
        onPageChange={setPageNumber}
        pagination={{
          pageNumber,
          pageSize,
          totalItems: pagination.totalCount,
          totalPages: pagination.totalPages,
        }}
      />
    </div>
  );
}
