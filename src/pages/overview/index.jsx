import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "@/components/page-layout";
import FilterActions from "./_component/filter-actions/filter-actions";
import { AdminStatusCards, DeliveryStatusCards, DispatchStatusCards, StoreStatusCards } from "./_component/status-cards";
import InvoicesDataTable from "./_component/invoices-data-table/shared-invoice-data-table";

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
      case "StorePerson":
        return <StoreStatusCards data={mockData} />;
      case "DispatchPerson":
        return <DispatchStatusCards data={mockData} />;
      case "Driver":
        return <DeliveryStatusCards data={mockData} />;
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
