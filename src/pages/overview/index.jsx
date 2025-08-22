import React from "react";
import StatusCards from "./_component/status-cards";
import FilterActions from "./_component/filter-actions";
import InvoicesDataTable from "./_component/invoices-data-table";
import PageLayout from "@/components/page-layout";

const Overview = ({ user }) => {
  return (
    <PageLayout
      title="Dispatch Overview"
      subtitle="These are all of the invoices that have been created or assigned."
      rightAction={
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">Logged in Users:</span>
          <span className="font-semibold text-gray-900">
            {user?.name || 5}
          </span>
        </div>
      }
    >
      <div className="w-full space-y-4">
        <StatusCards />
        <FilterActions />
        <InvoicesDataTable />
      </div>
    </PageLayout>
  );
};

export default Overview;
