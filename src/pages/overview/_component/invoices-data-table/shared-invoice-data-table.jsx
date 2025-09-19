import * as React from "react";
import { DataTable } from "@/components/data-table";
import { useSelector } from "react-redux";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import { mockInvoices } from "@/constant/mockInvoices";

export default function SharedInvoiceDataTable() {
  const { user } = useSelector((state) => state.auth);
  const { invoices } = useSelector((state) => state.invoice);

  const view = roleToView(user?.userRole || "User");
  const columns = getInvoiceColumns(view);

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
        pagination={{
          pageNumber: 1,
          pageSize: 10,
          totalItems: mockInvoices.length,
          totalPages: Math.ceil(mockInvoices.length / 10),
        }}
      />
    </div>
  );
}
