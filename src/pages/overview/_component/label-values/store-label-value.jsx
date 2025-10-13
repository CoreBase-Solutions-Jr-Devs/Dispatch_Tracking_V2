import React, { useEffect } from "react";
import { useGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
import { Skeleton } from "@/components/ui/skeleton";
import LabelValue from "./shared-label-value";
import { useTypedSelector } from "@/app/hook";
import { toast } from "sonner";
import { renderDuration } from "@/components/invoice-data-table/invoice-columns";

const StoreLabelValue = () => {
  const { startDate, endDate, dateRange } = useTypedSelector(
    (state) => state.invoice
  );

  const { data, isLoading, isError, error, refetch } =
    useGetFilteredStoreInvoicesQuery(
      {
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        dateRange,
        search: "",
        status: {},
        pageNumber: 1,
        pageSize: 50,
      },
      { skip: !startDate || !endDate }
    );

  const handleApplyFilter = async () => {
    try {
      await refetch();
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    let description = "Error occurred. Please try again.";
    if (err?.data?.errors) {
      const errorMessages = Object.values(err.data.errors).flat();
      if (errorMessages.length > 0) description = errorMessages.join(" ");
    } else if (err?.data?.message) {
      description = err.data.message;
    }
    toast.error("Invoices Failed", { description, duration: 4000 });
  };

  useEffect(() => {
    if (isError) {
      handleError(error);
    }
  }, [isError, error]);

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

  // If error → fallback to 0 stats instead of breaking UI
  const stats = !isError && data?.stats ? data.stats : {
    pendingCount: 0,
    inProcessCount: 0,
    processedCount: 0,
    averageDurationSeconds: undefined,
  };

  const invoicesCount = !isError && data?.invoices ? data.invoices.length : 0;

  return (
    <div
      className="
        flex flex-col gap-2 
        sm:flex-row sm:flex-wrap sm:justify-center 
        md:gap-4
        lg:gap-6
      "
    >
      <LabelValue status="Store" label="Total" value={stats.totalCount || 0} />
      <LabelValue status="Verification" label="Pending" value={stats.pendingCount || 0} />
      <LabelValue status="Delivered" label="In Process" value={stats.inProcessCount || 0} />
      <LabelValue status="Dispatch" label="Processed" value={stats.processedCount || 0} />
      <LabelValue
        status="Delivered"
        label="Avg. Processing Time"
        value={
          stats.averageDurationSeconds !== undefined
            ? renderDuration(stats.averageDurationSeconds, stats.averageDurationSeconds)
            : "N/A"
        }
      />
    </div>
  );
};

export default StoreLabelValue;
