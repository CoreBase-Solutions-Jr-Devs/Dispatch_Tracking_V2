import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "@/components/page-layout";
import FilterActions from "./_component/filter-actions/filter-actions";
import { AdminStatusCards, StoreStatusCards, VerificationStatusCards } from "./_component/status-cards";
import InvoicesDataTable from "./_component/invoices-data-table/invoices-data-table";

const Overview = () => {
  const { user } = useSelector((state) => state.auth);

  const mockData = [
    { status: "Store", createdAt: new Date() },
    { status: "Verification", createdAt: new Date() },
    { status: "VerificationPending", createdAt: new Date() },
    { status: "Dispatch", createdAt: new Date() },
    { status: "Verified", createdAt: new Date() },
    { status: "Delivered", createdAt: new Date() },
    { status: "Pending", createdAt: new Date() },
    { status: "Processed", createdAt: new Date() },
  ];

  const renderStatusCards = () => {
    switch (user?.userRole) {
      case "Admin":
      case "Client":
        return <AdminStatusCards data={mockData} />;
      case "Store":
        return <StoreStatusCards data={mockData} />;
      case "Verification":
        return <VerificationStatusCards data={mockData} />;
      default:
        return null;
    }
  };

  return (
    <PageLayout
      title="Dispatch Overview"
      subtitle="These are all of the invoices that have been created or assigned."
      rightAction={
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">Logged in User:</span>
          <span className="font-semibold text-gray-900">{user?.userName}</span>
        </div>
      }
    >
      <div className="w-full space-y-4">
        {renderStatusCards()}
        <FilterActions />
        <InvoicesDataTable />
      </div>
    </PageLayout>
  );
};

export default Overview;
