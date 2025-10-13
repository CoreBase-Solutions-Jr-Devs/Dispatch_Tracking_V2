import * as React from "react";
import { DataTable } from "@/components/data-table";
import { useSelector } from "react-redux";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import { rightsToView } from "@/lib/utils";

export default function StorePage() {
  const { user } = useSelector((state) => state.auth);
  const { invoices } = useSelector((state) => state.invoice);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredInvoices = invoices.filter((invoice) => {
    const search = searchValue.toLowerCase().trim();
    return Object.values(invoice).some((value) =>
      String(value || "").toLowerCase().includes(search)
    );
  });

  const totalCount = filteredInvoices.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const rights = user["userrights"]?.map((item) => item?.moduleCode) || [];
  const view = rightsToView(rights);

  const columns = getInvoiceColumns(view);

  return (
    <div className="space-y-4">
      <InvoiceToolbar
        role={view}
        placeholder="Invoice No, Customer Name"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <DataTable
        data={filteredInvoices}
        columns={columns}
        selection={false}
        isLoading={false}
        emptyTitle="No store invoices found"
        isShowPagination
        onPageSizeChange={setPageSize}
        onPageChange={setPageNumber}
        pagination={{
          pageNumber,
          pageSize,
          totalItems: totalCount,
          totalPages,
        }}
      />
    </div>
  );
}
