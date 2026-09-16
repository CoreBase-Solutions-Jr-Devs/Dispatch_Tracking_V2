import * as React from "react";
import { DataTable } from "@/components/data-table";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { rightsToView } from "@/lib/utils";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import {
  useGetFilteredVerificationInvoicesQuery,
  useSearchVerificationInvoicesQuery,
} from "@/features/verification/verificationAPI";
import { setSummary } from "@/features/invoices/invoiceSlice";
import useDebouncedSearch from "@/hooks/use-debounce-search";

export default function VerificationPage() {
  const dispatch = useAppDispatch();

  const { user } = useTypedSelector((state) => state.auth);

  // const { invoices, pagination } = useTypedSelector((state) => state.invoice);
  const { queryFilter } = useTypedSelector((state) => state.invoice);
  // const [pageNumber, setPageNumber] = React.useState(1);
  // const [pageSize, setPageSize] = React.useState(50);
  const { debouncedTerm, searchTerm, setSearchTerm } = useDebouncedSearch("", {
    delay: 500,
  });
  const [filter, setFilter] = React.useState({
    pageNumber: 1,
    pageSize: 50,
  });

  // const rights = user["userrights"]?.map((item) => item?.moduleCode) || [];
  const rights =
    user["userrights"]
      ?.filter((item) => item?.moduleCode === 5146)
      ?.map((item) => item?.moduleCode) || [];
  const view = rightsToView(rights);
  const columns = getInvoiceColumns(view);

  console.log(rights);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetFilteredVerificationInvoicesQuery({
      ...queryFilter,
      ...filter,
      workflowStatus: queryFilter?.status,
      // startDate: new Date(startDate).toISOString(),
      // endDate: new Date(endDate).toISOString(),
      // dateRange,
      // pageNumber,
      // pageSize,
    });
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    isError: isSearchError,
  } = useSearchVerificationInvoicesQuery(
    { searchWord: debouncedTerm.trim() },
    { skip: !debouncedTerm.trim() || debouncedTerm.length < 3 },
  );

  const isSearching = Boolean(debouncedTerm.trim());
  const invoices = isSearching
    ? searchData?.invoices || []
    : data?.invoices || [];
  const summary = isSearching ? (searchData?.stats ?? {}) : (data?.stats ?? {});
  const totalInvoices = summary?.totalCount || invoices.length;

  // console.log("🧾 Verification invoices API response:", data);

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
        searchValue={searchTerm}
        setSearchValue={setSearchTerm}
      />

      {/* <DataTable
        data={invoices}
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
        data={invoices}
        // data={filteredInvoices}
        columns={columns}
        selection={false}
        isLoading={
          isLoading || isFetching || isSearchLoading || isSearchFetching
        }
        emptyTitle={
          isError || isSearchError
            ? "Failed to load verification invoices"
            : "No verification invoices found"
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
          totalItems: totalInvoices,
          totalPages:
            Math.ceil(totalInvoices / (filter?.pageSize || 1)) ||
            Math.ceil(invoices?.length / (filter?.pageSize || 20)),
        }}
      />
    </div>
  );
}
