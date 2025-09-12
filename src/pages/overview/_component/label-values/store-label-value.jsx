import React, { useEffect } from "react";
import { useFilterStoreInvoicesMutation } from "@/features/invoices/invoicesAPI";
import { Skeleton } from "@/components/ui/skeleton";
import LabelValue from "./shared-label-value";

const StoreLabelValue = () => {
  const [filterStoreInvoices, { data, isLoading, isError }] =
    useFilterStoreInvoicesMutation()

    useEffect(() => {
      filterStoreInvoices({});
    }, [filterStoreInvoices]);
  
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

  const stats = data?.stats || {};

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
        value={data?.invoices?.length || 0}
      />
      <LabelValue
        status="Verification"
        label="Pending"
        value={stats.pendingCount || 0}
      />
      <LabelValue
        status="Dispatch"
        label="Processed"
        value={stats.processedCount || 0}
      />
      <LabelValue
        status="Delivered"
        label="Avg. Processing Time"
        value={
          stats.avgDurationSeconds !== undefined
            ? `${stats.avgDurationSeconds} sec`
            : "N/A"
        }
      />
    </div>
  );
};

export default StoreLabelValue;
