import { Skeleton } from "@/components/ui/skeleton";
// import { useFilterDispatchInvoicesMutation } from "@/features/invoices/invoicesAPI";
import React, { useEffect } from "react";
import LabelValue from "../../../shared/label-values/shared-label-value";
import { useTypedSelector } from "@/app/hook";
import { toast } from "sonner";
import { useGetAggregateDispatchesQuery } from "@/features/dispatch/dispatchAPI";

const DispatchLabelValue = () => {
  const { startDate, endDate, dateRange } = useTypedSelector(
    (state) => state.invoice
  );

  const { data: aggregateStats, isLoading, isError } = useGetAggregateDispatchesQuery();

  const formatDuration = (seconds) => {
    if (!seconds && seconds !== 0) return "—";
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return (
      [
        days && `${days}D`,
        hours && `${hours}H`,
        mins && `${mins}M`,
        secs && `${secs}S`,
      ]
        .filter(Boolean)
        .join(" ") || "0m"
    );
  };

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
        label="Total"
        value={aggregateStats?.totalCount || 0}
      />
      <LabelValue
        status="destructive"
        label="Ongoing"
        value={aggregateStats?.pendingCount || 0}
      />
      <LabelValue
        status="Dispatch"
        label="In Dispatch"
        value={aggregateStats?.inDispatchCount || 0}
      />

      <LabelValue
        status="Delivered"
        label="Dispatched"
        value={aggregateStats?.dispatchedCount || 0}
      />

      <LabelValue
        status="Delivered"
        label="Avg. Disp.Time"
        value={formatDuration(aggregateStats?.averageDurationSeconds) || 0}
      />
    </div>
  );
};

export default DispatchLabelValue;
