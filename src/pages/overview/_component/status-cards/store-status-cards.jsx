import React from "react";
import SharedStatusCard from "./shared-status-cards";
import {Skeleton} from "@/components/ui/skeleton"
import { useGetOverviewQuery } from "@/features/overview/overviewApi";

const StoreStatusCards = () => {
  const {data, isLoading, isError} = useGetOverviewQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 col-span-full">
        Failed to load overview data.
      </div>
    );
  }

  const today = new Date().toDateString();

  const statusCounts = {
    todayInvoices: data.todayCount || 0,
    pending: data.pending || 0,
    processed: data.processed || 0,
    avgProcessingTime: data.avgProcessingTime || "N/A",
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
        label="Pending Store"
        count={statusCounts.pending}
      />
      <SharedStatusCard
        status="Dispatch"
        label="In-Store Invoices"
        count={statusCounts.processed}
      />
      <SharedStatusCard
        status="Delivered"
        label="Avg. Store Time"
        count={statusCounts.avgProcessingTime}
      />
    </div>
  );
};

export default StoreStatusCards;
