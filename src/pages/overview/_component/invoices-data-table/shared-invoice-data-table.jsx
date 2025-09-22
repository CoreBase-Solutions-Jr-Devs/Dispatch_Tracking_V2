import * as React from "react";
import { DataTable } from "@/components/data-table";
import { useSelector } from "react-redux";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import { mockInvoices } from "@/constant/mockInvoices";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SharedInvoiceDataTable() {
  const { user } = useSelector((state) => state.auth);
  const { invoices } = useSelector((state) => state.invoice);

  const view = roleToView(user?.userRole || "User");
  const columns = getInvoiceColumns(view);
  const [search, setSearch] = React.useState("");

  return (
    <div className="space-y-4">
      <InvoiceToolbar role={view} />

      <div className="flex-1 flex flex-col">
        <Label className="text-xs text-muted-foreground">Search</Label>
        <Input
          placeholder="Invoice No / Account"
          className="text-sm h-8 w-full sm:w-32 md:w-40 lg:w-44 xl:w-56"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
