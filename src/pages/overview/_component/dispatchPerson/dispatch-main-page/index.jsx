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
    <div className="p-1">
      {/* <div className="flex justify-center">
        <InvoiceToolbar role={view} />
      </div> */}

      <div className="flex justify-between items-center gap-2">
        <div className="flex-1">
          <DispatchSearch />
        </div>

        <div className="flex-1 mx-4">
          <DispatchFilter />
        </div>

        <div className="flex justify-end flex-1">
          <DispatchButton onClick={handleGoToDispatchPage} />
        </div>
      </div>

      <DispatchGrid data={invoices} isLoading={false} />
    </div>
  );
}
