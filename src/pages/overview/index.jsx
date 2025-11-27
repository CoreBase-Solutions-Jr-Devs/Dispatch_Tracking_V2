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

const Overview = ({ role = "" }) => {
  const { user } = useSelector((state) => state.auth);

  let rights = user["userrights"]
    ?.map((item) => item?.moduleCode)
    ?.filter(
      (right) =>
        right === 5145 || right === 5146 || right === 5147 || right === 5148
    );

  let moduleArea = rights.map((right) => {
    const item = user["userrights"].find((m) => m.moduleCode === right);
    return item.moduleArea;
  });
  // const view = roleToView(user?.userRole);
  const pageMeta = role
    ? viewMeta[role.toLowerCase()]
    : viewMeta[moduleArea[0]?.toLowerCase()];

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
    const roleToComponent = {
      store: <FilterSheet />,
      verification: <FilterSheet />,
    };

    if (role) {
      const component = roleToComponent[role.toLowerCase()];
      if (component) return component;
    }

    if (role === "Dispatch") return null;

    if (rights?.includes(5145) || rights?.includes(5146))
      return <FilterSheet />;

    return null;
  };

  const renderLabelValues = () => {
    const roleToComponent = {
      store: <StoreLabelValue />,
      verification: <VerificationLabelValue />,
      dispatch: <DispatchLabelValue />,
    };

    if (role) {
      const component = roleToComponent[role.toLowerCase()];
      if (component) return component;
    }

    if (rights?.includes(5145)) return <StoreLabelValue />;
    if (rights?.includes(5146)) return <VerificationLabelValue />;
    if (rights?.includes(5147)) return <DispatchLabelValue />;

    return null;
  };

  const renderMainContent = () => {
    const roleToComponent = {
      store: <StorePage />,
      verification: <VerificationPage />,
      delivery: <DeliveryInvoice />,
      dispatch: <DispatchMain />,
    };

    if (role) {
      const component = roleToComponent[role.toLowerCase()];
      console.log(role.toLowerCase());
      if (component) return component;
    }

    if (rights?.includes(5145)) return <StorePage />;
    if (rights?.includes(5146)) return <VerificationPage />;
    if (rights?.includes(5147)) return <DispatchMain />;
    if (rights?.includes(5148)) return <DeliveryInvoice />;

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
