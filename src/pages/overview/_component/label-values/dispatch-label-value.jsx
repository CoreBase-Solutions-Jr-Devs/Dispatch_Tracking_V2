import { Skeleton } from "@/components/ui/skeleton";
import { useFilterDispatchInvoicesMutation } from "@/features/invoices/invoicesAPI";
import React, { useEffect } from "react";
import LabelValue from "./shared-label-value";
import { useTypedSelector } from "@/app/hook";
import { toast } from "sonner";

const DispatchLabelValue = () => {
  const { startDate, endDate, dateRange } = useTypedSelector(
    (state) => state.invoice
  );

  const [filterDispatchInvoices, { data, isLoading, isError }] =
    useFilterDispatchInvoicesMutation();

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
      const data = await filterDispatchInvoices(payload).unwrap();
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
        label="Pending"
        value={data?.invoices?.length || 0}
      />
      <LabelValue
        status="destructive"
        label="Ongoing"
        value={stats.pendingCount || 0}
      />
      <LabelValue
        status="Dispatch"
        label="Dispatched"
        value={stats.dispatchedCount || 0}
      />

      <LabelValue
        status="Delivered"
        label="Avg. Dispatch Time"
        value={
          stats.avgDurationSeconds !== undefined
            ? `${stats.avgDurationSeconds} sec`
            : "N/A"
        }
      />
    </div>
  );
};

export default DispatchLabelValue;
