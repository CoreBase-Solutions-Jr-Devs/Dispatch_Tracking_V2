import React from "react";
import { useGetOverviewQuery } from "@/features/overview/overviewApi";
import { Skeleton } from "@/components/ui/skeleton";
import LabelValue from "./shared-label-value";

const StoreLabelValue = () => {
  const { data, isLoading, isError } = useGetOverviewQuery();

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load overview data.
      </div>
    );
  }

  const statusCounts = {
    todayInvoices: data.todayCount || 0,
    pending: data.pending || 0,
    processed: data.processed || 0,
    avgProcessingTime: data.avgProcessingTime || "N/A",
  };

  return (
    <div
      className="
        flex flex-col gap-2 
        sm:flex-row sm:flex-wrap sm:justify-center 
        md:gap-4
        lg:gap-6
      "
    >
      <LabelValue
        status="Store"
        label="Today"
        value={statusCounts.todayInvoices}
      />
      <LabelValue
        status="Verification"
        label="Pending"
        value={statusCounts.pending}
      />
      <LabelValue
        status="Dispatch"
        label="Processed"
        value={statusCounts.processed}
      />
      <LabelValue
        status="Delivered"
        label="Avg. Processing Time"
        value={statusCounts.avgProcessingTime}
      />
    </div>
  );
};

export default StoreLabelValue;
