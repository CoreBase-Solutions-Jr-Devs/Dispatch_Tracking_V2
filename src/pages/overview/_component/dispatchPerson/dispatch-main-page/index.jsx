import * as React from "react";
import { useSelector } from "react-redux";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
// import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";
import DispatchFilter from "../Dispatch-Sections/filter";
import DispatchSearch from "../Dispatch-Sections/search";
import DispatchGrid from "../Dispatch-Sections/grid";
import DispatchButton from "../Dispatch-Sections/button";

import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";

export default function DispatchMain() {
  const { user } = useSelector((state) => state.auth);
  const { invoices } = useSelector((state) => state.invoice);

  const view = roleToView(user?.userRole || "User");
  const columns = getInvoiceColumns(view);

  const navigate = useNavigate();

  const handleGoToDispatchPage = () => {
    navigate(PROTECTED_ROUTES.NEWDISPATCH);
  };

  return (
    <div className="p-1 w-full">
      {/* Toolbar (optional, center align if needed) */}
      {/* <div className="flex justify-center">
    <InvoiceToolbar role={view} />
  </div> */}

    
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 w-full mb-4">
        <div className="w-full sm:flex-1">
          <DispatchSearch />
        </div>

        <div className="w-full sm:flex-1 sm:mx-4 ">
          <DispatchFilter />
        </div>

        <div className="w-full sm:w-auto flex lg:justify-end">
          <DispatchButton onClick={handleGoToDispatchPage} />
        </div>
      </div>

      <div className="w-full">
        <DispatchGrid data={invoices} isLoading={false} />
      </div>
    </div>
  );
}
