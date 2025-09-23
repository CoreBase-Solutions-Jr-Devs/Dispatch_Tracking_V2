import React, { useEffect } from "react";
import { useFilterStoreInvoicesMutation } from "@/features/invoices/invoicesAPI";
import { Skeleton } from "@/components/ui/skeleton";
import LabelValue from "./shared-label-value";
import { useTypedSelector } from "@/app/hook";
import { toast } from "sonner";
const StoreLabelValue = () => {
  const { startDate, endDate, dateRange } = useTypedSelector(
    (state) => state.invoice
  );

  const [filterStoreInvoices, { data, isLoading, isError }] =
    useFilterStoreInvoicesMutation();

  const handleApplyFilter = async () => {
    const payload = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      dateRange,
      search: "",
      status: {},
      pageNumber: 1,
      pageSize: 50,
    };

    console.log("Filter Payload:", JSON.stringify(payload, null, 2));

    try {
      const data = await filterStoreInvoices(payload).unwrap();
      console.log(data);
    } catch (error) {
      let description = "error occurred. Please try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) description = error.data.message;

      toast.error("Invoices Failed", { description, duration: 4000 });
    }
  };

  useEffect(() => {
    handleApplyFilter();
  }, []);

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
