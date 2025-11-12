import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "@/components/page-layout";
import InvoicesDataTable from "../shared/shared-invoice-data-table";
import { roleToView, viewMeta } from "@/lib/utils";
import FilterSheet from "../shared/filter-sheet/filterSheet";
import DeliveryInvoice from "./_component/driver/_component/delivery-main-page/index.";
import DispatchMain from "../dispatch/_component/main";
import { DispatchLabelValue } from "../shared/label-values";
import StorePage from "../Store/_component/main/Store-invoicedatatable";
import StoreLabelValue from "../Store/_component/main/store-label-value";
import VerificationLabelValue from "../Verification/_component/main/verification-label-value";
import VerificationPage from "../Verification/_component/main/Verif-invoices";

const Overview = () => {
  const { user } = useSelector((state) => state.auth);

  // let rights = user["userrights"]
  //   ?.map((item) => item?.moduleCode)
  //   ?.filter((right) => right !== 5149);
  let rights = user["userrights"]
    ?.map((item) => item?.moduleCode)
    ?.filter(
      (right) =>
        right === 5145 || right === 5146 || right === 5147 || right === 5148
    );

  let moduleArea = user["userrights"]?.map((item) => item?.moduleArea);

  // const view = roleToView(user?.userRole);
  const pageMeta = viewMeta[moduleArea[0]?.toLowerCase() || ""];

  console.log("pageMeta", pageMeta);
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

    return null;
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
