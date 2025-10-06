import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFilteredVerificationInvoicesQuery } from "@/features/verification/verificationAPI";
import LabelValue from "./shared-label-value";
import { useTypedSelector } from "@/app/hook";
import { toast } from "sonner";
import { renderDuration } from "@/components/invoice-data-table/invoice-columns";

const VerificationLabelValue = () => {
  const {
    startDate = new Date().toISOString(),
    endDate = new Date().toISOString(),
    dateRange = "TODAY",
  } = useTypedSelector((state) => state.invoice || {});

  const { data, isLoading, isError, error, refetch } =
    useGetFilteredVerificationInvoicesQuery(
      {
        startDate: startDate ? new Date(startDate).toISOString() : undefined,
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
        dateRange,
        search: "",
        status: {},
        pageNumber: 1,
        pageSize: 50,
      },
      { skip: !startDate || !endDate }
    );

  const handleError = (err) => {
    let description = "Error occurred. Please try again.";
    if (err?.data?.errors) {
      const errorMessages = Object.values(err.data.errors).flat();
      if (errorMessages.length > 0) description = errorMessages.join(" ");
    } else if (err?.data?.message) {
      description = err.data.message;
    }
    toast.error("Verification Invoices Failed", {
      description,
      duration: 4000,
    });
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

  // fallback stats
  const stats =
    !isError && data?.stats
      ? data.stats
      : {
          pendingCount: 0,
          inVerificationCount: 0,
          verifiedCount: 0,
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
      <LabelValue status="Verification" label="Total" value={invoicesCount} />
      <LabelValue
        status="Pending"
        label="Pending"
        value={stats.pendingCount || 0}
      />
      <LabelValue
        status="Dispatch"
        label="In Verification"
        value={stats.inVerificationCount || 0}
      />
      <LabelValue
        status="Delivered"
        label="Verified"
        value={stats.verifiedCount || 0}
      />
      <LabelValue
        status="Delivered"
        label="Avg. Verification Time"
        value={
          stats.averageDurationSeconds !== undefined
            ? renderDuration(
                stats.averageDurationSeconds,
                stats.averageDurationSeconds
              )
            : "N/A"
        }
      />
    </div>
  );
};

export default VerificationLabelValue;
