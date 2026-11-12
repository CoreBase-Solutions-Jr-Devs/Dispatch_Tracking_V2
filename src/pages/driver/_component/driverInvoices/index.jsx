import PageLayout from "@/components/page-layout";
import { roleToView, viewMeta } from "@/lib/utils";
import React from "react";
import { useSelector } from "react-redux";
import SharedInvoiceDataTable from "../../../shared/shared-invoice-data-table";

export default function DriverSetupOverview() {
  const user = useSelector((state) => state.auth);

  const view = roleToView(user?.userRole);
  const pageMeta = viewMeta[view];

  return (
    <PageLayout
      title={"Driver Setup"}
      subtitle={"System drivers"}
      rightAction={
        <div className="flex items-center gap-2 text-sm">
          <FilterSheet />
        </div>
      }
    >
      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <SharedInvoiceDataTable />
      </div>
    </PageLayout>
  );
}
