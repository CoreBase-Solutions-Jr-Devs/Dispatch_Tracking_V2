import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFilteredVerificationInvoicesQuery } from "@/features/verification/verificationAPI";
import LabelValue from "./shared-label-value";
import { useTypedSelector } from "@/app/hook";
import { toast } from "sonner";
import { renderDuration } from "@/components/invoice-data-table/invoice-columns";

// --- Helpers ---
const STATUS_STYLES = {
  InStore: "Pending",
  InVerification: "Verification",
  InDispatch: "Dispatch",
  InDelivery: "Delivered",
};

const DashboardLabelValue = () => {
  const { summary = {} } = useTypedSelector((state) => state.dashboard);

  if (Object.keys(summary).length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    );
  }

  //       summary: [
  //         {
  //           stage: "InStore",
  //           count: 15,
  //           totalCount: 59,
  //         },
  //         {
  //           stage: "InVerification",
  //           count: 3,
  //           totalCount: 59,
  //         },
  //         {
  //           stage: "InDispatch",
  //           count: 28,
  //           totalCount: 59,
  //         },
  //         {
  //           stage: "InDelivery",
  //           count: 13,
  //           totalCount: 59,
  //         },
  //       ],

  return (
    <div
      className="
        flex flex-col gap-2
        sm:flex-row sm:flex-wrap sm:justify-center
        md:gap-4
        lg:gap-6
      "
    >
      {/* {summary.map((item, i) => (
        <LabelValue
          status={STATUS_STYLES[item?.stage]}
          key={i}
          label={item?.stage}
          value={item?.count || 0}
        />
      ))} */}
      {/* <LabelValue
        status="Pending"
        label="InStore"
        value={summary["InStore"]?.count || 0}
      />
      <LabelValue
        status="Verification"
        label="InVerification"
        value={summary["InVerification"]?.count || 0}
      />
      <LabelValue
        status="Dispatch"
        label="InDispatch"
        value={summary["InDispatch"]?.count || 0}
      />
      <LabelValue
        status="Delivered"
        label="InDelivery"
        value={summary["InDelivery"]?.count || 0}
      /> */}
      <LabelValue
        status="Store"
        label="Total"
        value={summary.totalCount || 0}
      />
      <LabelValue
        status="Verification"
        label="Pending"
        value={summary.inVerificationCount || 0}
      />
      <LabelValue
        status="Delivered"
        label="In Process"
        value={summary.inProcessCount || 0}
      />
      <LabelValue
        status="Dispatch"
        label="Processed"
        value={summary.inStoreCount || 0}
      />
      <LabelValue
        status="Verification"
        label="Processed"
        value={summary.inDispatchCount || 0}
      />
      <LabelValue
        status="Dispatch"
        label="Processed"
        value={summary.inDeliveryCount || 0}
      />
      <LabelValue
        status="Delivered"
        label="Avg. Processing Time"
        value={
          summary.averageDurationSeconds !== undefined
            ? renderDuration(
                summary.averageDurationSeconds,
                summary.averageDurationSeconds
              )
            : "N/A"
        }
      />
    </div>
  );
};

export default DashboardLabelValue;
