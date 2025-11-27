import * as React from "react";
import { DataTable } from "@/components/data-table";
import { useSelector } from "react-redux";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { rightsToView, roleToView } from "@/lib/utils";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { useGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
import { setSummary } from "@/features/invoices/invoiceSlice";

export default function VerificationPage() {
  const dispatch = useAppDispatch();

  const { user } = useTypedSelector((state) => state.auth);

  // const { invoices, pagination } = useTypedSelector((state) => state.invoice);
  const { queryFilter } = useTypedSelector((state) => state.invoice);
  // const [pageNumber, setPageNumber] = React.useState(1);
  // const [pageSize, setPageSize] = React.useState(50);
  const [searchValue, setSearchValue] = React.useState("");
  const [filter, setFilter] = React.useState({
    pageNumber: 1,
    pageSize: 50,
  });

  const rights = user["userrights"]?.map((item) => item?.moduleCode) || [];
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

  // console.log("🧾 Verification invoices API response:", data);

  const filteredInvoices = invoices.filter((invoice) => {
    const search = searchValue.toLowerCase().trim();
    return Object.values(invoice).some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(search)
    );
  });

  // const totalCount = filteredInvoices.length;
  // const totalPages = Math.ceil(totalCount / pageSize) || 1;

  // const view = roleToView(user?.userRole || "User");
  // const columns = getInvoiceColumns(view);

  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({ ...prev, pageNumber }));
  };

  const handlePageSizeChange = (pageSize) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

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

      {/* <DataTable
        data={filteredInvoices}
        columns={columns}
        selection={false}
        isLoading={false}
        emptyTitle={"No verification invoices found"}
        isShowPagination={true}
        onPageSizeChange={setPageSize}
        onPageChange={setPageNumber}
        pagination={{
          pageNumber,
          pageSize,
          totalItems: totalCount,
          totalPages,
        }}
      /> */}
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
          totalItems: invoices.length ?? 0,
          totalPages:
            Math.ceil(totalInvoices / (filter?.pageSize || 1)) ||
            Math.ceil(invoices?.length / (filter?.pageSize || 20)),
        }}
      />
    </div>
  );
}
