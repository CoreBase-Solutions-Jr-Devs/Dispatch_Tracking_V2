import { Skeleton } from "@/components/ui/skeleton";
import { useGetOverviewQuery } from "@/features/overview/overviewApi";
import React from "react";
import LabelValue from "./shared-label-value";

const VerificationLabelValue = () => {
  const { data, isLoading, isError } = useGetOverviewQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
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

  const statusCounts = {
    todayInvoices: data?.todayCount || 0,
    pending: data?.pending || 0,
    verified: data?.verified || 0,
    avgVerificationTime: data?.avgVerificationTime || "N/A",
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
        count={statusCounts.todayInvoices}
      />
      <LabelValue
        status="Verification"
        label="Pending"
        count={statusCounts.pending}
      />
      <LabelValue
        status="Dispatch"
        label="Verified"
        count={statusCounts.verified}
      />
      <LabelValue
        status="Delivered"
        label="Avg. Verification Time"
        count={statusCounts.avgVerificationTime}
      />
    </div>
  );
};

export default VerificationLabelValue;
