import React from "react";
import { useTypedSelector } from "@/app/hook";
import { Skeleton } from "@/components/ui/skeleton";
import LabelValue from "./shared-label-value";
import { renderDuration } from "@/components/invoice-data-table/invoice-columns";

const STATUS_STYLES = {
  Total: "Store",
  Pending: "Verification",
  "In Verification": "Dispatch",
  Verified: "Delivered",
  "Avg. Processing Time": "Delivered",
};

const VerificationLabelValue = () => {
  const { stats } = useTypedSelector((state) => state.invoice);

  console.log(stats);

  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    );
  }

  const storeSummary = [
    { label: "Total", value: stats.totalCount || 0 },
    { label: "Pending", value: stats.pendingCount || 0 },
    { label: "In Verification", value: stats.inVerificationCount || 0 },
    { label: "Verified", value: stats.verifiedCount || 0 },
    {
      label: "Avg. Processing Time",
      value: stats.averageDurationSeconds
        ? renderDuration(
            stats.averageDurationSeconds,
            stats.averageDurationSeconds
          )
        : "N/A",
    },
  ];

  return (
    <div
      className="
        flex flex-col gap-2 
        sm:flex-row sm:flex-wrap sm:justify-center 
        md:gap-4
        lg:gap-6
      "
    >
      {storeSummary.map((item, index) => (
        <LabelValue
          key={index}
          status={STATUS_STYLES[item.label]}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default VerificationLabelValue;
