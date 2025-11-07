import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "@/components/page-layout";
import {
  StoreLabelValue,
  // AdminLabelValue,
  VerificationLabelValue,
  DispatchLabelValue,
  // DeliveryLabelValue,
} from "./_component/label-values";
import InvoicesDataTable from "./_component/invoices-data-table/shared-invoice-data-table";
import { roleToView, viewMeta } from "@/lib/utils";
import FilterSheet from "./_component/filter-sheet/filterSheet";
import DeliveryInvoice from "./_component/driver/_component/delivery-main-page/index.";
import DispatchInvoice from "./_component/dispatchPerson/dispatch-invoice-table/main-page";
import DispatchMain from "./_component/dispatchPerson/dispatch-main-page";
import StorePage from "./_component/invoices-data-table/Store-invoicedatatable";
import VerificationPage from "./_component/invoices-data-table/Verif-invoices";
// import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";

const Overview = () => {
  const { user } = useSelector((state) => state.auth);

  // let rights = user["userrights"]?.map((item) => {
  //   return {
  //     modul: item?.modul,
  //     moduleArea: item?.moduleArea,
  //     moduleCode: item?.moduleCode,
  //   };
  // });
  let rights = user["userrights"]?.map((item) => item?.moduleCode);
  let moduleArea = user["userrights"]?.map((item) => item?.moduleArea);

  // const view = roleToView(user?.userRole);
  const pageMeta = viewMeta[moduleArea[0]?.toLowerCase() || ""];

  // const renderFilterSheet = () => {
  //   switch (user?.userRole) {
  //     case "StorePerson":
  //     case "VerificationPerson":
  //       // case "DispatchPerson":
  //       return <FilterSheet />;
  //     default:
  //       return null;
  //   }
  // };

  // const renderLabelValues = () => {
  //   switch (user?.userRole) {
  //     // case "Admin":
  //     // case "Client":
  //     //   return <AdminLabelValue />;
  //     case "StorePerson":
  //       return <StoreLabelValue />;
  //     case "VerificationPerson":
  //       return <VerificationLabelValue />;
  //     case "DispatchPerson":
  //       return <DispatchLabelValue />;
  //     // case "Driver":
  //     //   return <DeliveryLabelValue />;
  //     default:
  //       return null;
  //   }
  // };

  // const renderMainContent = () => {
  //   switch (user?.userRole) {
  //     case "Driver":
  //       return <DeliveryInvoice />;
  //     case "DispatchPerson":
  //       return <DispatchMain />;
  //     case "StorePerson":
  //       return <StorePage />;
  //     case "VerificationPerson":
  //       return <VerificationPage />;
  //     default:
  //       return <InvoicesDataTable />;
  //   }
  // };

  const renderFilterSheet = () => {
    if (rights?.includes(5145) || rights?.includes(5146))
      return <FilterSheet />;

    return;
  };

  const renderLabelValues = () => {
    if (rights?.includes(5147)) return <DispatchLabelValue />;
    if (rights?.includes(5145)) return <StoreLabelValue />;
    if (rights?.includes(5146)) return <VerificationLabelValue />;

    return null;
  };

  const renderMainContent = () => {
    if (rights?.includes(5148)) return <DeliveryInvoice />;
    if (rights?.includes(5147)) return <DispatchMain />;
    if (rights?.includes(5145)) return <StorePage />;
    if (rights?.includes(5146)) return <VerificationPage />;

    return <InvoicesDataTable />;
  };

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
          {renderFilterSheet()}
        </div>
      }
      noPadding
      className="flex flex-col flex-1"
    >
      <div className="flex-1 min-h-0 overflow-hidden">
        {renderMainContent()}
      </div>
    </PageLayout>
    // <h1>Greatness Awaits</h1>
  );
};

export default Overview;
