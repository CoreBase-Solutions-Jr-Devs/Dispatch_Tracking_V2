import React from "react";
import SharedStatusCard from "./shared-label-value";

const AdminStatusCards = ({ data }) => {
  const statusCounts = {
    Store: data.filter((i) => i.status === "Store").length,
    Verification: data.filter((i) => i.status === "Verification").length,
    Dispatch: data.filter((i) => i.status === "Dispatch").length,
    Delivered: data.filter((i) => i.status === "Delivered").length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SharedStatusCard status="Store" label="Invoices in Store" count={statusCounts.Store} />
      <SharedStatusCard status="Verification" label="Invoices Pending Verification" count={statusCounts.Verification} />
      <SharedStatusCard status="Dispatch" label="Invoices Pending Dispatch" count={statusCounts.Dispatch} />
      <SharedStatusCard status="Delivered" label="Invoices Delivered" count={statusCounts.Delivered} />
    </div>
  );
};

export default AdminStatusCards;
