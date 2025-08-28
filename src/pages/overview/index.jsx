import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "@/components/page-layout";
import FilterActions from "./_component/filter-actions/filter-actions";
import {
  AdminStatusCards,
  DeliveryStatusCards,
  DispatchStatusCards,
  StoreStatusCards,
  VerificationStatusCards,
} from "./_component/status-cards";
import InvoicesDataTable from "./_component/invoices-data-table/shared-invoice-data-table";
import { roleToView, viewMeta } from "@/lib/utils";
import { BarChart } from "lucide-react";
import CollapsibleSection from "@/components/ui/collapsible-section";

const Overview = () => {
  const { user } = useSelector((state) => state.auth);

  const view = roleToView(user?.userRole);
  const pageMeta = viewMeta[view];

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
      case "VerificationPerson":
        return <VerificationStatusCards data={mockData} />;
      case "DispatchPerson":
        return <DispatchStatusCards data={mockData} />;
      default:
        return null;
    }
  };

  return (
    <PageLayout
      title={pageMeta?.title}
      subtitle={pageMeta?.subtitle}
      rightAction={
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Logged in Users:</span>
          <span className="font-semibold text-muted-foreground">2</span>
        </div>
      }
      noPadding // 🚀 remove default padding to free space
      className="flex flex-col flex-1"
    >
      {/* Top Controls */}
      <div className="flex flex-col gap-2 pb-2">
        <CollapsibleSection id="status" icon={BarChart} defaultOpen>
          {renderStatusCards()}
        </CollapsibleSection>
        <FilterActions view={view} />
      </div>

      {/* Data Table fills remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <InvoicesDataTable />
      </div>
    </PageLayout>
  );
};

export default Overview;
