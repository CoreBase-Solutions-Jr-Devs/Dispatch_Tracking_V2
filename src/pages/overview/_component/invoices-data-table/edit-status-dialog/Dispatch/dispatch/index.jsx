import * as React from "react";
import { DataTable } from "@/components/data-table";
import { useSelector } from "react-redux";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import { mockInvoices } from "@/constant/mockInvoices";
import DispatchTable from "@/pages/overview/_component/invoices-data-table/edit-status-dialog/Dispatch/dispatch/table";
import DispatchSearch from "@/pages/overview/_component/invoices-data-table/edit-status-dialog/Dispatch/dispatch/search";
import DispatchButton from "@/pages/overview/_component/invoices-data-table/edit-status-dialog/Dispatch/dispatch/button";
import DispatchFilter from "@/pages/overview/_component/invoices-data-table/edit-status-dialog/Dispatch/dispatch/filter";
import DispatchGrid from "./grid";
export default function DispatchMain() {
  const { user } = useSelector((state) => state.auth);
  const { invoices } = useSelector((state) => state.invoice);

  const view = roleToView(user?.userRole || "User");
  const columns = getInvoiceColumns(view);

  return (
    <div className="space-y-4">
      <InvoiceToolbar role={view} />

      <div className="grid grid-cols-2 gap-2 items-center">
        <DispatchSearch />
<DispatchFilter />
        <div className="flex justify-end">
          <DispatchButton />
        </div>
      </div>

      
     <DispatchGrid data={invoices} isLoading={false} />
    </div>
  );
}
