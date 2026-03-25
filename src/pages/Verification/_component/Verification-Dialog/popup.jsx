import React, { useState, useEffect } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import VerificationHeader from "./header";
import VerificationDetails from "./details";
import VerificationSummary from "./summary";
import VerificationRemarks from "./remarks";
import VerificationMeta from "./meta";
import VerificationFooter from "./footer";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetVerificationTrackingQuery } from "@/features/verification/verificationAPI";

export default function VerificationPopup({ rowData, onSubmit, onClose }) {
  const [remarks, setRemarks] = useState(null);
  const [errors, setErrors] = useState({
    remarks: "",
  });

  const { data, isLoading, isError, refetch } = useGetVerificationTrackingQuery(
    Number(rowData.docNo)
  );
  const handleRemarksChange = (newRemarks) => {
    setRemarks(newRemarks);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load store tracking details.
      </div>
    );
  }

  const readOnly = rowData?.workflowStatus === "Verified";

  return (
    <>
      <DialogHeader>
        <VerificationHeader data={data} />
      </DialogHeader>

      <Separator className="mb-4" />

      <VerificationDetails data={data} />

      <Separator className="my-2" />

      <VerificationSummary
        data={data}
        readOnly={readOnly}
        // handleWeightChange={handleWeightChange}
        error={/* errors.weight */ undefined}
        // weight={weight}
      />

      <VerificationRemarks
        data={data}
        readOnly={readOnly}
        handleRemarksChange={handleRemarksChange}
        error={errors.remarks}
        value={remarks ?? ""}
      />

      <VerificationMeta data={data} readOnly={readOnly} />

      <DialogFooter>
        <VerificationFooter
          remarks={remarks}
          // weight={weight}
          rowData={data}
          onSubmit={onSubmit}
          onClose={onClose}
          errors={errors}
          // setWeight={setWeight}
          setRemarks={setRemarks}
          setErrors={setErrors}
          refetchData={refetch}
        />
      </DialogFooter>
    </>
  );
}
