import React, { useState,useEffect } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import VerificationHeader from "./header";
import VerificationDetails from "./details";
import VerificationSummary from "./summary";
import VerificationRemarks from "./remarks";
import VerificationMeta from "./meta";
import VerificationFooter from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVerificationTrackingDetailsQuery } from "@/features/invoices/invoicesAPI";

export default function VerificationPopup({ rowData, onSubmit, onClose }) {
  const [remarks, setRemarks] = useState("");
  const [weight, setWeight] = useState(0);
  const [errors, setErrors] = useState({ weight: "", remarks: "" });

  const { data, isLoading, isError, refetch } =
    useGetVerificationTrackingDetailsQuery({
      docNum: Number(rowData.invoiceNo),
    });

  useEffect(() => {
    if (data?.totalWeightKg !== undefined && data?.totalWeightKg !== null) {
      setWeight(data.totalWeightKg);
    } else {
      setWeight(0);
    }
  }, [data?.totalWeightKg]);

  const handleRemarksChange = (newRemarks) => setRemarks(newRemarks);
  const handleWeightChange = (newWeight) => setWeight(newWeight);

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500">
        Failed to load verification tracking details.
      </div>
    );

  const readOnly = rowData?.status === "Verified";

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
        handleWeightChange={handleWeightChange}
        error={errors.remarks}
        weight={weight}
      />

      <VerificationRemarks
        data={data}
        readOnly={readOnly}
        handleRemarksChange={handleRemarksChange}
        error={errors.remarks}
      />

      <VerificationMeta data={data} readOnly={readOnly} />

      <DialogFooter>
        <VerificationFooter
          remarks={remarks}
          weight={weight}
          rowData={data}
          onSubmit={onSubmit}
          onClose={onClose}
          errors={errors}
          setWeight={setWeight}
          setRemarks={setRemarks}
          setErrors={setErrors}
          refetchData={refetch}
          onClose={onClose}
          errors={errors}
          setWeight={setWeight}
          setRemarks={setRemarks}
          setErrors={setErrors}
          refetchData={refetch}
        />
      </DialogFooter>
    </>
  );
}
