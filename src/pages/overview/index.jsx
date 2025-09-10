import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "@/components/page-layout";
import {
  StoreLabelValue,
  // AdminLabelValue,
  VerificationLabelValue,
  // DispatchLabelValue,
  // DeliveryLabelValue,
} from "./_component/label-values";
import InvoicesDataTable from "./_component/invoices-data-table/shared-invoice-data-table";
import { roleToView, viewMeta } from "@/lib/utils";
import FilterSheet from "./_component/filter-sheet/filterSheet";
import DeliveryInvoice from "./_component/driver/_component/delivery-main-page/index.";

const Overview = () => {
  const { user } = useSelector((state) => state.auth);

  const view = roleToView(user?.userRole);
  const pageMeta = viewMeta[view];

  const renderLabelValues = () => {
    switch (user?.userRole) {
      // case "Admin":
      // case "Client":
      //   return <AdminLabelValue />;
      case "StorePerson":
        return <StoreLabelValue />;
      case "VerificationPerson":
        return <VerificationLabelValue />;
      // case "DispatchPerson":
      //   return <DispatchLabelValue />;
      // case "Driver":
      //   return <DeliveryLabelValue />;
      default:
        return null;
    }
  };

  const renderMainContent = () => {
    switch (user?.userRole) {
      case "Driver":
        return <DeliveryInvoice />;
      default:
        return <InvoicesDataTable />;
    }
  }

  return (
    <PageLayout
      title={pageMeta?.title}
      subtitle={pageMeta?.subtitle}
      middleAction={
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          {renderLabelValues()}
        </div>
      }
      rightAction={
        <div className="flex items-center gap-2 text-sm">
          <FilterSheet />
        </div>
      }
      noPadding
      className="flex flex-col flex-1"
    >
      <div className="flex-1 min-h-0 overflow-hidden">
        {renderMainContent()}
      </div>
    </PageLayout>
  );
};

export default Overview;
