import * as React from "react";
import { DataTable } from "@/components/data-table";
import { useSelector } from "react-redux";
// import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
// import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
// import { mockInvoices } from "@/constant/mockInvoices";

export default function SharedInvoiceDataTable() {
  const { user } = useSelector((state) => state.auth);
  const { invoices, pagination } = useSelector((state) => state.invoice);

  const [pages, setPages] = React.useState(
    Math.ceil(invoices.length / pagination?.pageSize) || 1
  );

  const [pageNumber, setPageNumber] = React.useState(
    pagination?.pageNumber || 1
  );

  const view = roleToView(user?.userRole || "User");
  const columns = getInvoiceColumns(view);

  const handlePageSizeChange = (data) => {
    setPages(Math.ceil(invoices.length / data));
  };

  const handlePageChange = (data) => {
    setPageNumber(data);
  };

  return (
    <div className="space-y-4">
      <DataTable
        // data={mockInvoices}
        data={invoices}
        columns={columns}
        selection={false}
        isLoading={false}
        emptyTitle="No invoices found"
        isShowPagination={true}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        pagination={{
          pageNumber: pageNumber,
          pageSize: pagination?.pageSize,
          totalItems: invoices.length,
          // totalPages: Math.ceil(invoices.length / pagination?.pageSize),
          totalPages: Math.ceil(pages),
        }}
      />
    </div>
  );
}
