import React from "react";
import SharedStatusCard from "./shared-status-cards";

const StoreStatusCards = ({ data }) => {
  const today = new Date().toDateString();

  const statusCounts = {
    todayInvoices: data.filter(
      (i) => new Date(i.createdAt).toDateString() === today
    ).length,
    pending: data.filter((i) => i.status === "Pending").length,
    processed: data.filter((i) => i.status === "Processed").length,
    avgProcessingTime: "2h 15m",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SharedStatusCard
        status="Store"
        label="Today's Invoices"
        count={statusCounts.todayInvoices}
      />
      <SharedStatusCard
        status="Verification"
        label="Pending Verification"
        count={statusCounts.pending}
      />
      <SharedStatusCard
        status="Dispatch"
        label="Verified Invoices"
        count={statusCounts.processed}
      />
      <SharedStatusCard
        status="Delivered"
        label="Avg. Verification Time"
        count={statusCounts.avgProcessingTime}
      />
    </div>
  );
};

export default StoreStatusCards;
